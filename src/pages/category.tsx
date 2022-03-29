import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectCategory } from "../redux/categorySlice";
import CategoryServices from "../services/category";
import { PageSpinner } from "../components/libs";
import CategoryModal from "../components/modals/add-category-modal";
import toastr from "toastr";
import AWN from "awesome-notifications";
import EditCategoryModal from "../components/modals/edit-category-modal";
import ActiveFilter from "../components/category/category-filter";

const Category = () => {
  const storedCategories = useSelector(selectCategory);
  const [categories, setCategories] = useState(storedCategories);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(undefined);
  let notifier = new AWN();

  const fetchCategories = async () => {
    setLoading(true);
    let params = `isActive=true`;
    let categories: any = await CategoryServices.getCategories(params);
    const {
      data: { data },
    } = categories;
    if (data) {
      setCategories(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setCategories(storedCategories);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    })();
  }, [storedCategories]);

  const handleChange = async (event: {
    preventDefault: () => void;
    target: { name: any; value: any; id: any };
  }) => {
    const { id } = event.target;
    const category = categories.find((c: any) => c._id === id);
    let onOk = async () => {
      event.preventDefault();
      setLoading(true);
      const doc = {
        categoryId: category._id,
        isActive: !category.isActive,
      };
      await CategoryServices.updateCategory(doc);
      await fetchCategories();
    };
    let onCancel = () => {
      return;
    };
    notifier.confirm("Are you sure?", onOk, onCancel, {
      labels: {
        confirm: `Update Category to ${
          category.isActive ? "InActive ?" : "Active ?"
        }`,
      },
    });
  };
  const copyToClipBoard = async (catId: string) => {
    toastr.success("cat_id copied to clipboard");
    return await navigator.clipboard.writeText(catId);
  };

  return (
    <>
      <div className="body d-flex py-lg-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0">Category</h3>
                <div className="col-auto d-flex w-sm-100">
                  <button
                    type="button"
                    className="btn btn-primary btn-set-task w-sm-100"
                    data-bs-toggle="modal"
                    data-bs-target="#expadd"
                  >
                    {" "}
                    <i
                      className="icofont-plus-circle me-2 fs-6"
                      data-bs-toggle="modal"
                      data-bs-target="#expadd"
                    >
                      {" "}
                    </i>{" "}
                    Upload Csv
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <ActiveFilter />
            <div className="col-md-12 col-lg-8 col-xl-8 col-xxl-9">
              {loading ? (
                <PageSpinner />
              ) : categories.length ? (
                <div className="row clearfix g-3">
                  <div className="col-sm-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <table
                          id="myProjectTable"
                          className="table table-hover align-middle mb-0"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>category id</th>
                              <th>Name</th>
                              <th>Created</th>
                              <th>Actions</th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((cat: any, index: number) => {
                              return (
                                <tr
                                  key={cat._id}
                                  style={{
                                    backgroundColor: !cat.isActive
                                      ? "#f5eacb"
                                      : "",
                                  }}
                                >
                                  <td>
                                    <strong>#{index + 1}</strong>
                                  </td>
                                  <td>
                                    <a
                                      href="#/"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="copy to clipboard"
                                      style={{ marginRight: "15px" }}
                                      onClick={() => copyToClipBoard(cat._id)}
                                    >
                                      <i className="icofont-copy"> </i>
                                    </a>
                                    <strong>{cat._id}</strong>
                                  </td>
                                  <td>
                                    <a href="customer-detail.html">
                                      <i className="icofont-chart-flow fs-5" />
                                      <span className="fw-bold ms-1">
                                        {cat.name}
                                      </span>
                                    </a>
                                  </td>
                                  <td>
                                    {moment(cat.createdAt).format(
                                      "do MMM, YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <div className="form-check form-switch position-absolute">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={cat._id}
                                        onChange={handleChange}
                                        checked={cat.isActive}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="Eaten-switch1"
                                      >
                                        {" "}
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      style={{ marginTop: "18px" }}
                                      onClick={() => setSelectedCat(cat)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-category"
                                    >
                                      <i className="icofont-edit text-success" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row clearfix g-3">
                  <div className="col-sm-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h3 style={{ textAlign: "center" }}> No Categories </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CategoryModal />
      <EditCategoryModal category={selectedCat} />
    </>
  );
};

export default Category;
