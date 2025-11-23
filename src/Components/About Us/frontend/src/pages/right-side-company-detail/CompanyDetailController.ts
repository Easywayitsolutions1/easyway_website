import { toast } from "react-toastify";
import { DEFAULT_STATUS_CODE_SUCCESS, DEFAULT_TOKEN, MESSAGE_UNKNOWN_ERROR_OCCURRED } from "../../helpers/AppConstants";
import { TReactSetState } from "../../helpers/AppType";
import { axiosInstance, axiosInstanceSmallOffice } from "../../services/axiosInstance";

export interface ISProductDetailView {
  product_name: string,
  id: number,
  product_img: string,
}

export interface ISCompanyDetailView {
  id: number;
  company_name: string,
  company_logo: string,
  address: string,
  country_id: number,
  state_id: number,
  city_id: number,
  company_contact: number | string,
  category_id_b2b: number,
  sub_category_id_b2b: number
  company_email: string,
  company_catalog:string,
  a_application_login_id:number,

}
export interface ISCompanyWiseCatDetailView {
  id: number,
  category_name_b2b: string,
}

export interface ISCompanyWiseSubCatDetailView {
  id: number,
  sub_category_name_b2b: string,
}
export const fetchCompanyProductApi = async (
  CompanyId: number,
  setProductDetailList: TReactSetState<ISProductDetailView[]>,
  setLoading: TReactSetState<boolean>, 

) => {
  setLoading(true);

  const requestData = {
    table: "products",
    columns: "id,product_name,product_img",
    where: `{"isDelete":"0","company_masters_id":"${CompanyId}"}`,
    request_flag: 1,
    order: `{"id":"DESC"}`,
  };
  const companyMasterId = CompanyId;
  
  try {
    const data = await axiosInstanceSmallOffice.post("commonGet", requestData,{
      headers: {
        "x-tenant-id": companyMasterId,

      },
      });
    if (data.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
      setProductDetailList([]);
      toast.error(data.data.ack_msg || DEFAULT_STATUS_CODE_SUCCESS);
      return;

    }
    setProductDetailList(data.data.data);
  } catch (error: any) {
    toast.error(error || MESSAGE_UNKNOWN_ERROR_OCCURRED);
  }finally {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }
};

export const fetchCompanyDetailApi = async (
  CompanyId: number,
  setCompanyDetailList: TReactSetState<ISCompanyDetailView | undefined>, 
  setLoading: TReactSetState<boolean>, 

) => {
  setLoading(true);
  const requestData = {
    table: "company_masters",
    columns: "id,company_name,company_logo,address,country_id,state_id,city_id,company_contact,category_id_b2b,sub_category_id_b2b,company_email,company_catalog,a_application_login_id",
    where: `{"isDelete":"0","id":"${CompanyId}"}`,
    request_flag: 1,
    order: `{"id":"DESC"}`,
  };

  try {
    const data = await axiosInstanceSmallOffice.post("mainCommonGet", requestData);

    if (data.data.ack !== DEFAULT_STATUS_CODE_SUCCESS || !data.data.data.length) {
      setCompanyDetailList(undefined);
      return;
    }

    const companyData = data.data.data[0]; 
    setCompanyDetailList(companyData);
  } catch (error: any) {
    toast.error(error || MESSAGE_UNKNOWN_ERROR_OCCURRED);
  }finally {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }
};

export const fetchCategoryApiForCompany = async (
  categoryId: number | undefined,
  setCategoryList: TReactSetState<ISCompanyWiseCatDetailView | undefined>
) => {
  const requestData = {
    table: "category_b2b",
    columns: "id,category_name_b2b",
    where: `{"isDelete":"0","id":"${categoryId}"}`,
    order: `{"id":"DESC"}`,
  };
  try {
    const response = await axiosInstance.post("rp-get-data", requestData);
    if (response.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
      setCategoryList(undefined);
      return;
    }
    setCategoryList(response.data?.data?.item[0]);
  } catch (error) {
    console.error("Error fetching Category:", error);
  }
};

export const fetchSubCategoryApiForCompany = async (
  subCategoryId: number | undefined,
  setSubCategoryList: TReactSetState<ISCompanyWiseSubCatDetailView | undefined>
) => {
  const requestData = {
    table: "sub_category_b2b",
    columns: "id,sub_category_name_b2b",
    where: `{"isDelete":"0","id":"${subCategoryId}"}`,
    order: `{"id":"DESC"}`,
  };
  try {
    const response = await axiosInstance.post("rp-get-data", requestData);
    if (response.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
      setSubCategoryList(undefined);
      return;
    }
    setSubCategoryList(response.data?.data?.item[0]);

  } catch (error) {
    console.error("Error fetching Category:", error);
  }

};