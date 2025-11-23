import React, { useEffect, useState } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from "formik";
import {
  createInquiry,
  createInquiryInitialValues,
  createInquiryValidationSchema,
  ICreateInquiry,
} from "./CreateInquiryController";
import FormikCustomSearchDropdown from "../../components/FormikCustomSearchDropdown";
import { fetchCompanyProductApi } from "../right-side-company-detail/CompanyDetailController";
import { SingleValue } from "react-select";
import { IOption } from "../../helpers/AppInterface";

interface IPropsCreateInquiry {
  show: boolean;
  onHide: () => void;
  contactData?: any;
  headerName: string;
  inquiryFromFlag: number;
  productIdDropdown: number | undefined;
  productImage: string;
  companyId: number;
  applicationLoginId: number | undefined;
}

const CreateInquiryView = ({
  show,
  onHide,
  contactData,
  headerName,
  inquiryFromFlag,
  productIdDropdown,
  productImage,
  companyId,
  applicationLoginId,
}: IPropsCreateInquiry) => {

  const [productList, setProductList] = useState<any>([]);

  const [selectedProductId, setSelectedProdctId] = useState<number | string>();
  const [loading, setLoading] = useState(false);

  console.log("loading",loading);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault(); 
      }
    };

    if (show) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  const handleSubmit = async (values: ICreateInquiry) => {
    createInquiry(values, onHide,companyId,Number(applicationLoginId));
  };

  const pathname = location.pathname;
  const CompanyId = pathname.split("/")[2];
  useEffect(() => {
    fetchCompanyProductApi(Number(CompanyId), setProductList,setLoading);
    setSelectedProdctId(inquiryFromFlag === 1 ? productIdDropdown || undefined : undefined);
  
  }, [show, inquiryFromFlag, productIdDropdown]);


  const requirementTypesList = [
    { id: "0", requirement_name: "One time" },
    { id: "1", requirement_name: "Recurring" },
  ];
  const requirementTypesOptions = requirementTypesList.map((itemState) => ({
    value: itemState.id,
    label: itemState.requirement_name,
  }));

  const productOptions = productList.map((itemState: any) => ({
    value: itemState.id,
    label: itemState.product_name,
  }));

  const handleProductChange = async (
    selectedOption: SingleValue<IOption>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    if (selectedOption) {
      setFieldValue("product_id", selectedOption.value);
      setSelectedProdctId(selectedOption.value as number);
    } else {
      setFieldValue("product_id", "");
      setSelectedProdctId(undefined);
    }
  };

  return (
    <React.Fragment>
      {show && (
        <div className="modal1 ">
          <div className="modal-content1">
            <span className="close" onClick={onHide}>
              &times;
            </span>
            <h2 className="modal-title1 form_header_text">{headerName}</h2>
            <p className="text-center " style={{ color: "#999" }}>
              Please enter your inquiry detail.
            </p>
            {inquiryFromFlag !== 0 && productImage && (
              <div className="inquiry-product">
                <img
                  src={productImage}
                  alt="Product"
                  style={{width:"100%"}}
                />
              </div>
            )}
            <Formik
              enableReinitialize
              initialValues={createInquiryInitialValues(
                contactData,
                selectedProductId
              )}
              validationSchema={createInquiryValidationSchema()}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="  mt-3    d-flex justify-content-center">
                    <div className="mb-3 py-4  ">
                      <div
                        className="row  mx-0 px-2 gy-3  d-flex justify-content-center"
                        style={{ maxHeight: "600px", overflowX: "scroll" }}
                      >
                        <div className="col-6 col-md-6 ">
                          <div className="form-group">
                            <label htmlFor="name " className="pb-2 form_label">
                              Product Name
                              <span className="text-danger">*</span>
                            </label>
                            <FormikCustomSearchDropdown
                              name="product_id"
                              options={productOptions}
                              className={`  ${errors.product_id &&
                                touched.product_id &&
                                "is-invalid input-box-error"
                                }`}
                                isDisabled={inquiryFromFlag === 1}
                              onChange={handleProductChange}
                            />

                            <ErrorMessage
                              name="product_id"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-6 col-md-6 ">
                          <div className="form-group">
                            <label htmlFor="static" className="mb-1 form_label">
                              Requirement Type
                            </label>
                            <FormikCustomSearchDropdown
                              name="static"
                              options={requirementTypesOptions}
                              className={`  ${errors.static &&
                                touched.static &&
                                "is-invalid input-box-error"
                                }`}
                            />

                            <ErrorMessage
                              name="static"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-6 col-md-6 ">
                          <div className="form-group">
                            <label htmlFor="name " className="pb-2 form_label">
                              Required Quantity
                            </label>
                            <Field
                              type="text"
                              name="qty"
                              className={`form-control font-size-15 rounded-1   ${errors.qty &&
                                touched.qty &&
                                "is-invalid input-box-error"

                                }`}

                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                let value = e.target.value;

                                if (!/^\d*\.?\d*$/.test(value)) {
                                  value = value.replace(/[^0-9.]/g, ""); 
                                }
                                const decimalCount = (value.match(/\./g) || [])
                                  .length;
                                if (decimalCount > 1) {
                                  value = value.slice(0, -1); 
                                }
                                setFieldValue("qty", value);
                              }}
                            />
                            <ErrorMessage
                              name="qty"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-6 col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="description"
                              className="pb-2 form_label"
                            >
                              Description <span className="text-danger">*</span>
                            </label>
                            <Field
                              as="textarea"
                              name="description"
                              className={`form-control ${errors.description && touched.description
                                ? "is-invalid input-box-error"
                                : ""
                                }`}
                              rows={1}
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-6 col-md-6 ">
                          <div className="form-group">
                            <label htmlFor="name" className="pb-2 form_label">
                             Contact Number<span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="contact_number"
                              className={`form-control font-size-15 rounded-1   ${errors.contact_number &&
                                touched.contact_number &&
                                "is-invalid input-box-error"

                                }`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                let value = e.target.value;

                                if (!/^\d*\.?\d*$/.test(value)) {
                                  value = value.replace(/[^0-9.]/g, ""); 
                                }
                                const decimalCount = (value.match(/\./g) || [])
                                  .length;
                                if (decimalCount > 1) {
                                  value = value.slice(0, -1); 
                                }

                                setFieldValue("contact_number", value);
                              }}
                            />
                            <ErrorMessage
                              name="contact_number"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-6 col-md-6 ">
                          <div className="form-group">
                            <label htmlFor="name " className="pb-2 form_label">
                             Contact Name<span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="contact_name"
                              className={`form-control font-size-15 rounded-1   ${errors.contact_name &&
                                touched.contact_name &&
                                "is-invalid input-box-error"

                                }`}
                            
                            />
                            <ErrorMessage
                              name="contact_name"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-12 pt-4 d-flex justify-content-center">
                        <button
                          className="border border-1 bg-danger px-4 me-2 py-2 text-light rounded-1 form_label"
                          onClick={onHide}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary px-4 py-2 ms-2  text-light form_label rounded-1"
                          style={{
                            backgroundColor: "#f58634",
                          }}
                        >
                          Save Inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default CreateInquiryView;