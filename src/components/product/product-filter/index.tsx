import React from "react";
import CategoryFilter from "./CategoryFilter";
import VendorFilter from "./VendorFilter";
import DateFilter from "./DateFilter";
// import ActiveFilter from "../../category/category-filter";
// import CategoryActiveFilter from "../../category/category-filter/category-filter";
import ProductActiveFilter from "./ProductActiveFilter";

const ProductFilter = () => {
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
        <ProductActiveFilter />
        <VendorFilter />
        <CategoryFilter />
        <DateFilter />
      </div>
    </div>
  );
};

export default ProductFilter;
