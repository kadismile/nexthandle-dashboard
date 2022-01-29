import React from "react";
import {useDispatch} from "react-redux";
import {resetState, selectUser} from "../../redux/userSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = () => {
   dispatch(resetState())
    window.location.replace("/")
  };
  return (
    <div className="header">
      <nav className="navbar py-4">
        <div className="container-xxl">
          {/* header rightbar icon */}
          <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
            <div className="d-flex">
              <a className="nav-link text-primary collapsed" href="help.html" title="Get Help">
                <i className="icofont-info-square fs-5"/>
              </a>
            </div>
            <div className="dropdown zindex-popover">
              <a className="nav-link dropdown-toggle pulse" href="#" role="button" data-bs-toggle="dropdown">
                <img src="/assets/images/flag/GB.png" alt=""/>
              </a>
              <div
                className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-md-end p-0 m-0 mt-3">
                <div className="card border-0">
                  <ul className="list-unstyled py-2 px-3">
                    <li>
                      <a href="#" className={''}><img src="/assets/images/flag/GB.png" alt=""/> English</a>
                    </li>
                    <li>
                      <a href="#" className={''}><img src="/assets/images/flag/DE.png" alt=""/> German</a>
                    </li>
                    <li>
                      <a href="#" className={''}><img src="/assets/images/flag/FR.png" alt=""/> French</a>
                    </li>
                    <li>
                      <a href="#" className={''}><img src="/assets/images/flag/IT.png" alt=""/> Italian</a>
                    </li>
                    <li>
                      <a href="#" className={''}><img src="/assets/images/flag/RU.png" alt=""/> Russian</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="dropdown notifications">
              <a className="nav-link dropdown-toggle pulse" href="#" role="button" data-bs-toggle="dropdown">
                <i className="icofont-alarm fs-5"/>
                <span className="pulse-ring"/>
              </a>
              <div id="NotificationsDiv"
                   className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-md-end p-0 m-0 mt-3">
                <div className="card border-0 w380">
                  <div className="card-header border-0 p-3">
                    <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                      <span>Notifications</span>
                      <span className="badge text-white">06</span>
                    </h5>
                  </div>
                  <div className="tab-content card-body">
                    <div className="tab-pane fade show active">
                      <ul className="list-unstyled list mb-0">
                        <li className="py-2 mb-1 border-bottom">
                          <a href="javascript:void(0);" className="d-flex">
                            <img className="avatar rounded-circle" src="/assets/images/xs/avatar1.svg" alt=""/>
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Chloe Walkerr</span>
                                <small>2MIN</small></p>
                              <span className={''}>Added New Product 2021-07-15 <span
                                className="badge bg-success">Add</span></span>
                            </div>
                          </a>
                        </li>
                        <li className="py-2 mb-1 border-bottom">
                          <a href="javascript:void(0);" className="d-flex">
                            <div className="avatar rounded-circle no-thumbnail">AH</div>
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Alan	Hill</span>
                                <small>13MIN</small></p>
                              <span className={''}>Invoice generator </span>
                            </div>
                          </a>
                        </li>
                        <li className="py-2 mb-1 border-bottom">
                          <a href="javascript:void(0);" className="d-flex">
                            <img className="avatar rounded-circle" src="/assets/images/xs/avatar3.svg" alt=""/>
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Melanie	Oliver</span>
                                <small>1HR</small></p>
                              <span className={''}>Orader  Return RT-00004</span>
                            </div>
                          </a>
                        </li>
                        <li className="py-2 mb-1 border-bottom">
                          <a href="javascript:void(0);" className="d-flex">
                            <img className="avatar rounded-circle" src="/assets/images/xs/avatar5.svg" alt=""/>
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Boris Hart</span>
                                <small>13MIN</small></p>
                              <span className={''}>Product Order to Toyseller</span>
                            </div>
                          </a>
                        </li>
                        <li className="py-2 mb-1 border-bottom">
                          <a href="javascript:void(0);" className="d-flex">
                            <img className="avatar rounded-circle" src="/assets/images/xs/avatar6.svg" alt=""/>
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Alan	Lambert</span>
                                <small>1HR</small></p>
                              <span className={''}>Leave Apply</span>
                            </div>
                          </a>
                        </li>
                        <li className="py-2">
                          <a href="javascript:void(0);" className="d-flex">
                            <img className="avatar rounded-circle" src="/assets/images/xs/avatar7.svg" alt=""/>
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Zoe Wright</span>
                                <small className={''}>1DAY</small>
                              </p>
                              <span className={''}>Product Stoke Entry Updated</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a className="card-footer text-center border-top-0" href="#"> View all notifications</a>
                </div>
              </div>
            </div>
            <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
              <div className="u-info me-2">
                <p className="mb-0 text-end line-height-sm "><span className="font-weight-bold">{authUser.fullName}</span>
                </p>
                <small>Admin Profile</small>
              </div>
              <a className="nav-link dropdown-toggle pulse p-0" href="#" role="button" data-bs-toggle="dropdown"
                 data-bs-display="static">
                <img className="avatar lg rounded-circle img-thumbnail" src="/assets/images/profile_av.svg"
                     alt="profile"/>
              </a>
              <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                <div className="card border-0 w280">
                  <div className="card-body pb-0">
                    <div className="d-flex py-1">
                      <img className="avatar rounded-circle" src="/assets/images/profile_av.svg" alt="profile"/>
                      <div className="flex-fill ms-3">
                        <p className="mb-0"><span className="font-weight-bold">{authUser.fullName}</span></p>
                        <small className={''}>{authUser.email}</small>
                      </div>
                    </div>
                    <div>
                      <hr className="dropdown-divider border-dark"/>
                    </div>
                  </div>
                  <div className="list-group m-2 ">
                    <a href="admin-profile.html" className="list-group-item list-group-item-action border-0 "><i
                      className="icofont-ui-user fs-5 me-3"/>Profile Page</a>
                    <a href="order-invoices.html" className="list-group-item list-group-item-action border-0 "><i
                      className="icofont-file-text fs-5 me-3"/>Order Invoices</a>
                    <a onClick={handleClick}
                       className="list-group-item list-group-item-action border-0 "><i
                      className="icofont-logout fs-5 me-3"/>Signout</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* menu toggler */}
          <button className="navbar-toggler p-0 border-0 menu-toggle order-3" type="button" data-bs-toggle="collapse"
                  data-bs-target="#mainHeader">
            <span className="fa fa-bars"/>
          </button>
          {/* main menu Search*/}
          <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
            <div className="input-group flex-nowrap input-group-lg">
              <input type="search" className="form-control" placeholder="Global Search" aria-label="search"
                     aria-describedby="addon-wrapping"/>
              <button type="button" className="input-group-text" id="addon-wrapping"><i className="fa fa-search"/>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
};
export default Header