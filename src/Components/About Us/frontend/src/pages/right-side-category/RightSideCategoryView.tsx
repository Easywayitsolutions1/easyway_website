import { useEffect, useState } from 'react';
import { fetchCategoryApi, ICategory } from './RightSideCategoryController.js';
import { useNavigate } from 'react-router-dom';
import NoImageFound from '../../assets/images/no_image.jpeg';
import { routeNameRegex } from '../../common/SharedFunction.js';
import Skeleton from 'react-loading-skeleton';

const RightSideCategoryView = () => {
  const [categoryLists, setCategoryLists] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategoryApi(setCategoryLists,setLoading);
  }, []);
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    const catslug = routeNameRegex(categoryName);      
    navigate(`/s/${categoryId}/${catslug}`, {
      state: {categoryName}  
    });
  };

  return (
    <div className="right-side-module">
      <div className="right-side-module-details">
        <div className="rightSide-header">
          <div className="right-side-main-text">
          </div>
          <div className="d-flex">
            <button
              className="icons pP"
              title="Refresh"
              onClick={() => fetchCategoryApi(setCategoryLists,setLoading)}
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
              <p className="text-center h4 fw-bold mt-3">
                Welcome To Small Office B2B
              </p>
              <p className="text-center" style={{ color: "#999" }}>
                ‘4.7 Crore+‘ Businesses & ‘5.9 Crore+’ Products & Services
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
                            className="rightSide-card-image"
                            style={{ opacity:  1 }}
                          />
                      </div>
                    </div>
                ))}
              </div>
            ) : (
              <div className="row">
                {categoryLists.length > 0 ? (
                  categoryLists.map((category, index) => (
                    <div
                      className="col-md-2 mb-4"
                      key={index}
                      onClick={() =>
                        handleCategoryClick(
                          category.id,
                          category.category_name_b2b
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card">
                        <div
                          className="card-body"
                          style={{ padding: "0px" }}
                        >
                          <div
                            className="category-card-title"
                            style={{
                              backgroundImage: `url("${
                                category.category_img_b2b
                                  ? category.category_img_b2b
                                  : NoImageFound
                              }")`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              height: "120px",
                            }}
                          />
                          <div className="rightSide-card-text">
                            {category.category_name_b2b}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    No Categories Found
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
export default RightSideCategoryView;