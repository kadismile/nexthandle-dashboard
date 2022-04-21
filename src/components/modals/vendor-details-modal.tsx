import React from "react";
import moment from "moment";

const VendorDetailsModal = (props: any) => {
  const { vendor } = props

  return (
    <div
      className="modal fade"
      id="vendor-details"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="card-body d-flex profile-fulldeatil flex-column">
              <div className="profile-block text-center w220 mx-auto">
                <a href="#">
                  <img src="assets/images/lg/avatar4.svg" alt="" className="avatar xl rounded img-thumbnail shadow-sm" />
                </a>
                <div className="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
                  <span className="text-muted small">ID : {vendor?._id}</span>
                </div>
              </div>
              <div className="profile-info w-100">
                <h6 className="mb-0 mt-2  fw-bold d-block fs-6 text-center">{ (vendor?.businessName)?.toUpperCase()}</h6>
                <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted text-center mx-auto d-block">{vendor?.businessAddress[0].country}</span>
                <div className="row g-2 pt-2">
                  <div className="col-xl-12">
                    <div className="d-flex align-items-center">
                      <i className="icofont-ui-touch-phone" />
                      <span className="ms-2">{ vendor?.phoneNumber[0] } </span>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="d-flex align-items-center">
                      <i className="icofont-email" />
                      <span className="ms-2">{vendor?.email}</span>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="d-flex align-items-center">
                      <i className="icofont-birthday-cake" />
                      <span className="ms-2">{moment(vendor?.createdAt).format("do MMM, YYYY")}</span>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="d-flex align-items-center">
                      <i className="icofont-address-book" />
                      <span className="ms-2">{vendor?.businessAddress[0].fullAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">

          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorDetailsModal;