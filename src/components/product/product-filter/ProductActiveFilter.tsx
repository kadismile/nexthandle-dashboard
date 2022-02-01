import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {setProducts, setIsActive, selectProductIsActive} from "../../../redux/productSlice";
import ProductSrvice from "../../../services/product";

const ProductActiveFilter = () => {
  const dispatch = useDispatch();
  const storedActive = useSelector(selectProductIsActive);
  const [active, setActive] = useState(storedActive);

  useEffect( ()=> {
    ( async ()=> {
      let params = `isActive=${active}`;
      let vendors:any = await ProductSrvice.getProducts(params);
      const {data: {data}} = vendors;
      dispatch(setProducts(data))
    })()
  },[active]);

  const handleChange = async () => {
    dispatch(setIsActive({isActive: !active}));
    setActive(!active)
  };

  return (
    <div className="card mb-3">
      <div className="categories">
        <div className="filter-title">
          <a className="title" data-bs-toggle="collapse" href="#active" role="button" aria-expanded="true">Active</a>
        </div>
        <div className="collapse show" id="active">
          <div className="filter-category">
            <ul className="category-list">
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault1"
                    checked={active}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault1">
                    Active
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};
export default ProductActiveFilter