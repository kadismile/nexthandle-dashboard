import React, {useEffect, useState} from "react";
import moment from 'moment'
import {useSelector} from "react-redux";
import {selectProductBrand} from "../redux/productSlice";
import ProductServices from "../services/product";
import {PageSpinner} from "../components/libs";
import toastr from 'toastr'
import AWN from "awesome-notifications"
import ProductBrandModal from "../components/modals/add-brand-modal";
import EditBrandModal from "../components/modals/edit-brand-modal";

const ProductBrand = () => {
  const storedbrands = useSelector(selectProductBrand);
  const [brands, setbrands] = useState(storedbrands);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(undefined);
  let notifier = new AWN();

  const fetchBrands = async () => {
    setLoading(true);
    let params = '';
    let brands: any = await ProductServices.getBrands(params);
    const {data: {data}} = brands;
    if (data) {
      setbrands(data);
      setLoading(false)
    }
  };
  useEffect(()=> {
    ( async ()=> {
      await fetchBrands()
    })()
  },[]);
  useEffect(()=> {
    ( async ()=> {
      setLoading(true);
      await fetchBrands();
      setTimeout(()=> {
        setLoading(false);
      }, 1200)
    })()
  },[storedbrands]);
  const deleteBrand = async (brandId: any) => {
    let onOk = async() => {
      let brand = await ProductServices.deleteBrands(brandId);
      const { status }: any = brand;
      if (status === 'success') {
        setLoading(true);
        toastr.success('product brand deleted successfully');
        await fetchBrands()
      }
    };
    let onCancel = () => {return};
    notifier.confirm(
      'Are you sure?',
      onOk,
      onCancel,
      {
        labels: {
          confirm: 'Delete Brand?'
        }
      }
    )
  };
  const copyToClipBoard = async (catId: string) => {
    toastr.success('brand_id copied to clipboard');
    return await navigator.clipboard.writeText(catId)
  };

  const handleChange = async (event: { preventDefault: () => void; target: { name: any; value: any; id: any }; }) => {
    const { id } = event.target;
    const brand = brands.find( (b: any) => b._id === id);
    let onOk = async() => {
      event.preventDefault();
      setLoading(true);
      const doc = {
        brandId: brand._id,
        isActive: !brand.isActive,
      };
      await ProductServices.updateBrand(doc);
      await fetchBrands()
    };
    let onCancel = () => {return};
    notifier.confirm(
      'Are you sure?',
      onOk,
      onCancel,
      {
        labels: {
          confirm: `Update Brand to ${brand.isActive ? 'InActive ?' : 'Active ?'}`
        }
      }
    )
  };

  return (
    <>
      <div className="body d-flex py-lg-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0">Product Brand</h3>
                <div className="col-auto d-flex w-sm-100">

                  <button type="button" className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#product-brand"> <i
                    className="icofont-plus-circle me-2 fs-6" data-bs-toggle="modal"
                    data-bs-target="#expadd"> </i> Upload Csv
                  </button>

                </div>
              </div>
            </div>
          </div> {/* Row end  */}
          <div className="row g-3 mb-3">
            <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              {
                loading ?
                  <PageSpinner />
                  :
                  brands.length ?
                    <div className="row clearfix g-3">
                      <div className="col-sm-12">
                        <div className="card mb-3">
                          <div className="card-body">
                            <table id="myProjectTable" className="table table-hover align-middle mb-0" style={{width: '100%'}}>
                              <thead>
                              <tr>
                                <th>#</th>
                                <th>brand id</th>
                                <th>Name</th>
                                <th>Created</th>
                                <th>Actions</th>
                              </tr>
                              </thead>
                              <tbody>
                              {brands.map((brand: any, index: number) => {
                                return (
                                  <tr key={brand._id}>
                                    <td><strong>#{index +=1}</strong></td>
                                    <td>
                                      <a href="#"
                                         data-bs-toggle="tooltip" data-bs-placement="top" title="copy to clipboard"
                                         style={{marginRight: '15px'}}
                                         onClick={() => copyToClipBoard(brand._id)}>
                                        <i className="icofont-copy"> </i>
                                      </a>
                                      <strong>{brand._id}</strong>
                                    </td>
                                    <td>
                                      <a href="customer-detail.html">
                                        <i className="icofont-chart-flow fs-5"/>
                                        <span className="fw-bold ms-1">{brand.name}</span>
                                      </a>
                                    </td>
                                    <td>
                                      {moment(brand.createdAt).format('do MMM, YYYY')}
                                    </td>
                                    <td>
                                      <div className="form-check form-switch position-absolute">
                                        <input className="form-check-input" type="checkbox" id={brand._id} onChange={handleChange} checked={brand.isActive} />
                                        <label className="form-check-label" htmlFor="Eaten-switch1">  </label>
                                      </div>
                                    </td>
                                    <td>
                                      <button type="button" className="btn btn-outline-secondary"
                                              style={{marginTop: '18px'}}
                                              onClick={ () => setSelectedBrand(brand)}
                                              data-bs-toggle="modal" data-bs-target="#edit-brand">
                                        <i className="icofont-edit text-success" />
                                      </button>
                                    </td>
                                  </tr>)
                              })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div> :
                    <div className="row clearfix g-3">
                      <div className="col-sm-12">
                        <div className="card mb-3">
                          <div className="card-body">
                            <h3 style={{textAlign: 'center'}}> No Vendors </h3>
                          </div>
                        </div>
                      </div>
                    </div>
              }
            </div>
          </div>
        </div>
      </div>
      <ProductBrandModal/>
      <EditBrandModal brand={selectedBrand}/>
    </>
  )
}

export default ProductBrand