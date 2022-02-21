import React, {useEffect, useState} from "react";
import moment from 'moment'
import ProductService from "../services/product";
import {formatTotal, toUpperCase} from "../utils/helpers";
import {PageSpinner} from "../components/libs";
import {selectProduct} from "../redux/productSlice";
import {useSelector} from 'react-redux'
import AWN from "awesome-notifications"
import CategoryFilter from "../components/product/product-filter/CategoryFilter";
import DateFilter from "../components/product/product-filter/DateFilter";
import AddAdminProductModal from "../components/modals/add-admin-products-csv";

const ProductAdmin = () => {
  const storedProducts = useSelector(selectProduct);
  const [products, setProducts] = useState(storedProducts);
  const [loading, setLoading] = useState(true);
  let notifier = new AWN();

  const getProducts = async () => {
    setLoading(true);
    let params = '';
    let products: any = await ProductService.getAdminProducts(params);
    const {data: {data}} = products;
    if (data) {
      setProducts(data)
      setLoading(false)
    }
  }

  useEffect(()=> {
    ( async ()=> {
      await getProducts()
    })()
  },[]);

  useEffect(()=> {
    setLoading(true);
    setProducts(storedProducts);
    setTimeout(()=> {
      setLoading(false);
    }, 2100)
  },[storedProducts]);

  const handleChange = async (event: { preventDefault: () => void; target: { name: any; value: any; id: any }; }) => {
    const { id } = event.target;
    const product = products.find( (p: any) => p._id === id);
    let onOk = async() => {
      event.preventDefault();
      setLoading(true);
      product.productId = id;
      product.isActive = !product.isActive;
      await ProductService.chaneProductStatus(product);
      await getProducts()
    };
    let onCancel = () => {return};
    notifier.confirm(
      'Are you sure?',
      onOk,
      onCancel,
      {
        labels: {
          confirm: `Update Product to ${product.isActive ? 'InActive ?' : 'Active ?'}`
        }
      }
    )
  };

  return (
    <>
      <div className="body d-flex py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0 justify-content-start">Admin Products</h3>
                {/*<Search />*/}
                <button type="button" className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#admin-product"> <i
                  className="icofont-plus-circle me-2 fs-6" data-bs-toggle="modal"
                  data-bs-target="#expadd"> </i> Upload Csv
                </button>
              </div>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-3">
              <div className="sticky-lg-top">
                <div className="card mb-3">
                  <div className="reset-block">
                    <div className="filter-title">
                      <h4 className="title">Filter</h4>
                    </div>
                    <div className="filter-btn">
                      <a className="btn btn-primary" href="#">Reset</a>
                    </div>
                  </div>
                </div>
                <CategoryFilter />
                <DateFilter/>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-8 col-xxl-9">
              {
                loading ?
                  <PageSpinner />
                  :
                  <>
                    <div className="card mb-3 bg-transparent p-2">
                      {products.map((product:any) => {
                        return (<div className="card border-0 mb-1" key={product._id}>
                          <div className="form-check form-switch position-absolute top-0 end-0 py-3 px-3 d-none d-md-block">
                            <input className="form-check-input" type="checkbox" id={product._id} onChange={handleChange} checked={product.isActive} />
                            <label className="form-check-label" htmlFor="Eaten-switch1"> </label>
                          </div>

                          <div className="card-body d-flex align-items-center flex-column flex-md-row">
                            <div className="ms-md-4 m-0 mt-4 mt-md-0 text-md-start text-center w-100">
                              <a href="product-detail.html"><h6 className="mb-3 fw-bold">{product.name}
                                <span className="text-muted small fw-light d-block">{product.category.name}</span></h6></a>
                              <div className="d-flex flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
                                <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                  <div className="text-muted small">Date Added</div>
                                  <strong>{moment(product.createdAt).format('do MMM, YYYY')}</strong>
                                </div>
                                <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                  <div className="text-muted small">Condition</div>
                                  <strong>{product.condition}</strong>
                                </div>
                                <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                  <div className="text-muted small">Price</div>
                                  <strong>₦{ formatTotal(product.price)}</strong>
                                </div>
                                <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                  <div className="text-muted small">Vendor</div>
                                  <strong> <span className="text-muted">{toUpperCase(product.vendor?.businessName)}</span></strong>
                                </div>
                              </div>
                              <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2 d-inline-flex d-md-none">
                                <button type="button" className="btn btn-primary">Add Cart</button>
                              </div>
                            </div>
                          </div>
                        </div>)
                      })}
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-12">
                        <nav className="justify-content-end d-flex">
                          <ul className="pagination">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item active" aria-current="page">
                              <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="#">Next</a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </div>

      <AddAdminProductModal/>
    </>
  )
};

export default ProductAdmin