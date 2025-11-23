import  { useState } from 'react';
import { TOnChangeInput } from '../../../../helpers/AppType';
const PriceRangeView = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(7500);

  const handleMinChange = (e:TOnChangeInput) => {
    const value = Number(e.target.value);
    if (value <= maxPrice - 100) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e:TOnChangeInput) => {
    const value = Number(e.target.value);
    if (value >= minPrice + 100) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="filter-main-container">
      <h2 className="filter-title">Price Range Filter</h2>
      <div>
        <div className="price-filter-input">
          <div className="price-filter-field">
            <span>Min</span>
            <input 
              type="number" 
              className="input-min" 
              value={minPrice} 
              onChange={handleMinChange} 
            />
          </div>
          <div className="price-filter-separator">-</div>
          <div className="price-filter-field">
            <span>Max</span>
            <input 
              type="number" 
              className="input-max" 
              value={maxPrice} 
              onChange={handleMaxChange} 
            />
          </div>
        </div>
        <div className="price-filter-slider">
          <div
            className="price-filter-result"
            style={{
              left: `${(minPrice / 10000) * 100}%`,
              right: `${100 - (maxPrice / 10000) * 100}%`,
            }}
          />
        </div>
        <div className="price-main-range">
          <input
            type="range"
            className="range-slider price-range-min"
            min={0}
            max={10000}
            value={minPrice}
            step={100}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className="range-slider price-range-max"
            min={0}
            max={10000}
            value={maxPrice}
            step={100}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeView;