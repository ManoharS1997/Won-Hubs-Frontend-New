import ReactDOM from 'react-dom';

const PortalWrapper = ({ children }) => {
    const portalRoot = document.getElementById('alert__portal'); // Ensure this element exists in your HTML
    return ReactDOM.createPortal(children, portalRoot);
};

export default PortalWrapper;
