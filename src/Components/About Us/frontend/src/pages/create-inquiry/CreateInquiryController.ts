import * as Yup from "yup";
import { axiosInstanceSmallOffice } from "../../services/axiosInstance";
import {
  DEFAULT_STATUS_CODE_SUCCESS,
  DEFAULT_TOKEN,
  MESSAGE_UNKNOWN_ERROR_OCCURRED,
} from "../../helpers/AppConstants";
import { toast } from "react-toastify";

export interface ICreateInquiry {
  product_id: string;
  category_id: string;
  description: number | string;
  qty: string;
  source_type_id: string;
  label_id?: string;
  static: string;
  contact_number: number | string;
  contact_name: string;
  companyId: number | string;

}
export const orderTypesInqFormCustomInquiryList = [
  { id: "1", order_type_display: "Number" },
  { id: "2", order_type_display: "Text" },
  { id: "3", order_type_display: "TextArea" },
  { id: "4", order_type_display: "Date" },
  { id: "5", order_type_display: "DateAndTime" },
  { id: "6", order_type_display: "Time" },
  { id: "7", order_type_display: "Switch" },
];
export interface ICustomFromList {
  id: number;
  title: string;
  data_type: number;
  display_order: number;
  required_or_not: number;
  reference_column_name: string;
  data_sorce: string;
  form_type: number
}


export const createInquiryInitialValues = (
  inquiryToEdit: ICreateInquiry | undefined,
  selectedProductId: any
): ICreateInquiry => ({
  product_id: (selectedProductId) || "",
  category_id: inquiryToEdit?.category_id || "",
  description: inquiryToEdit?.description || " ",
  qty: inquiryToEdit?.qty || "",
  static: inquiryToEdit?.static || "0",
  source_type_id: inquiryToEdit?.source_type_id || "",
  contact_number: inquiryToEdit?.contact_number || "",
  contact_name: inquiryToEdit?.contact_name || "",
  companyId: inquiryToEdit?.companyId || "",
});

export const createInquiryValidationSchema = (
) => {

  return Yup.object().shape({
    description: Yup.string().trim().required("Description is required"),
    contact_number: Yup.string().trim().required("contact Number is required"),
    contact_name: Yup.string().trim().required("contact Name is required"),
  });
};

export const createInquiry = async (
  values: ICreateInquiry,
  onHide: () => void,
  companyId: number,
  applicationLoginId: number,  
) => {

  try {
    const requestData = {
        product_id: values.product_id,
        description: values.description,
        qty: values.qty,
        source_type_id: -3,
        static_id: values.static,
        company_masters_id: companyId,
        contact_number: values.contact_number,
        contact_name: values.contact_name,
        a_application_login_id: applicationLoginId,
    };

    const { data } = await axiosInstanceSmallOffice.post("b2b-create-inquiry", requestData, {
      headers: {
        Authorization: DEFAULT_TOKEN,
        "x-tenant-id": applicationLoginId,
      },
    });
    if (data.code === 200) {
      if (data.ack === DEFAULT_STATUS_CODE_SUCCESS) {
        toast.success(data.ack_msg);
        onHide();

      } else {
        toast.error(data.ack_msg || MESSAGE_UNKNOWN_ERROR_OCCURRED);
      }
    }
  } catch (error: any) {
    toast.error(error || MESSAGE_UNKNOWN_ERROR_OCCURRED);
  }
};