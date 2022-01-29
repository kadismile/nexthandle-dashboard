import React from "react";

const AddVendor = () => {
  return (
    <div className="modal fade" id="expadd" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title  fw-bold" id="expaddLabel">Add Customers</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="deadline-form">
              <form>
                <div className="row g-3 mb-3">
                  <div className="col-sm-12">
                    <label htmlFor="item" className="form-label">Customers Name</label>
                    <input type="text" className="form-control" id="item" />
                  </div>
                  <div className="col-sm-12">
                    <label htmlFor="taxtno" className="form-label">Customers Profile</label>
                    <input type="File" className="form-control" id="taxtno" />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="depone" className="form-label">Country</label>
                    <input type="text" className="form-control" id="depone" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="abc" className="form-label">Customers Register date</label>
                    <input type="date" className="form-control w-100" id="abc" />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="abc11" className="form-label">Mail</label>
                    <input type="text" className="form-control" id="abc11" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="abc111" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="abc111" />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-sm-12">
                    <label className="form-label">Total Order</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
};
export default AddVendor