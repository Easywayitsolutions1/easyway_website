import { toast } from "react-toastify";
import { DEFAULT_STATUS_CODE_SUCCESS, DEFAULT_TOKEN, MESSAGE_UNKNOWN_ERROR_OCCURRED } from "../../helpers/AppConstants";
import { TReactSetState } from "../../helpers/AppType";
import { axiosInstance } from "../../services/axiosInstance";

export interface ISubCategory {
    sub_category_name_b2b: string,
    id: number,
    subcategory_img_b2b:string,
}

export const fetchSubCategoryApi = async (
    categoryId: number,
    setSubCategoryLists: TReactSetState<ISubCategory[]>,
  setLoading: TReactSetState<boolean>, 

) => {
    setLoading(true);
    const requestData = {
        category_id: categoryId,
    };

    try {
        const data = await axiosInstance.post("subCategory-b2b", requestData, {
            headers: {
                Authorization: DEFAULT_TOKEN,
            },
        });

        console.log("SubCategory Response:", data.data);

        if (data.data.ack !== DEFAULT_STATUS_CODE_SUCCESS) {
            setSubCategoryLists([]);
            toast.error(data.data.ack_msg || MESSAGE_UNKNOWN_ERROR_OCCURRED);
            return;
        }
        setSubCategoryLists(data.data.data.item);
    } catch (error: any) {
        toast.error(error.message || MESSAGE_UNKNOWN_ERROR_OCCURRED);
    }finally {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }
};
