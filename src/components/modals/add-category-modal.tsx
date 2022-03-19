import React, {useState} from 'react'
import toastr from 'toastr'
import { ExportToCsv } from "export-to-csv";
import ProductService from '../../services/product'
import {setCategories} from "../../redux/categorySlice";
import {useDispatch} from "react-redux";

const CategoryModal = () => {
  const dispatch = useDispatch();
  const formFields = {
    file: '',
  };
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ ...formFields, errors: formFields });

  const downloadSampleCsv = async () => {
    let data = [{
      name: "toletries"
    }];
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Category Sample",
      useTextFile: false,
      useBom: true,
      filename: "Category CSV",
      useKeysAsHeaders: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let { name, value } = event.target;
    let { files } = event.currentTarget;
    let errors = formValues.errors;
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value && !files ? value : files ? files : ''
      };
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { file } = formValues;
    setLoading(true);
    setFormValues(prevState => {
      return {
        ...prevState,
        errors
      };
    });
    let formData = new FormData();
    formData.append('myImage', file[0]);
    let data: any = await ProductService.uploadCategoryCsv(formData);
    const { status, error } = data;
    if (error) {
      toastr.error('Error uploading csv file')
    }
    if (status === 'success') {
      toastr.success("categories uploaded successfully")
      dispatch(setCategories(true));
    }
    setLoading(false);
  };

  const {errors} = formValues;

  return (
    <div className="modal fade" id="expadd" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title  fw-bold" id="expaddLabel">Upload Category CSv </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="deadline-form">
              <form className="needs-validation" noValidate>
                <div className="form-row">

                  <p>Kindly click <a href="#" onClick={downloadSampleCsv}> <span style={{color: 'blue'}}>here</span></a> for a sample upload</p>
                  <div className="col-md-12 mb-4">
                    <label htmlFor="validationCustom01">CSV file</label>
                    <input type="file" name="file" onChange={handleChange} className="dropify" data-height="90" data-allowed-file-extensions="csv" data-max-file-size="500K"/>
                    {errors.file && errors.file.length > 0 && (
                      <span className="addGroup__error">{errors.file}</span>
                    )}
                  </div>

                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            {!loading ?
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Upload Csv
              </button> :
              <button type="submit" className="btn btn-primary">Add</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal