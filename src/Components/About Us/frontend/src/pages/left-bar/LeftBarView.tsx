import { Link, Outlet, useNavigate } from 'react-router-dom';
import IndexFilter from './filter/IndexFilter';
import smallOfficeLogo from '../../assets/images/small_office_log.png';
import { routes } from '../../app-routes/AppRoutingView';
import { useState } from 'react';
import { routeNameRegex } from '../../common/SharedFunction';
import { TOnKeyboardEvent } from '../../helpers/AppType';

const LeftBarView = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const handleSearchToBtn = () => {
    if (searchTerm.trim() !== '') {
      const slug = routeNameRegex(searchTerm);
      navigate(`/Q/${slug}`,{
        state:{searchTerm}
      });
     
    }else{
      setSearchTerm("")
      navigate("")
    }
  };

  const handleKeyDownSearch = (e: TOnKeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchToBtn();
    }
  };
  return (
    <>
      <div className="leftBar-bg animate__animated animate__fadeInRight">
        <div className="leftBar-header">
          <div>
            <Link to={routes.leftView}>
              <img
                src={smallOfficeLogo}
                alt="Avatar"
                width={100}
                className="ms-2"
              />
            </Link>
          </div>
        </div>

        <div className="left-search-bar">
          <div className='left-search-main-div'>
            <span className='left-search-icon search '>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className=""
              >
                <path
                  fill="currentColor"
                  d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
                ></path>
              </svg>
            </span>

            <span className='go-back'>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className=""
              >
                <path
                  fill="currentColor"
                  d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              title="Search"
              aria-label="Search"
              placeholder="Search"
              className='left-search-input'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDownSearch}

            />
            <div className='search-result'>
              <button className='icons pP' onClick={handleSearchToBtn} >
              <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </button>
            </div>
          </div>
        </div>
        <IndexFilter />
      </div>
      <div className="right-container">
        <Outlet />
      </div>
    </>
  )
}
export default LeftBarView