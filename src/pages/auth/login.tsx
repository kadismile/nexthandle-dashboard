import React, { useState } from "react";
import validator from "validator";
import toastr from "toastr";

import UserService from "../../services/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { DisabledButton } from "../../components/libs";

function Login() {
  const formFields = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    ...formFields,
    errors: formFields,
  });
  const [submitForm, setSubmitForm] = useState(false);
  const disableForm = () => {
    let newValues = { ...formValues };
    let isError = false;
    for (let val of Object.values(newValues)) {
      if (val === "") {
        isError = true;
      }
    }
    if (isError && submitForm) {
      return true;
    }
    if (!isError && !submitForm) {
      return true;
    }
    if (isError && !submitForm) {
      return true;
    }
    if (!isError && !submitForm) {
      return false;
    }
  };
  const handleChange = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    let { name, value } = event.target;
    let errors = formValues.errors;
    validateForm(name, errors, value);
    setFormValues((prevState) => {
      return {
        ...prevState,
        errors,
        [name]: value,
      };
    });
    for (let val of Object.values(formValues.errors)) {
      if (val !== "") {
        setSubmitForm(false);
      }
    }
  };
  const validateForm = (name: any, errors: any, value: any) => {
    switch (name) {
      case "email":
        errors.email = "";
        if (value.length && value.length <= 3) {
          errors.email = "email must be more than 3 characters long!";
          setSubmitForm(false);
        } else if (!validator.isEmail(value)) {
          errors.email = "Email is not valid!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.email;
      case "password":
        errors.password = "";
        if (value.length && value.length <= 5) {
          errors.password = "password too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.password;
      default:
        setSubmitForm(false);
        break;
    }
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = formValues;
    let response = await UserService.login(email, password);
    let { message, status, token, user }: any = response;
    if (status === "success") {
      setLoading(false);
      dispatch(setUser({ token, ...user }));
      toastr.success(message);
      window.location.replace("/");
    } else {
      setLoading(false);
      toastr.error("Invalid Credentials");
    }
  };

  return (
    <div className="main p-2 py-3 p-xl-5 ">
      <div className="body d-flex p-0 p-xl-5">
        <div className="container-xxl">
          <div className="row g-0">
            <div className="col-lg-12 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
              <div
                className="w-100 p-3 p-md-5 card border-0 shadow-sm"
                style={{ maxWidth: "32rem" }}
              >
                <form className="row g-1 p-3 p-md-4">
                  <div className="col-12 text-center mb-5">
                    <h1>Login</h1>
                  </div>

                  <div className="col-12">
                    <div className="mb-2">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="name@example.com"
                        name="email"
                        onChange={handleChange}
                        value={formValues.email}
                      />
                      {/*{ displayError(errors.email) }*/}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-2">
                      <div className="form-label">
                        <span className="d-flex justify-content-between align-items-center">
                          Password
                          <a
                            className="text-secondary"
                            href="auth-password-reset.html"
                          >
                            Forgot Password?
                          </a>
                        </span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="***************"
                        onChange={handleChange}
                        value={formValues.password}
                      />
                      {/*{ displayError(errors.password) }*/}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-12 text-center mt-4">
                    {disableForm() ? (
                      <DisabledButton />
                    ) : !loading ? (
                      <button
                        type="button"
                        className="btn btn-primary btn-large waves-effect waves-light"
                        style={{ width: "200px", fontSize: "16px" }}
                        onClick={handleSubmit}
                      >
                        {" "}
                        SIGN IN
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-large waves-effect waves-light"
                        style={{ width: "200px", fontSize: "16px" }}
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Loading...</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Login };
