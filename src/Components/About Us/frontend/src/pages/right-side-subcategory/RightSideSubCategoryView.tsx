import { Link, useLocation, useNavigate } from "react-router-dom";
import NoImageFound from "../../assets/images/no_image.jpeg";
import { useEffect, useState } from "react";
import {
  fetchSubCategoryApi,
  ISubCategory,
} from "./RightSideSubCategoryController";
import { routeNameRegex } from "../../common/SharedFunction";
import Skeleton from "react-loading-skeleton";

const RightSideSubCategoryView = () => {
  const GetCategoryDatalocation = useLocation();
  const { categoryName } = GetCategoryDatalocation.state || {};
  const pathname = location.pathname;
  const categoryId = pathname.split("/")[2];

  const [subCategoryLists, setSubCategoryLists] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategoryApi(Number(categoryId), setSubCategoryLists, setLoading); 
    }
  }, [categoryId]);

  const navigate = useNavigate();
  const handleCategoryClick = (
    subcategoryId: number,
    subcategoryName: string
  ) => {
    const slug = routeNameRegex(subcategoryName);
    navigate(`/c/${categoryId}/${subcategoryId}/${slug}`, {
      state: {
        categoryName,
        subcategoryName,
        subcategoryId,
        categoryId,
      },
    });
  };

  const handleRefrash = async () => {
    await fetchSubCategoryApi(
      Number(categoryId),
      setSubCategoryLists,
      setLoading
    );
  };
  return (
    <div className="right-side-module">
      <div className="right-side-module-details">
        <div className="rightSide-header">
          <div className="right-side-main-text"></div>
          <div className="d-flex">
            <button
              className="icons pP"
              title="Refresh"
              onClick={() => handleRefrash()}
            >
              <svg width="30" height="30" viewBox="0 0 50 50">
                <path
                  fill="currentColor"
                  d="M25 38c-7.2 0-13-5.8-13-13 0-3.2 1.2-6.2 3.3-8.6l1.5 1.3C15 19.7 14 22.3 14 25c0 6.1 4.9 11 11 11 1.6 0 3.1-.3 4.6-1l.8 1.8c-1.7.8-3.5 1.2-5.4 1.2z"
                />
                <path
                  fill="currentColor"
                  d="M34.7 33.7l-1.5-1.3c1.8-2 2.8-4.6 2.8-7.3 0-6.1-4.9-11-11-11-1.6 0-3.1.3-4.6 1l-.8-1.8c1.7-.8 3.5-1.2 5.4-1.2 7.2 0 13 5.8 13 13 0 3.1-1.2 6.2-3.3 8.6z"
                />
                <path fill="currentColor" d="M18 24h-2v-6h-6v-2h8z" />
                <path fill="currentColor" d="M40 34h-8v-8h2v6h6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="right-side-scroll">
          <div className="row">
            <div className="col-md-12">
              <p className="text-center h4 fw-bold mt-3">{categoryName}</p>
              <p className="text-center" style={{ color: "#999" }}>
                ‘4.7 Crore+‘ Businesses & ‘5.9 Crore+’ Products & Services
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="text-center" style={{ color: "#999" }}>
                <Link className="navigation-hierarchy" to="/">
                  Home
                </Link>{" "}
                {" > "}
                {categoryName}
              </p>
            </div>
          </div>
          <div className="chatBox">
            {loading ? (
              <div className="row">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div className="col-md-2 mb-4" key={index}>
                    <div className="card">
                      <Skeleton
                        height={140}
                        duration={2}
                        className="subcategory-card-title"
                        style={{ opacity: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                {subCategoryLists.length > 0 ? (
                  subCategoryLists.map((subcategory, index) => (
                    <div
                      className="col-md-2 mb-4"
                      key={index}
                      onClick={() =>
                        handleCategoryClick(
                          subcategory.id,
                          subcategory.sub_category_name_b2b
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card">
                        <div className="card-body" style={{ padding: "0px" }}>
                          <div
                            className="subcategory-card-title"
                            style={{
                              backgroundImage: `url("${
                                subcategory.subcategory_img_b2b
                                  ? subcategory.subcategory_img_b2b
                                  : NoImageFound
                              }")`,
                            }}
                          >
                          </div>
                          <div className="rightSide-card-text">
                            {subcategory.sub_category_name_b2b}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    No SubCategories Found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideSubCategoryView;
