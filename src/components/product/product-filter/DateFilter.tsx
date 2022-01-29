import React, {useEffect, useState} from "react";
import moment from 'moment'
import ProductService from "../../../services/product";
import {useDispatch} from 'react-redux'
import {setProducts} from "../../../redux/productSlice";

const DateFilter = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    from: moment().format('Y-M-D'),
    to: moment().format('Y-M-D')
  });
  const handleChange = (event: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    event.preventDefault();
    let { name, value } = event.target;
    setFormValues(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  };
  const {from, to} = formValues;
  useEffect( ()=> {
    ( async ()=> {
      if (moment(from).isSame(to)) {} else {
        let params = `field=createdAt&gt=${from}&lte=${to}`;
        let products:any = await ProductService.getProducts(params);
        const {data: {data}} = products;
        dispatch(setProducts(data))
      }
    })()
  },[from, to]);

  return (
    <div className="card mb-3">
      <div className="price-range-block">
        <div className="filter-title">
          <a className="title" data-bs-toggle="collapse" href="#pricingTwo" role="button" aria-expanded="false">Date Range</a>
        </div>
        <div className="collapse show" id="pricingTwo">
          <div className="price-range">
            <div className="price-amount flex-wrap">
              <div className="amount-input mt-1">
                <label className="fw-bold">From</label>
                <div className="input-group">
                  <input type="date" name="from" value={formValues.from} className="form-control" onChange={handleChange}/>
                </div>
              </div>
              <div className="amount-input mt-1">
                <label className="fw-bold">To</label>
                <div className="input-group">
                  <input type="date" name="to" value={formValues.to} className="form-control" onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div id="slider-range2" className="slider-range noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr" />
          </div>
        </div>
      </div>
    </div>
  )
};
export default DateFilter