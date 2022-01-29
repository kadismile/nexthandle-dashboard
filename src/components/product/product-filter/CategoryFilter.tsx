import React, {useEffect, useState} from "react";
import ProductService from "../../../services/product";

const CategoryFilter = () => {
  const [categories, setVendor] = useState([]);
  useEffect(()=> {
    ( async ()=> {
      let fetchCategories: any = await ProductService.getCategories();
      const {data: {data}} = fetchCategories;
      if (data) {
        setVendor(data)
      }
    })()
  },[]);
  return (
    <div className="card mb-3">
      <div className="categories">
        <div className="filter-title">
          <a className="title" data-bs-toggle="collapse" href="#category" role="button" aria-expanded="true">Categories</a>
        </div>
        <div className="collapse show" id="category">
          <div className="filter-search">
            <form action="#">
              <input type="text" placeholder="Search" className="form-control" />
              <button><i className="lni lni-search-alt" /></button>
            </form>
          </div>
          <div className="filter-category">
            <ul className="category-list">
              {
                categories.map((cat:any) =>
                  <li key={cat._id}>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={`categoryCheck${cat._id}`}>
                        <span style={{fontSize: '14px'}}>{(cat.name).toUpperCase()}</span>
                      </label>
                      <input className="form-check-input" type="checkbox" value="" id={`categoryCheck${cat._id}`}/>
                    </div>
                  </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};
export default CategoryFilter