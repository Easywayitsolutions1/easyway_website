import { useEffect, useState } from "react";
import { fetchCategoryApi, ICategory } from "../../../right-side-category/RightSideCategoryController";
import { useNavigate } from "react-router-dom";
import { routeNameRegex } from "../../../../common/SharedFunction";

const CategoryView = () => {
  const [categoryFilterLists, setCategoryFilterLists] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    fetchCategoryApi(setCategoryFilterLists,setLoading);
  }, []);

    const navigate = useNavigate();
   const handleCategoryClick = (categoryId: number, categoryName: string) => {
      const slug = routeNameRegex(categoryName);
      navigate(`/c/${categoryId}/-1/${slug}`, {
        state: { categoryName }
      });
    };
  return (
    <div className="filter-main-container">
      <h2 className="filter-title">Category Filter</h2>
      <div className="filter-list-container">
        <ul className="filter-list">
          {categoryFilterLists.length > 0 ? (
            categoryFilterLists.map((categoryFilter, index) => (
              <li key={index} className="filter-items"onClick={() => handleCategoryClick(categoryFilter.id, categoryFilter.category_name_b2b)}>
                {categoryFilter.category_name_b2b}
              </li>
            ))
          ) : (
            <p className="text-center text-muted">No Categories Found</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default CategoryView;