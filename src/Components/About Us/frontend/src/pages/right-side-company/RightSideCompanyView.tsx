import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoImageFound from '../../assets/images/no_image.jpeg';
import { fetchCompanyApi, ISCompanyView } from './RightSideCompanyController';
import { useEffect, useState } from 'react';
import { routeNameRegex } from '../../common/SharedFunction';
import { COMPANY_IMG_LINK_EXTENDED } from '../../helpers/AppConstants';
import Skeleton from 'react-loading-skeleton';

const RightSideCompanyView = () => {
  const [companyList, setCompanyList] = useState<ISCompanyView[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName, subcategoryName } = location.state || {};
  const pathname = location.pathname;
  const categoryId = pathname.split("/")[2];
  const subcategoryId = pathname.split("/")[3];
  const categoryNameRegex = routeNameRegex(categoryName);

  useEffect(() => {
    if (categoryId && subcategoryId) {
      fetchCompanyApi(Number(categoryId), Number(subcategoryId), setCompanyList,setLoading);
    }
  }, [categoryId, subcategoryId]);
  const handleCompanyClick = (companyId: number, companyName: string) => {
    const slug = routeNameRegex(companyName);
    navigate(`/cd/${companyId}/${slug}`, {
      state: {
        categoryId,
        categoryName,
        subcategoryId,
        subcategoryName,
        companyName
      }
    });
  };

  const handleRefrash = async () => {
    await fetchCompanyApi(Number(categoryId), Number(subcategoryId), setCompanyList,setLoading);
  };
  return (
    <div className="right-side-module">
      <div className="right-side-module-details">
        <div className="rightSide-header">
          <div className='right-side-main-text'>
          </div>
          <div className="d-flex">
            <button
              className="icons pP"
              onClick={handleRefrash}
              title="Refresh"
            >
              <svg width="30" height="30" viewBox="0 0 50 50">
                <path
                  fill="currentColor"
                  d="M25 38c-7.2 0-13-5.8-13-13 0-3.2 1.2-6.2 3.3-8.6l1.5 1.3C15 19.7 14 22.3 14 25c0 6.1 4.9 11 11 11 1.6 0 3.1-.3 4.6-1l.8 1.8c-1.7.8-3.5 1.2-5.4 1.2z" />
                <path
                  fill="currentColor"
                  d="M34.7 33.7l-1.5-1.3c1.8-2 2.8-4.6 2.8-7.3 0-6.1-4.9-11-11-11-1.6 0-3.1.3-4.6 1l-.8-1.8c1.7-.8 3.5-1.2 5.4-1.2 7.2 0 13 5.8 13 13 0 3.1-1.2 6.2-3.3 8.6z" />
                <path fill="currentColor" d="M18 24h-2v-6h-6v-2h8z" />
                <path fill="currentColor" d="M40 34h-8v-8h2v6h6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className='right-side-scroll'>
          <div className='row'>
            <div className='col-md-12'>
              <p className="text-center h4 fw-bold  mt-3">
                Popular {subcategoryName}
              </p>
              <div className="">
                <p
                  className="text-center "
                  style={{ color: "#999" }}
                >
                  ‘4.7 Crore+‘ Businesses  & ‘5.9 Crore+’ Products & Services
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <p className="text-center" style={{ color: "#999" }}>
                <Link className='navigation-hierarchy' to="/">Home</Link> {">"}
                <Link className='navigation-hierarchy' to={`/s/${categoryId}/${categoryNameRegex}`} state={{ categoryName }}>
                  {categoryName}
                </Link>
                {">"} {subcategoryName}
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
                        className="company-card-title"
                        style={{ opacity: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                {companyList.length > 0 ? (
                  companyList.map((company, index) => (
                    <div className="col-md-2 mb-4" key={index}
                      onClick={() => handleCompanyClick(company.id, company.company_name)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card">
                        <div className="card-body" style={{ padding: "0px" }}>
                          <div className="company-card-title" style={{
                            backgroundImage: `url("${company.company_logo ? `${COMPANY_IMG_LINK_EXTENDED}${company.company_logo}` : NoImageFound}")`
                          }}>
                          </div>
                          <div className="rightSide-card-text">{company.company_name}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No Company Found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSideCompanyView