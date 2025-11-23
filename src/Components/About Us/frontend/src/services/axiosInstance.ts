import axios from 'axios';
import { BACKEND_OF_SMALL_OFFICE_B2B_PORTAL_END_POINT, BACKEND_OF_SMALL_OFFICE_CRM_END_POINT } from '../helpers/AppConstants';

const axiosInstanceSmallOffice = axios.create({
  baseURL: `${BACKEND_OF_SMALL_OFFICE_CRM_END_POINT}/api`, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',
  },
});

const axiosInstance = axios.create({
  baseURL: `${BACKEND_OF_SMALL_OFFICE_B2B_PORTAL_END_POINT}/api`, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',
  },
});
const axiosInstanceFormData = axios.create({
  baseURL: `${BACKEND_OF_SMALL_OFFICE_B2B_PORTAL_END_POINT}/api`, 
  timeout: 10000, 
  headers: {
    "Content-Type": "multipart/form-data", 
    'Access-Control-Allow-Origin': '',
  },
});
export { axiosInstance, axiosInstanceFormData ,axiosInstanceSmallOffice};