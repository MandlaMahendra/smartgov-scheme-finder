import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Welcome Banner */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome, {user?.name || "Citizen"}
          </h1>
          <p className="text-blue-100 text-lg">
            Your personalized dashboard for Government Schemes & Services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">

        {/* About / Web Description Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10 border-t-4 border-amber-500">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About SmartGov Scheme Finder</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The <strong>SmartGov Scheme Finder</strong> is a "One Nation, One Portal" initiative designed to bridge the gap between citizens and government welfare.
                Our platform aggregates thousands of schemes from Central and State Ministries, providing a single window for discovery and application.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With our advanced <strong>AI Eligibility Engine</strong>, you no longer need to browse endlessly.
                Simply update your profile or use our eligibility checker to find schemes custom-tailored to your age, income, and profession.
              </p>
            </div>
            <div className="md:w-1/3 bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
              <div className="text-4xl font-bold text-blue-900 mb-1">10+</div>
              <div className="text-sm text-gray-500 font-semibold uppercase tracking-wide mb-4">Ministries Onboarded</div>

              <div className="text-4xl font-bold text-green-700 mb-1">20+</div>
              <div className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Live Schemes</div>
            </div>
          </div>
        </div>

        {/* Features / Quick Actions Grid */}
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-900 pl-3">
          Portal Features & Services
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4">
              🔍
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Scheme Search</h4>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Search through our comprehensive database using keywords, categories, or states to find exactly what you need.
            </p>
            <Link to="/schemes" className="text-blue-700 font-semibold hover:underline">
              Browse Schemes &rarr;
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4">
              ✅
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Check Eligibility</h4>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Answer a few simple questions about your age, income, and occupation to get a curated list of eligible schemes.
            </p>
            <Link to="/eligibility" className="text-blue-700 font-semibold hover:underline">
              Check Now &rarr;
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4">
              📑
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Direct Application</h4>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              No middlemen. Get redirected seamlessly to the official government application forms for instant processing.
            </p>
            <span className="text-gray-400 text-sm italic">
              Available on Scheme Cards
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
