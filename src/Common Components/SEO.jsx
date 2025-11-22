import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage = "/Images/logo.png",
  ogType = "website",
  canonicalUrl
}) => {
  const location = useLocation();
  const baseUrl = "https://easywayitsolutions.com";
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  
  // Default values
  const defaultTitle = "EasyWay IT Solutions - Best IT Company in Rajkot | Web Development, Software Development, UI/UX Design Services";
  const defaultDescription = "EasyWay IT Solutions is a leading IT solutions company in Rajkot, Gujarat. We provide professional IT services, custom web development, software development, UI/UX design, and video editing services. Best IT service provider for businesses in Rajkot.";
  const defaultKeywords = "IT solutions company, IT service provider, Best IT company, Professional IT services, IT consulting services, Custom IT solutions, Web development company, Website development services, Custom website development, Professional website design, Web design agency, Full-stack web development, Ecommerce website development, Affordable web development services, Custom web development agency, Best website development company for startups, Responsive website design services, Website redesign services, Software development company, Custom software development, Enterprise software development, SaaS development company, Mobile app development company, Application development services, Custom software development for business, Software development outsourcing company, Offshore software development services, Best software company for enterprises, UI/UX design services, UI/UX design agency, Mobile app UI/UX design, Website UI/UX design services, Professional UI/UX designer for startups, User interface design services, UX research and design company, App UI design services, Video editing services, Professional video editing, Motion graphics services, Video post-production services, Video editing services for YouTube creators, Corporate video editing services, Promotional video editing, Video editing outsourcing services, Custom IT solutions for businesses, Best IT service provider for small businesses, Affordable software development services, Global website development company, Worldwide IT services, IT outsourcing services, Digital product development agency, End-to-end software development services, Top-rated IT solutions provider, Leading web development company, Award-winning software development company, Professional UI/UX design agency, IT company in Rajkot, IT solutions in Rajkot, Best IT services in Rajkot, IT service provider in Rajkot, IT consulting company Rajkot, Professional IT solutions Rajkot, Web development company in Rajkot, Website developer in Rajkot, Best web development services Rajkot, Custom website development in Rajkot, Ecommerce website development Rajkot, Website designer in Rajkot, Web design company in Rajkot Gujarat, Responsive website design Rajkot, Software development company in Rajkot, Custom software development Rajkot, Software developers in Rajkot, Mobile app development company Rajkot, ERP software development Rajkot, SaaS development company Rajkot, UI/UX design company in Rajkot, UI designer in Rajkot, UX designer in Rajkot, Mobile app UI/UX design Rajkot, Website UI/UX design services Rajkot, Video editing services in Rajkot, Professional video editor in Rajkot, Corporate video editing Rajkot, YouTube video editor Rajkot, Video production and editing Rajkot, Affordable web development in Rajkot, Best software development for small business Rajkot, Custom website design services Rajkot Gujarat, Professional UI/UX design for startups Rajkot, Video editing services for businesses Rajkot, Website redesign expert in Rajkot, IT company near me, Web developer near me, Software developer near me, Video editor near me, Website designer near me";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgImage = `${baseUrl}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update or create property meta tags (for Open Graph)
    const updatePropertyTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('title', finalTitle);
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);

    // Update Open Graph tags
    updatePropertyTag('og:title', finalTitle);
    updatePropertyTag('og:description', finalDescription);
    updatePropertyTag('og:image', finalOgImage);
    updatePropertyTag('og:url', currentUrl);
    updatePropertyTag('og:type', ogType);

    // Update Twitter tags
    updatePropertyTag('twitter:title', finalTitle);
    updatePropertyTag('twitter:description', finalDescription);
    updatePropertyTag('twitter:image', finalOgImage);
    updatePropertyTag('twitter:url', currentUrl);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Update language
    document.documentElement.setAttribute('lang', 'en');

  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, currentUrl, ogType]);

  return null; // This component doesn't render anything
};

export default SEO;

