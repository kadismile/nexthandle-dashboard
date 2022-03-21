import React, {useState} from "react";
import _ from 'lodash'
import ProductService from '../services/product'
import {setProducts} from "../redux/productSlice";
import {useDispatch} from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (search.length > 3) {
      setSearchResults([]);
      const textSearch = _.debounce( async () => {
        let result: any = await ProductService.searchProducts(search);
        const {data} = result;
        dispatch(setProducts(data));
        setSearchResults([]);
        setSearchResults(data)
      },1000);
      textSearch()
    }
  };
  console.log(searchResults)

  return (
    <>
      <div className="btn-group group-link btn-set-task w-sm-100">
        <input type="search" className="form-control" name="serach" onChange={(e) => handleChange(e)} placeholder="Search" aria-label="search" aria-describedby="addon-wrapping"/>
        <button type="button" className="input-group-text" id="addon-wrapping"><i className="fa fa-search"> </i></button>
      </div>

    </>
  )
};

export default Search