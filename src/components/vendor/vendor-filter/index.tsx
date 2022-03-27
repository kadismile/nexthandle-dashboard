import React from "react";
import DateFilter from "../../product/product-filter/DateFilter";
import VendorCategoryFilter from "./VendorCategory";

const VendorFilter = () => {
  return (
    <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-3">
      <div className="sticky-lg-top">
        <div className="card mb-3">
          <div className="reset-block">
            <div className="filter-title">
              <h4 className="title">Filter</h4>
            </div>
            <div className="filter-btn">
              <a className="btn btn-primary" href="/#">
                Reset
              </a>
            </div>
          </div>
        </div>
        <VendorCategoryFilter />
        <DateFilter />
      </div>
    </div>
  );
};

export default VendorFilter;
