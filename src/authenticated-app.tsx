import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { NotFound } from "./components/404";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import React from "react";
import Vendor from "./pages/vendor";
import Product from "./pages/products";
import Category from "./pages/category";
import ProductBrand from "./pages/product-brand";
import ProductVariant from "./pages/product-variant";
import ProductAdmin from "./pages/products-admin";
import User from "./pages/user";

function AuthenticatedApp() {
  return (
    <div id="ebazar-layout" className="theme-blue">
      <SideBar />
      <div className="main px-lg-4 px-md-4">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendor />} />
          <Route path="/users" element={<User />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product-brand" element={<ProductBrand />} />
          <Route path="/product-variant" element={<ProductVariant />} />
          <Route path="/products-admin" element={<ProductAdmin />} />
          <Route path="/categories" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>

    /* <div id="ebazar-layout" className="theme-blue">
     <Routes>
       <Route index element={<SideBar/>} />
       <div className="main px-lg-4 px-md-4">
       </div>
       <Route path='/' element={<Home/>} />
       <Route path='*' element={<NotFoud/>} />
     </Routes>
     <footer className="footer">
       <div className="container-fluid">
         <div className="row">
           <div className="col-sm-6">

           </div>
           <div className="col-sm-6">
             <div className="text-sm-right d-none d-sm-block">
               {new Date().getFullYear()} © kadismile.
             </div>
           </div>
         </div>
       </div>
     </footer>
    </div>*/
  );
}

export default AuthenticatedApp;
