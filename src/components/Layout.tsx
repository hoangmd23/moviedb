import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <Header />
            <main style={{ backgroundColor: '#181818', padding: "1rem", flex: 1 }}>
                <Outlet/>
            </main>
            <Footer />
        </div>
    );

}

export default Layout;
