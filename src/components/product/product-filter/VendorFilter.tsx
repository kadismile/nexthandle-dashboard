import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../redux/productSlice";
import VendorService from "../../../services/vendor";
import ProductService from "../../../services/product";
import _ from "lodash";
import { setSingleVendor } from "../../../redux/vendorSlice";

const VendorFilter = () => {
 const dispatch = useDispatch();
 const [vendors, setVendor]: any = useState([]);
 const [search, setSearch]: any = useState("");
 const [checkedState, setCheckedState]: any = useState([]);
 const [vendorIds, setVendorIds]: any = useState();
 const [vendorSearch, setVendorSearch] = useState("");
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
  setVendorSearch(searchParam);
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

 const handleVendorChange = (vendor: any) => {
  dispatch(setSingleVendor(vendor));
 };

 const getFilteredVendors = (arr: any[], query: string): any[] => {
  return arr?.filter((vendor) =>
   vendor.businessName.toLowerCase().includes(query.toLowerCase())
  );
 };

 const filteredVendors = getFilteredVendors(vendors, vendorSearch);

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
       {filteredVendors?.map((vendor: any, index: number) => (
        <li key={vendor._id} onClick={() => handleVendorChange(vendor)}>
         <div className="form-check">
          <label
           className="form-check-label"
           htmlFor={`vendorCheck${vendor._id}`}
          >
           <span style={{ fontSize: "14px" }}>
            {vendor.businessName.toUpperCase()}
           </span>
          </label>
          <input
           className="form-check-input"
           type="checkbox"
           value={vendor.businessName}
           checked={checkedState[vendor._id]}
           onChange={() => handleChange(index)}
           id={`vendorCheck${vendor._id}`}
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
