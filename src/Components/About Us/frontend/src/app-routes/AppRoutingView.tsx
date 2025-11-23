import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound';
import LeftBarView from '../pages/left-bar/LeftBarView';
import TestPage from '../pages/right-side-module/TestPage';
import RightSideCategoryView from '../pages/right-side-category/RightSideCategoryView';
import RightSideCompanyView from '../pages/right-side-company/RightSideCompanyView';
import SearchResultView from '../pages/right-side-search-result/SearchResultView';
import CompanyDetailView from '../pages/right-side-company-detail/CompanyDetailView';
import Demo from "../parth_rnd/readmail";
import RightSideSubCategoryView from '../pages/right-side-subcategory/RightSideSubCategoryView';

export const routes = {
  leftView: "/",
  rightmoduleview: "rightSideModule",
  testPageshow: "testPage",
  rightSideCategory: "/category",
  rightSideSubcategory: "/s/:categoryId/:categoryName",
  rightSideCompany: "c/:categoryId/:subcategoryId/:subcategoryName",
  rightSideSearchResult: "/Q/:searchTerm",
  rightSideCompanyDetail: "/cd/:companyId/:companyName",
  demo: "/demo"
};

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.leftView} element={<LeftBarView />}>
          <Route index element={<RightSideCategoryView />} />
          <Route path={routes.testPageshow} element={<TestPage />} />
          <Route path={routes.rightSideSubcategory} element={<RightSideSubCategoryView />}></Route>
          <Route path={routes.rightSideCompany} element={<RightSideCompanyView />}></Route>
          <Route path={routes.rightSideSearchResult} element={<SearchResultView />}></Route>
          <Route path={routes.rightSideCompanyDetail} element={<CompanyDetailView />}></Route>
          <Route path={routes.demo} element={<Demo />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouting;