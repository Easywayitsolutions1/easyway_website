
const company = [
    "MRF",
    "Jio",
    "Adani Solar",
    "Adani Gas",
    "Trands",
    "Leans Cart",
    "zometo",
];

const CompanyView = () => {
    return (
        <>
            <div className="filter-main-container">
                <h2 className="filter-title">Company Filter</h2>
                <div className="filter-list-container">
                    <ul className="filter-list">
                        {company && company.map((companyData, companyItems) => (
                            <li key={companyItems} className="filter-items">
                                <input type="checkbox"className="filter-checkbox" />
                                <label htmlFor={`company-${companyItems}`} className="filter-label">{companyData}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CompanyView;