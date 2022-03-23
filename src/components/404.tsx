import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center min-vh-100">
            <div className="w-100 d-block my-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                  <div className="card">
                    <div className="card-body">
                      <div className="mt-4 pt-3 text-center">
                        <div className="row justify-content-center"></div>
                        <h3 className="expired-title mb-4 mt-3">
                          404 NOT FOUND
                        </h3>
                        <p className="text-muted mt-3">
                          You have missed your way
                        </p>
                      </div>

                      <div className="mb-3 mt-4 text-center">
                        <Link to="/" className="btn btn-primary btn-block">
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NotFound };
