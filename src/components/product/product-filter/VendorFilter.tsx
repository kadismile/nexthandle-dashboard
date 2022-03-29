import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../redux/productSlice";
import VendorService from "../../../services/vendor";
import ProductService from "../../../services/product";
import _ from "lodash";

const VendorFilter = () => {
 const dispatch = useDispatch();
 const [vendors, setVendor]: any = useState([]);
 const [search, setSearch]: any = useState("");
 const [checkedState, setCheckedState]: any = useState([]);
 const [vendorIds, setVendorIds]: any = useState();

 const fetchVendors = async () => {
  let params = `isActive=true`;
  let vendors: any = await VendorService.getVendors(params);
  const {
   data: { data },
  } = vendors;
  if (data) {
   setVendor(data);
   setCheckedState(
    data.map((vendor: any) => {
     return { [vendor._id]: false };
    })
   );
  }
 };

 useEffect(() => {
  (async () => {
   await fetchVendors();
  })();
 }, []);

 useEffect(() => {
  (async () => {
   if (vendorIds?.length) {
    let ids = vendorIds.map((vendorId: any) => `"${Object.keys(vendorId)}"`);
    let params = `field=vendor&in=[${ids}]`;
    let products: any = await ProductService.getProducts(params);
    const {
     data: { data },
    } = products;
    dispatch(setProducts(data));
   }
  })();
 }, [vendorIds, dispatch]);

 const handleChange = (position: number) => {
  checkedState.forEach((item: any, index: number) => {
   if (index === position) {
    item[Object.keys(item)[0]] = !Object.values(item)[0];
   }
  });
  setVendorIds(
   checkedState.filter((state: any) => Object.values(state)[0] === true)
  );
 };

 const handleSearch = async (e: {
  preventDefault: () => void;
  target: { name: any; value: any };
 }) => {
  e.preventDefault();
  const searchParam = e.target.value;
  setSearch(searchParam);
  if (searchParam.length > 3) {
   const textSearch = _.debounce(async () => {
    let result: any = await VendorService.searchVendors(search);
    const { data } = result;
    setVendor(data);
   }, 1000);
   textSearch();
  } else {
   await fetchVendors();
  }
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
      Vendors
     </a>
    </div>
    <div className="collapse show" id="vendor">
     <div className="filter-search">
      <form action="#">
       <input
        type="text"
        name="serach"
        onChange={(e) => handleSearch(e)}
        placeholder="Search"
        className="form-control"
       />
       <button>
        <i className="lni lni-search-alt" />
       </button>
      </form>
     </div>
     <div className="filter-category">
      <ul className="category-list">
       {vendors?.map(({ businessName, _id }: any, index: number) => (
        <li key={_id}>
         <div className="form-check">
          <label className="form-check-label" htmlFor={`vendorCheck${_id}`}>
           <span style={{ fontSize: "14px" }}>
            {businessName.toUpperCase()}
           </span>
          </label>
          <input
           className="form-check-input"
           type="checkbox"
           value={businessName}
           checked={checkedState[_id]}
           onChange={() => handleChange(index)}
           id={`vendorCheck${_id}`}
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
export default VendorFilter;
