import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../globals/AppContext";
import ProductService from "../../../services/product";
const CategoryFilter = () => {
 const [categories, setVendor] = useState([]);
 const [searchCat, setSearchCat] = useState("");

 const { storeCategory } = useAppContext();
 useEffect(() => {
  (async () => {
   let fetchCategories: any = await ProductService.getCategories();
   const {
    data: { data },
   } = fetchCategories;
   if (data) {
    setVendor(data);
   }
  })();
 }, []);

 const getFilteredCategories = (arr: any[], query: string): any[] => {
  return arr?.filter((category) =>
   category.name.toLowerCase().includes(query.toLowerCase())
  );
 };
 return (
  <div className="card mb-3">
   <div className="categories">
    <div className="filter-title">
     <a
      className="title"
      data-bs-toggle="collapse"
      href="#category"
      role="button"
      aria-expanded="true"
     >
      Categories
     </a>
    </div>
    <div className="collapse show" id="category">
     <div className="filter-search">
      <form action="#">
       <input
        type="text"
        placeholder="Search"
        className="form-control"
        onChange={(e) => setSearchCat(e.target.value)}
        value={searchCat}
       />
       <button>
        <i className="lni lni-search-alt" />
       </button>
      </form>
     </div>
     <div className="filter-category">
      <ul className="category-list">
       {getFilteredCategories(categories, searchCat).map((cat: any) => (
        <li key={cat._id} onClick={() => storeCategory(cat.name.toLowerCase())}>
         <div className="form-check">
          <label
           className="form-check-label"
           htmlFor={`categoryCheck${cat._id}`}
          >
           <span style={{ fontSize: "14px" }}>{cat.name.toUpperCase()}</span>
          </label>
          <input
           className="form-check-input"
           type="checkbox"
           value=""
           id={`categoryCheck${cat._id}`}
          />
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </div>
  </div>
 );
};
export default CategoryFilter;
