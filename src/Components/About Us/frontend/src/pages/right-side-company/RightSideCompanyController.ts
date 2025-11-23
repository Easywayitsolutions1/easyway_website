import { toast } from "react-toastify";
import { DEFAULT_STATUS_CODE_SUCCESS, MESSAGE_UNKNOWN_ERROR_OCCURRED } from "../../helpers/AppConstants";
import { TReactSetState } from "../../helpers/AppType";
import { axiosInstance, axiosInstanceSmallOffice } from "../../services/axiosInstance";
export interface ISCompanyView {
    company_name: string;
    id: number;
    company_logo:string;
  }

export const fetchCompanyApi = async (
    categoryId: number,
    subcategoryId:number,
    setCompanyList: TReactSetState<ISCompanyView[]>,
  setLoading: TReactSetState<boolean>, 

  ) => {
    setLoading(true);
     
    const requestData = {
      table: "company_masters",
      columns: "id,company_name,company_logo",
    where: subcategoryId == -1 
    ? `{"isDelete":"0","category_id_b2b":"${categoryId}"}` 
    : `{"isDelete":"0","category_id_b2b":"${categoryId}","sub_category_id_b2b":"${subcategoryId}"}`,   
      request_flag: 1,
      order: `{"id":"DESC"}`,
    };    
    try {
      const data = await axiosInstanceSmallOffice.post("mainCommonGet", requestData);
      if (data.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
        setCompanyList([]);

      }
      setCompanyList(data.data.data);
    } catch (error: any) {
      toast.error(error || MESSAGE_UNKNOWN_ERROR_OCCURRED);
    } finally {
      setTimeout(() => {
        setLoading(false); 
      }, 1000); 
    }
  };