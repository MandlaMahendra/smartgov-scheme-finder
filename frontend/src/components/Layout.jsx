import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ setAuth }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - Passing setAuth for logout functionality */}
      <Navbar setAuth={setAuth} />

      {/* Page Content - Flex grow ensures footer stays at bottom */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
