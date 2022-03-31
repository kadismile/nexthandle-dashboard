import React, { useEffect, useState } from "react";
import moment from "moment";
import ProductService from "../../../services/product";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/productSlice";
import { singleCategory } from "../../../redux/categorySlice";
import { selectOneVendor } from "../../../redux/vendorSlice";
import { useLocation } from "react-router";
const DateFilter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const storedCategory = useSelector(singleCategory);
  const storedVendor = useSelector(selectOneVendor);
  const [formValues, setFormValues] = useState({
    from: moment().format("Y-M-D"),
    to: moment().format("Y-M-D"),
  });
  const handleChange = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    let { name, value } = event.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const { from, to } = formValues;
  useEffect(() => {
    (async () => {
      if (moment(from).isSame(to)) {
      } else {
        // let params = `field=createdAt&gt=${from}&lte=${to}`;
        if (location.pathname.includes("admin")) {
          const products: any = await ProductService.getAdminProducts(
            storedCategory._id,
            storedVendor._id,
            `gt=${from}`,
            `lt=${to}`
          );
          console.log(products);

          dispatch(setProducts(products?.data?.data));
        } else {
          let products: any = await ProductService.getProducts(
            storedCategory._id,
            storedVendor._id,
            "",
            `gt=${from}`,
            `lt=${to}`
          );
          const {
            data: { data },
          } = products;
          dispatch(setProducts(data));
        }
      }
    })();
  }, [
    from,
    to,
    dispatch,
    location.pathname,
    storedCategory._id,
    storedVendor._id,
  ]);

  return (
    <div className="card mb-3">
      <div className="price-range-block">
        <div className="filter-title">
          <a
            className="title"
            data-bs-toggle="collapse"
            href="#pricingTwo"
            role="button"
            aria-expanded="false"
          >
            Date Range
          </a>
        </div>
        <div className="collapse show" id="pricingTwo">
          <div className="price-range">
            <div className="price-amount flex-wrap">
              <div className="amount-input mt-1">
                <label className="fw-bold">From</label>
                <div className="input-group">
                  <input
                    type="date"
                    name="from"
                    value={formValues.from}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="amount-input mt-1">
                <label className="fw-bold">To</label>
                <div className="input-group">
                  <input
                    type="date"
                    name="to"
                    value={formValues.to}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div
              id="slider-range2"
              className="slider-range noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DateFilter;
