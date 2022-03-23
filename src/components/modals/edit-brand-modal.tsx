import React, { useEffect, useState } from "react";
import toastr from "toastr";
import ProductService from "../../services/product";
import { useDispatch } from "react-redux";
import { DisabledButton } from "../libs";
import { setBrands } from "../../redux/productSlice";

const EditBrandModal = (props: any) => {
  let { brand }: any = props;

  useEffect(() => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        name: brand?.name || "",
      };
    });
  }, [props, brand?.name]);
  const dispatch = useDispatch();
  const formFields = {
    name: "",
  };
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
      case "name":
        errors.name = "";
        if (value.length && value.length <= 3) {
          errors.name = "name must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.name;
      default:
        setSubmitForm(false);
        break;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { name } = formValues;
    const data = {
      brandId: brand._id,
      name,
    };
    let response = await ProductService.updateBrand(data);
    let { status }: any = response;
    if (status === "success") {
      dispatch(setBrands(brand._id + new Date().getMilliseconds()));
      toastr.success("brand saved successfully");
    } else {
      toastr.error("error updating brand");
    }
  };

  return (
    <div
      className="modal fade"
      id="edit-brand"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title  fw-bold" id="expaddLabel">
              Edit Brand
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="col-12">
              <div className="mb-2">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  onChange={handleChange}
                  value={formValues.name}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="col-12 text-center mt-4">
              {disableForm() ? (
                <DisabledButton />
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-large waves-effect waves-light"
                  style={{ width: "200px", fontSize: "16px" }}
                  onClick={handleSubmit}
                  data-bs-dismiss="modal"
                >
                  {" "}
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBrandModal;
