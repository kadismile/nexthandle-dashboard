import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectProductBrand } from "../redux/productSlice";
import ProductServices from "../services/product";
import { LoadMoreSpinner, PageSpinner } from "../components/libs";
import toastr from "toastr";
import AWN from "awesome-notifications";
import ProductVariantModal from "../components/modals/add-variant-modal";
import EditBrandModal from "../components/modals/edit-brand-modal";
import InfiniteScroll from "react-infinite-scroller";

const ProductVariant = () => {
  const storeVariants = useSelector(selectProductBrand);
  const [variants, setVariants] = useState(storeVariants);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(undefined);
  let [page] = React.useState(1);
  let [count, setCount] = React.useState(1);
  let [hasMore] = React.useState(true);
  let notifier = new AWN();

  const fetchVariants = async () => {
    let params = `limit=20&page=${count}`;
    let pVariants: any = await ProductServices.getVariants(params);
    const {
      data: { data },
    } = pVariants;
    if (data.length) {
      if (variants.length) {
        setVariants([...variants, ...pVariants.data.data]);
      } else {
        setLoading(true);
        setVariants(pVariants.data.data);
      }
      // setCount(count + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchVariants();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchVariants();
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    })();
  }, [storeVariants]);

  const copyToClipBoard = async (variantId: string) => {
    toastr.success("variant_id copied to clipboard");
    return await navigator.clipboard.writeText(variantId);
  };

  const fetchMoreItems = async () => {
    await fetchVariants();
    setCount(count + 1);
    return;
  };

  const handleChange = async (event: {
    preventDefault: () => void;
    target: { name: any; value: any; id: any };
  }) => {
    const { id } = event.target;
    const pVariant = variants.find((b: any) => b._id === id);
    let onOk = async () => {
      event.preventDefault();
      setLoading(true);
      const doc = {
        pVariantId: pVariant._id,
        isActive: !pVariant.isActive,
      };
      await ProductServices.updateCategory(doc);
      await fetchVariants();
    };
    let onCancel = () => {
      return;
    };
    notifier.confirm("Are you sure?", onOk, onCancel, {
      labels: {
        confirm: `Update Variant to ${
          pVariant.isActive ? "InActive ?" : "Active ?"
        }`,
      },
    });
  };

  return (
    <>
      <div className="body d-flex py-lg-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0">Product Variant</h3>
                <div className="col-auto d-flex w-sm-100">
                  <button
                    type="button"
                    className="btn btn-primary btn-set-task w-sm-100"
                    data-bs-toggle="modal"
                    data-bs-target="#product-variant"
                  >
                    {" "}
                    <i
                      className="icofont-plus-circle me-2 fs-6"
                      data-bs-toggle="modal"
                      data-bs-target="#expadd"
                    >
                      {" "}
                    </i>{" "}
                    Upload Csv
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Row end  */}
          <div className="row g-3 mb-3">
            <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              {loading ? (
                <PageSpinner />
              ) : variants.length ? (
                <div className="row clearfix g-3">
                  <div className="col-sm-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <InfiniteScroll
                          pageStart={page}
                          loadMore={fetchMoreItems}
                          hasMore={hasMore}
                          loader={<LoadMoreSpinner />}
                          useWindow={false}
                        >
                          <table
                            id="myProjectTable"
                            className="table table-hover align-middle mb-0"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>variant id</th>
                                <th>Name</th>
                                <th>Created</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {variants.map((variant: any, index: number) => {
                                return (
                                  <tr key={variant._id}>
                                    <td>
                                      <strong>#{(index += 1)}</strong>
                                    </td>
                                    <td>
                                      <a
                                        href="#/"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="copy to clipboard"
                                        style={{ marginRight: "15px" }}
                                        onClick={() =>
                                          copyToClipBoard(variant._id)
                                        }
                                      >
                                        <i className="icofont-copy"> </i>
                                      </a>
                                      <strong>{variant._id}</strong>
                                    </td>
                                    <td>
                                      <a href="customer-detail.html">
                                        <i className="icofont-chart-flow fs-5" />
                                        <span className="fw-bold ms-1">
                                          {variant.name}
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      {moment(variant.createdAt).format(
                                        "do MMM, YYYY"
                                      )}
                                    </td>
                                    <td>
                                      <div className="form-check form-switch position-absolute">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={variant._id}
                                          onChange={handleChange}
                                          checked={variant.isActive}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="Eaten-switch1"
                                        >
                                          {" "}
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        style={{ marginTop: "18px" }}
                                        onClick={() =>
                                          setSelectedVariant(variant)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-brand"
                                      >
                                        <i className="icofont-edit text-success" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </InfiniteScroll>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row clearfix g-3">
                  <div className="col-sm-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h3 style={{ textAlign: "center" }}>
                          {" "}
                          No Product Variant{" "}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProductVariantModal />
      <EditBrandModal brand={selectedVariant} />
    </>
  );
};

export default ProductVariant;
