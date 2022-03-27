import React, { useState } from "react";
import toastr from "toastr";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import UserService from "../../services/user";
import { DisabledButton } from "../../components/libs";
import { selectUser, setUser, setToken } from "../../redux/userSlice";

function LoginToken({ email }: any) {
  const dispatch = useDispatch();
  const formFields = {
    loginToken: "",
  };
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
      case "loginToken":
        errors.loginToken = "";
        if (value.length && value.length <= 4) {
          errors.loginToken = "invalid token provided";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.loginToken;
      default:
        setSubmitForm(false);
        break;
    }
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    const { loginToken } = formValues;
    let response: any = await UserService.verifyToken(email, loginToken);
    if (response.status === "failed") {
      toastr.error("invalid token provided");
      setLoading(false);
    } else {
      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
      setLoading(false);
      window.location.replace("/");
    }
  };
  const displayError = (error: string) => {
    if (error.length) return <span className="addUser__error">{error}</span>;
  };
  const { errors } = formValues;
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
                    <h1>Login Token</h1>
                  </div>

                  <div className="col-12">
                    <div className="mb-2">
                      <label className="form-label">Login Token</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="000000"
                        name="loginToken"
                        onChange={handleChange}
                        value={formValues.loginToken}
                      />
                      {displayError(errors.loginToken)}
                    </div>
                  </div>

                  <div className="col-12 text-center mt-4">
                    {disableForm() ? (
                      <DisabledButton />
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-large waves-effect waves-light"
                        style={{ width: "200px", fontSize: "16px" }}
                        onClick={handleSubmit}
                      >
                        {" "}
                        SUBMIT
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

export { LoginToken };
