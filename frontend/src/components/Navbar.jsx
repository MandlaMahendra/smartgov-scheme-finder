import { Link, useNavigate } from "react-router-dom";

function Navbar({ setAuth }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(false);
    navigate("/login");
  };

  return (
    <>
      {/* Top Bar - Government Style */}
      <div className="bg-gray-100 border-b text-xs py-1 px-4 md:px-12 flex justify-between text-gray-600">
        <div className="flex gap-4">
          <span>🇮🇳 Government of India</span>
          <span>Ministry of Electronics & IT</span>
        </div>
        <div className="flex gap-4">
          <span>Skip to Main Content</span>
          <span>Screen Reader Access</span>
          <span className="font-bold">A+ A A-</span>
        </div>
      </div>

      {/* Main Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">

            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="text-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="Emblem"
                  className="h-10 w-auto mx-auto"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold text-blue-900 leading-none">
                  SmartGov Scheme Finder
                </h1>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  National Portal for Government Schemes
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center font-medium text-gray-700">
              <Link to="/dashboard" className="hover:text-amber-600 transition">Home</Link>
              <Link to="/schemes" className="hover:text-amber-600 transition">Schemes</Link>
              <Link to="/eligibility" className="hover:text-amber-600 transition">Eligibility</Link>
              <Link to="/profile" className="hover:text-amber-600 transition">Profile</Link>
              <div className="flex items-center gap-4">
                <span className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
                  Welcome, {user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition shadow"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile Menu Button (Simple implementation) */}
            <div className="md:hidden">
              <button className="text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tricolor Strip */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
    </>
  );
}

export default Navbar;
