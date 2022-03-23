import React, { useEffect, useState } from "react";
import toastr from "toastr";
import CategoryService from "../../services/category";
import { useDispatch } from "react-redux";
import { DisabledButton } from "../libs";
import { updateCategories } from "../../redux/categorySlice";

const EditCategoryModal = (props: any) => {
  let { category }: any = props;

  useEffect(() => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        name: category?.name || "",
      };
    });
  }, [props, category?.name]);
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
    const catData = {
      categoryId: category._id,
      name,
    };
    let response: any = await CategoryService.updateCategory(catData);
    let { status, data }: any = response;
    if (status === "success") {
      dispatch(updateCategories(data));
      toastr.success("category saved successfully");
    } else {
      toastr.error("category updated successfully");
    }
  };

  return (
    <div
      className="modal fade"
      id="edit-category"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title  fw-bold" id="expaddLabel">
              Edit Category
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
                <label className="form-label">Category Name</label>
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

export default EditCategoryModal;
