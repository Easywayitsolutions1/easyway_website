import { toast } from "react-toastify";
import { DEFAULT_STATUS_CODE_SUCCESS, DEFAULT_TOKEN, MESSAGE_UNKNOWN_ERROR_OCCURRED } from "../../helpers/AppConstants";
import { TReactSetState } from "../../helpers/AppType";
import { axiosInstance } from "../../services/axiosInstance";

export interface ICategory {
  category_name_b2b: string,
  id: number,
  category_img_b2b:string,
}

export const fetchCategoryApi = async (
  setCategoryLists: TReactSetState<ICategory[]>, 
  setLoading: TReactSetState<boolean> 
) => {
  setLoading(true);

  try {
    const data = await axiosInstance.post(
      "category-b2b",
      {},
      {
        headers: {
          Authorization: DEFAULT_TOKEN,
        },
      }
    );

    if (data.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
      setCategoryLists([]);
      toast.error(data.data.ack_msg || MESSAGE_UNKNOWN_ERROR_OCCURRED);
    } else {
      setCategoryLists(data.data.data.item);
    }
  } catch (error: any) {
    toast.error(error?.message || MESSAGE_UNKNOWN_ERROR_OCCURRED);
  } finally {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }
};