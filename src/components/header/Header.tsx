import React from "react";
import { useDispatch } from "react-redux";
import { resetState, selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetState());
    window.location.replace("/");
  };

  return (
    <div className="header">
      <nav className="navbar py-4">
        <div className="container-xxl">
          {/* header rightbar icon */}
          <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">

            <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
              <div className="u-info me-2">
                <p className="mb-0 text-end line-height-sm ">
                  <span className="font-weight-bold">{authUser.fullName}</span>
                </p>
                <small>Admin Profile</small>
              </div>
              <a
                className="nav-link dropdown-toggle pulse p-0"
                href="/#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
              >
                <img
                  className="avatar lg rounded-circle img-thumbnail"
                  src="/assets/images/profile_av.svg"
                  alt="profile"
                />
              </a>
              <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                <div className="card border-0 w280">
                  <div className="card-body pb-0">
                    <div className="d-flex py-1">
                      <img
                        className="avatar rounded-circle"
                        src="/assets/images/profile_av.svg"
                        alt="profile"
                      />
                      <div className="flex-fill ms-3">
                        <p className="mb-0">
                          <span className="font-weight-bold">
                            {authUser.fullName}
                          </span>
                        </p>
                        <small className={""}>{authUser.email}</small>
                      </div>
                    </div>
                    <div>
                      <hr className="dropdown-divider border-dark" />
                    </div>
                  </div>
                  <div className="list-group m-2 ">
                    <a
                      href="admin-profile.html"
                      className="list-group-item list-group-item-action border-0 "
                    >
                      <i className="icofont-ui-user fs-5 me-3" />
                      Profile Page
                    </a>
                    <a
                      href="order-invoices.html"
                      className="list-group-item list-group-item-action border-0 "
                    >
                      <i className="icofont-file-text fs-5 me-3" />
                      Order Invoices
                    </a>
                    <a
                      href="/#"
                      onClick={handleClick}
                      className="list-group-item list-group-item-action border-0 "
                    >
                      <i className="icofont-logout fs-5 me-3" />
                      Signout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* menu toggler */}
          <button
            className="navbar-toggler p-0 border-0 menu-toggle order-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainHeader"
          >
            <span className="fa fa-bars" />
          </button>
          {/* main menu Search*/}
          <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
            <div className="input-group flex-nowrap input-group-lg">
              <input
                type="search"
                className="form-control"
                placeholder="Global Search"
                aria-label="search"
                aria-describedby="addon-wrapping"
              />
              <button
                type="button"
                className="input-group-text"
                id="addon-wrapping"
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
