const products = [
    "MRF tier",
    "JIo Petrol Pump",
    "Adani degital solar",
    "Adani Green",
    "Mens Jens",
    "Frem less spaek",
    "Gujrati diss",
];

const ProductView = () => {
    return (
        <div className="filter-main-container">
            <h2 className="filter-title">Product Filter</h2>
            <div className="filter-list-container">
                <ul className="filter-list">
                    {products && products.map((product, productItems) => (
                        <li key={productItems} className="filter-items">
                            <input type="radio" className="filter-checkbox" />
                            <label htmlFor={`product-${productItems}`} className="filter-label">{product}</label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductView