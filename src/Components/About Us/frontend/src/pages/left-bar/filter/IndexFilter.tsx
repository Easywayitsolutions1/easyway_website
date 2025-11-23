import { useLocation } from 'react-router-dom'

import CategoryView from './category/CategoryView'
import CompanyView from './company/CompanyView'
// import ProductView from './product/ProductView'
import PriceRangeView from './pricerange/PriceRangeView'

const IndexFilter = () => {
  const location = useLocation()
  const pathname = location.pathname

  const segments = pathname.split('/')
  // const categoryId = segments[2] // /d/1/restaurant => '1'
  const categoryName = segments[3] 
  // const shouldShowFilters = segments[1] === 's' && categoryId && categoryName
  const shouldShowFilters = categoryName

  return (
    <>
    
        <div className='leftBar-scroll'>
          <CategoryView />
            {shouldShowFilters && (
          <CompanyView />
               )} 
          {/* <ProductView /> */}
          <PriceRangeView />
        </div>
 
    </>
  )
}

export default IndexFilter
