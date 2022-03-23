import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../../redux/categorySlice";
import CategoryService from "../../../services/category";

const CategoryActiveFilter = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);

  useEffect(() => {
    (async () => {
      let params = `isActive=${active}`;
      let vendors: any = await CategoryService.getCategories(params);
      const {
        data: { data },
      } = vendors;
      dispatch(setCategories(data));
    })();
  }, [active, dispatch]);

  const handleChange = async () => {
    setActive(!active);
  };

  return (
    <div className="card mb-3">
      <div className="categories">
        <div className="filter-title">
          <a
            className="title"
            data-bs-toggle="collapse"
            href="#vendor"
            role="button"
            aria-expanded="true"
          >
            Categories
          </a>
        </div>
        <div className="collapse show" id="vendor">
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
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault1"
                  >
                    Active
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryActiveFilter;
