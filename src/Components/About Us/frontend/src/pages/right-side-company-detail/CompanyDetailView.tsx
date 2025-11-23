import NoImageFound from '../../assets/images/no_image.jpeg';
import { useEffect, useState } from 'react';
import { fetchCategoryApiForCompany, fetchCompanyDetailApi, fetchCompanyProductApi, fetchSubCategoryApiForCompany, ISCompanyDetailView, ISCompanyWiseCatDetailView, ISCompanyWiseSubCatDetailView, ISProductDetailView } from './CompanyDetailController';
import { COMPANY_IMG_LINK_EXTENDED, PRODUCT_IMG_LINK_EXTENDED } from '../../helpers/AppConstants';
import CreateInquiryView from '../create-inquiry/CreateInquiryView';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { routeNameRegex } from '../../common/SharedFunction';
import Skeleton from 'react-loading-skeleton';


const CompanyDetailView = () => {
    const [productDetailList, setProductDetailList] = useState<ISProductDetailView[]>([]);
    const [companyDetailList, setCompanyDetailList] = useState<ISCompanyDetailView>();
    const [categoryList, setCategoryList] = useState<ISCompanyWiseCatDetailView>();
    const [subCategoryList, setSubCategoryList] = useState<ISCompanyWiseSubCatDetailView>();
    const [isCreateInquiry, setIsCreateInquiry] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("Create Inquiry");
    const [selectedProduct, setSelectedProduct] = useState<ISProductDetailView>();
    const [inquiryFromFlag, setInquiryFromFlag] = useState(0);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const {
        categoryName,
        subcategoryName,
        companyName
    } = location.state || {};
    const pathname = location.pathname;
    const CompanyId = pathname.split("/")[2];
    useEffect(() => {
        if (CompanyId) {
            fetchCompanyProductApi(Number(CompanyId), setProductDetailList, setLoading);
            fetchCompanyDetailApi(Number(CompanyId), setCompanyDetailList, setLoading);
        }
    }, [CompanyId]);

    useEffect(() => {
        fetchCategoryApiForCompany(companyDetailList?.category_id_b2b, setCategoryList);
        fetchSubCategoryApiForCompany(companyDetailList?.sub_category_id_b2b, setSubCategoryList);

    }, [companyDetailList?.category_id_b2b, companyDetailList?.sub_category_id_b2b])
    const companyPhoneNumber = companyDetailList?.company_contact;
    const openWhatsApp = () => {
        const url = `https://wa.me/${companyPhoneNumber}`;
        window.open(url, "_blank");
    };
    const emailAddress = companyDetailList?.company_email;
    const openEmailClient = () => {
        const gmailUrl = `https://mail.google.com/mail/?&to=${emailAddress}`;
        window.open(gmailUrl, "_blank");
    };
      const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
    const handleDownload = async () => {
        try {
            const fileUrl = companyDetailList?.company_catalog
                ? `${COMPANY_IMG_LINK_EXTENDED}${companyDetailList?.company_catalog}`
                : "";

            const response = await axios.get(fileUrl, { responseType: "blob" });


            const fileName = `${companyDetailList?.company_name}`;

            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the file", error);
        }
    };
    const handleChangeAddInquiry = () => {
        setHeaderTitle("Create Inquiry");
        setInquiryFromFlag(0);
        setIsCreateInquiry(true)
    };
    const handleImageClick = (productDetail: ISProductDetailView) => {
        setSelectedProduct(productDetail);
        setHeaderTitle(`Create Inquiry For ${productDetail?.product_name || ""}`);
        setIsCreateInquiry(true);
        setInquiryFromFlag(1);
    };
    const categoryNameRegex = routeNameRegex(categoryList?.category_name_b2b)
    const subCategoryNameRegex = routeNameRegex(subCategoryList?.sub_category_name_b2b)

    const handleRefrash = async () => {
        fetchCompanyProductApi(Number(CompanyId), setProductDetailList, setLoading);
        fetchCompanyDetailApi(Number(CompanyId), setCompanyDetailList, setLoading);
    };
    return (
        <>
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
                    <div className='right-side-scroll'>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-center" style={{ color: "#999" }}>
                                    <Link className='navigation-hierarchy' to={"/"}>Home</Link> {" > "}


                                    <Link
                                        className='navigation-hierarchy'
                                        to={`/s/${categoryList?.id}/${categoryNameRegex}`}
                                        state={{ categoryName }}
                                    >
                                        {categoryList?.category_name_b2b}
                                    </Link> {" > "}


                                    <Link
                                        className='navigation-hierarchy'
                                        to={`/c/${categoryList?.id}/${subCategoryList?.id}/${subCategoryNameRegex}`}
                                        state={{ subcategoryName, categoryName }}
                                    >
                                        {subCategoryList?.sub_category_name_b2b}
                                    </Link>

                                    {" > "} {companyName}
                                </p>
                            </div>
                        </div>
                        <div className="chatBox">
                            {loading ? (
                                <div className="row">
                                    {Array.from({ length: 1 }).map((_, index) => (
                                        <div className="col-md-12 mb-4" key={index}>
                                            <Skeleton
                                                height={140}
                                                duration={2}
                                                style={{ opacity: 1 }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-md-12 mt-4" style={{ backgroundColor: "white" }}>
                                        <div className="row">
                                            <div
                                                className="col-md-3 p-0 rightSide-card-image-company-logo"
                                                style={{
                                                    backgroundImage: `url(${companyDetailList?.company_logo ? `${COMPANY_IMG_LINK_EXTENDED}${companyDetailList.company_logo}` : NoImageFound})`
                                                }}
                                            >
                                            </div>
                                            <div className="col-md-6">
                                                <p className="text-left h4 fw-bold pt-2">
                                                    {companyDetailList?.company_name}
                                                </p>
                                                <p className="text-left mb-0 fw-bold">{companyDetailList?.address}{","} {companyDetailList?.country_id} {","} {companyDetailList?.state_id}{","} {companyDetailList?.city_id}</p>
                                                <p className="text-left-cat">
                                                    {(categoryList?.category_name_b2b)} {">"}
                                                    {(subCategoryList?.sub_category_name_b2b)}
                                                </p>
                                                 <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => setRating(starValue)}
              style={{ display: "none" }}
            />
            <span
              style={{
                fontSize: "2rem",
                color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
                                            </div>
                                            <div className="col-md-3 pt-3">
                                                <p className="icons-whatsapp" onClick={openWhatsApp}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        x="0px"
                                                        y="0px"
                                                        width="20px"
                                                        height="20px"
                                                        viewBox="0 0 50 50"
                                                    >
                                                        <path d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path>
                                                        <path
                                                            fill="#fff"
                                                            d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
                                                        ></path>
                                                        <path
                                                            fill="#cfd8dc"
                                                            d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
                                                        ></path>
                                                        <path
                                                            fill="#40c351"
                                                            d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
                                                        ></path>
                                                        <path
                                                            fill="#fff"
                                                            d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
                                                        ></path>
                                                    </svg>
                                                    WhatsApp Now
                                                </p>

                                                <p className="icons-Email" onClick={openEmailClient}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        x="0px"
                                                        y="0px"
                                                        width="25px"
                                                        height="25px"
                                                        viewBox="0 0 40 30"
                                                    >
                                                        <path
                                                            fill="#fff"
                                                            d="M 4 5 C 2.9069372 5 2 5.9069372 2 7 L 2 23 C 2 24.093063 2.9069372 25 4 25 L 26 25 C 27.093063 25 28 24.093063 28 23 L 28 7 C 28 5.9069372 27.093063 5 26 5 L 4 5 z M 6.6992188 7 L 23.300781 7 L 15 13.134766 L 6.6992188 7 z M 5 9.4746094 L 15 16.865234 L 25 9.4746094 L 25 23 L 5 23 L 5 9.4746094 z"
                                                        ></path>
                                                    </svg>
                                                    Email Now
                                                </p>
                                                {companyDetailList?.company_catalog ? (
                                                    <p className="icons-catalog" onClick={handleDownload}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="20px"
                                                            viewBox="0 -960 960 960"
                                                            width="20px"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560h600v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-600H320v480h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h360v80H360Zm0 120v-80h360v80H360ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm0 0h-40 400-360Z"></path>
                                                        </svg>
                                                        View Catalog
                                                    </p>
                                                ) : (
                                                    <p className="icons-catalog">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="20px"
                                                            viewBox="0 -960 960 960"
                                                            width="20px"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560h600v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-600H320v480h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h360v80H360Zm0 120v-80h360v80H360ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm0 0h-40 400-360Z"></path>
                                                        </svg>
                                                        Not Available
                                                    </p>
                                                )}


                                                <p className="icons-inquiry" onClick={() =>
                                                    handleChangeAddInquiry()

                                                }>
                                                    <svg
                                                        height="22px"
                                                        viewBox="0 -960 960 960"
                                                        width="22px"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM400-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v76H400Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM120-400v-80h320v80H120Zm0-320v-80h480v80H120Zm324 160H120v-80h360q-14 17-22.5 37T444-560Z"></path>
                                                    </svg>
                                                    Inquiry Now
                                                </p>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p className="text-center h4 fw-bold  mt-3">
                                    Our Products & Services
                                </p>
                                {/* <div className="">
                                    <p
                                        className="text-center "
                                        style={{ color: "#999" }}
                                    >
                                        ‘4.7 Crore+‘ Businesses  & ‘5.9 Crore+’ Products & Services
                                    </p>
                                </div> */}
                            </div>
                        </div>

                        <div className="chatBox">
                            {loading ? (
                                <div className="row">
                                    {Array.from({ length: 18 }).map((_, index) => (
                                        <div className="col-md-2 mb-4" key={index}>
                                            <div className="card">
                                                <Skeleton
                                                    height={140}
                                                    duration={2}
                                                    className="product-card-title"
                                                    style={{ opacity: 1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="row">
                                    {productDetailList.length > 0 ? (
                                        productDetailList.map((productDetail, index) => (
                                            <div className="col-md-2 mb-4 " key={index}>
                                                <div className="card">
                                                    <div className="card-body" style={{ padding: "0px" }}>
                                                        <div className="product-card-title" style={{ backgroundImage: `url(${productDetail.product_img ? PRODUCT_IMG_LINK_EXTENDED + productDetail.product_img : NoImageFound})`, }} onClick={() => handleImageClick(productDetail)}>
                                                        </div>
                                                        <div className="rightSide-card-text">{productDetail.product_name}</div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted">No Products Found</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <>
                <CreateInquiryView
                    show={isCreateInquiry}
                    onHide={() => setIsCreateInquiry(false)}
                    headerName={headerTitle}
                    inquiryFromFlag={inquiryFromFlag}
                    productIdDropdown={selectedProduct?.id}
                    productImage={selectedProduct?.product_img ? `${PRODUCT_IMG_LINK_EXTENDED}${selectedProduct.product_img}` : NoImageFound} // Pass Image
                    companyId={Number(CompanyId)}
                    applicationLoginId={companyDetailList?.a_application_login_id}
                />
            </>
        </>
    );
};
export default CompanyDetailView