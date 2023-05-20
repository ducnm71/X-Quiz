import NavbarTop from "../components/NavbarTop";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
    return (
        <div className="container-default">
            <NavbarTop  />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;