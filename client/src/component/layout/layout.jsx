import AppNavbar from "./app-navbar.jsx";
import Footer from "./footer.jsx";

const Layout = (props) => {
    return (
        <div>
            <AppNavbar />
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;