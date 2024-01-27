import Topbar from "../Topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <div className="layoutContainer">
        <Sidebar />
        <div className="contentArea">
        {children}</div>
        
       
      </div>
    </>
  );
};

export default Layout;
