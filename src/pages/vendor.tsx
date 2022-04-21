import React, { useEffect, useState } from "react";
import moment from "moment";
// import VendorService from "../services/vendor";
import { PageSpinner } from "../components/libs";
import VendorFilter from "../components/vendor/vendor-filter";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import { selectVendor } from "../redux/vendorSlice";
import toastr from "toastr";
import EditBrandModal from "../components/modals/edit-brand-modal";
import VendorDetailsModal from "../components/modals/vendor-details-modal";

const Vendor = () => {
  const storedVendors = useSelector(selectVendor);
  const [vendor, setVendor] = useState(storedVendors);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(undefined);

  // const getVendors = async () => {
  //   setLoading(true);
  //   let params = `isActive=true`;
  //   let vendors: any = await VendorService.getVendors(params);
  //   const {
  //     data: { data },
  //   } = vendors;
  //   if (data) {
  //     setVendor(data);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setVendor(storedVendors);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    })();
  }, [storedVendors]);

  // const handleClick = async (vendorId: any) => {
  //   setLoading(true);
  //   await VendorService.updateVendor(vendorId);
  //   await getVendors();
  // };

  const copyToClipBoard = async (catId: string) => {
    toastr.success("vendor_id copied to clipboard");
    return await navigator.clipboard.writeText(catId);
  };

  return (
    <>
      <div className="body d-flex py-lg-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0">Vendors</h3>
                <div className="col-auto d-flex w-sm-100">
                  <Search />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <VendorFilter />
            <div className="col-md-12 col-lg-8 col-xl-8 col-xxl-9">
              {loading ? (
                <PageSpinner />
              ) : vendor.length ? (
                <div className="row clearfix g-3">
                  <div className="col-sm-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <table
                          id="myProjectTable"
                          className="table table-hover align-middle mb-0"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>vendor id</th>
                              <th>Customers</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vendor.map((vendor: any, index: number) => {
                              return (
                                <tr
                                  key={vendor._id}
                                  style={{
                                    backgroundColor: !vendor.isActive
                                      ? "#f5eacb"
                                      : "",
                                  }}
                                >
                                  <td>
                                    <strong>#{index + 1}</strong>
                                  </td>
                                  <td>
                                    <a
                                      href="/#"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="copy to clipboard"
                                      style={{ marginRight: "15px" }}
                                      onClick={() =>
                                        copyToClipBoard(vendor._id)
                                      }
                                    >
                                      <i className="icofont-copy"> </i>
                                    </a>
                                    <strong>
                                      {vendor._id}
                                    </strong>
                                  </td>
                                  <td>
                                    <a href="#/"
                                       onClick={() => setSelectedVendor(vendor)}
                                       data-bs-toggle="modal"
                                       data-bs-target="#vendor-details"
                                    >
                                      <img
                                        className="avatar rounded"
                                        src="assets/images/xs/avatar1.svg"
                                        alt=""
                                      />
                                      <span className="fw-bold ms-1">
                                        {vendor.businessName}
                                      </span>
                                    </a>
                                  </td>
                                  {/*<td>
                                    <div className="form-check form-switch position-absolute">
                                      <input className="form-check-input" type="checkbox" id={vendor._id} onChange={handleChange} checked={vendor.isActive} />
                                      <label className="form-check-label" htmlFor="Eaten-switch1">  </label>
                                    </div>
                                  </td>
                                  <td>
                                    <button type="button" className="btn btn-outline-secondary"
                                            style={{marginTop: '18px'}}
                                            onClick={ () => setSelectedVendor(cat)}
                                            data-bs-toggle="modal" data-bs-target="#edit-category">
                                      <i className="icofont-edit text-success" />
                                    </button>
                                  </td>*/}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row clearfix g-3">
                  <div className="col-sm-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h3 style={{ textAlign: "center" }}> No Vendors </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <VendorDetailsModal vendor={selectedVendor} />
    </>
  );
};

export default Vendor;
