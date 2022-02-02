import React from "react";
import {Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const getActiveLink = (pathname: any) => {
    const path = location.pathname;
    if (pathname.includes(path)) {
      return 'active'
    }
  };

  return (
    <div className="sidebar px-4 py-4 py-md-4 me-0">
      <div className="d-flex flex-column h-100">
        <a href="index.html" className="mb-0 brand-icon">
                <span className="logo-icon">
                  <i className="bi bi-bag-check-fill fs-4"/>
                </span>
          <span className="logo-text">NextHandle</span>
        </a>
        <ul className="menu-list flex-grow-1 mt-3">
          <li><a className={`m-link ${getActiveLink(['/'])}`} href="/">
            <i className="icofont-home fs-5"/>
            <span>Dashboard</span></a>
          </li>
          <li className="collapsed ">
            <a className={`m-link ${getActiveLink(['/products', '/product-brand', '/product-variant'])}`} data-bs-toggle="collapse" data-bs-target="#menu-order" href="#">
              <i className="icofont-notepad fs-5"/> <span>Products</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            <ul className="sub-menu collapse" id="menu-order">
              <li>
                <Link to='/products' className={`ms-link ${getActiveLink(['/products'])}`}>
                  Product Lists
                </Link>
              </li>
              <li>
                  <Link to='/product-brand' className={`ms-link ${getActiveLink(['/product-brand'])}`}>
                      Product Brand
                  </Link>
              </li>
              <li>
                  <Link to='/product-variant' className={`ms-link ${getActiveLink(['/product-variant'])}`}> Product Variants </Link>
              </li>
              <li>
                <Link to='/products-admin' className={`ms-link ${getActiveLink(['/product-admin'])}`}> Admin Products </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to='/categories' className={`m-link ${getActiveLink(['/categories'])}`}>
              <i className="icofont-truck-loaded fs-5"/>
              Categories
            </Link>
          </li>
          <li>
            <Link to='/vendors' className={`m-link ${getActiveLink(['/vendors'])}`}>
              <i className="icofont-funky-man fs-5"/>
              Vendor
            </Link>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#order" href="#">
              <i className="icofont-notepad fs-5"/> <span>Orders</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            <ul className="sub-menu collapse" id="order">
              <li><a className="ms-link" href="order-list.html">Orders List</a></li>
              <li><a className="ms-link" href="order-details.html">Order Details</a></li>
              <li><a className="ms-link" href="order-invoices.html">Order Invoices</a></li>
            </ul>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#menu-sale" href="#">
              <i className="icofont-sale-discount fs-5"/> <span>Sales Promotion</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="menu-sale">
              <li><a className="ms-link" href="coupons-list.html">Coupons List</a></li>
              <li><a className="ms-link" href="coupon-add.html">Coupons Add</a></li>
              <li><a className="ms-link" href="coupon-edit.html">Coupons Edit</a></li>
            </ul>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#menu-inventory" href="#">
              <i className="icofont-chart-histogram fs-5"/> <span>Inventory</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="menu-inventory">
              <li><a className="ms-link" href="inventory-info.html">Stock List</a></li>
              <li><a className="ms-link" href="purchase.html">Purchase</a></li>
              <li><a className="ms-link" href="supplier.html">Supplier</a></li>
              <li><a className="ms-link" href="returns.html">Returns</a></li>
              <li><a className="ms-link" href="department.html">Department</a></li>
            </ul>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#menu-Componentsone" href="#"><i
              className="icofont-ui-calculator"/> <span>Accounts</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="menu-Componentsone">
              <li><a className="ms-link" href="invoices.html">Invoices </a></li>
              <li><a className="ms-link" href="expenses.html">Expenses </a></li>
              <li><a className="ms-link" href="salaryslip.html">Salary Slip </a></li>
            </ul>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#app" href="#">
              <i className="icofont-code-alt fs-5"/> <span>App</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="app">
              <li><a className="ms-link" href="calendar.html">Calandar</a></li>
              <li><a className="ms-link" href="chat.html"> Chat App</a></li>
            </ul>
          </li>
          <li><a className="m-link" href="store-locator.html"><i className="icofont-focus fs-5"/>
            <span>Store Locator</span></a>
          </li>
          <li><a className="m-link" href="ui-elements/ui-alerts.html"><i className="icofont-paint fs-5"/> <span>UI Components</span></a>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#page" href="#">
              <i className="icofont-page fs-5"/> <span>Other Pages</span> <span
              className="arrow icofont-rounded-down ms-auto text-end fs-5"/></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="page">
              <li><a className="ms-link" href="admin-profile.html">Profile Page</a></li>
              <li><a className="ms-link" href="purchase-plan.html">Price Plan Example</a></li>
              <li><a className="ms-link" href="charts.html">Charts Example</a></li>
              <li><a className="ms-link" href="table.html">Table Example</a></li>
              <li><a className="ms-link" href="forms.html">Forms Example</a></li>
              <li><a className="ms-link" href="icon.html">Icons</a></li>
              <li><a className="ms-link" href="contact.html">Contact Us</a></li>
            </ul>
          </li>
        </ul>
        {/* Menu: menu collepce btn */}
        <button type="button" className="btn btn-link sidebar-mini-btn text-light">
          <span className="ms-2"><i className="icofont-bubble-right"/></span>
        </button>
      </div>
    </div>
  )
};
export default SideBar