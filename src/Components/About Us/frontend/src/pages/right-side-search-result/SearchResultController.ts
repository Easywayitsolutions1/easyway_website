import { toast } from "react-toastify";
import { DEFAULT_STATUS_CODE_SUCCESS, DEFAULT_TOKEN, MESSAGE_UNKNOWN_ERROR_OCCURRED } from "../../helpers/AppConstants";
import { axiosInstanceSmallOffice } from "../../services/axiosInstance";
import { TReactSetState } from "../../helpers/AppType";
export interface ICompanySerachView {
  company_name: string,
  id: number,
  company_logo: string,

}

export const fetchSearchCompany = async (
  setCompanySearchList: TReactSetState<ICompanySerachView[]>,
  term: string,
  setLoading: TReactSetState<boolean>, 
) => {
  setLoading(true);
  const requestData = {
    searchTerm: term
  };
  try {
    const data = await axiosInstanceSmallOffice.post("getAll-Search-Company-b2b", requestData, {
        headers: {
              Authorization: DEFAULT_TOKEN,
            },
    });

    if (data.status === 200) {
      if (data.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
        setCompanySearchList([]);
        toast.error(data.data.ack_msg || DEFAULT_STATUS_CODE_SUCCESS);
        return;
      }
      setCompanySearchList(data.data.data.item);
    }
  } catch (error: any) {
    toast.error(error || MESSAGE_UNKNOWN_ERROR_OCCURRED);
  }finally {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }
};