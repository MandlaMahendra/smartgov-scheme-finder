import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: "",
    occupation: "",
    income: "",
    state: "",
  });

  const handleSearch = () => {
    // Construct query string
    const params = new URLSearchParams();
    if (form.age) params.append("age", form.age);
    if (form.occupation) params.append("occupation", form.occupation);
    if (form.income) params.append("income", form.income);
    if (form.state) params.append("state", form.state);

    navigate(`/schemes?${params.toString()}`);
  };

  const categories = [
    { name: "Agriculture", icon: "🌾" },
    { name: "Education", icon: "🎓" },
    { name: "Health", icon: "🏥" },
    { name: "Housing", icon: "🏠" },
    { name: "Business", icon: "💼" },
    { name: "Social Welfare", icon: "🤝" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.india.gov.in/sites/upload_files/npi/files/banner/azadi-ka-amrit-mahotsav-banner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            One Stop Digital Portal for <br /> <span className="text-amber-400">Government Schemes</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mb-12">
            Access 2000+ schemes across various sectors. Check eligibility, apply online, and track benefits easily.
          </p>

          {/* Main Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-2xl w-full max-w-4xl flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Search for schemes (e.g. Pension, Scholarship)"
              className="flex-grow px-6 py-4 rounded-full text-gray-800 focus:outline-none text-lg"
            />
            <button
              onClick={() => navigate('/schemes')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-lg w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search Panel */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">🔍</span>
            Find Schemes For You
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Age</label>
              <input
                type="number"
                placeholder="e.g. 25"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Profession</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                defaultValue=""
              >
                <option value="">Select Profession</option>
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Business">Business</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">State</label>
              <input
                type="text"
                placeholder="e.g. Delhi"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition"
              >
                Search Matches
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/schemes?category=${cat.name}`)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 cursor-pointer text-center group transition"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h4 className="font-semibold text-gray-700 group-hover:text-blue-600">{cat.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Info Strip */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-900 mb-2">2500+</div>
            <div className="text-gray-600">Total Schemes Available</div>
          </div>
          <div className="p-6 border-l border-r border-blue-200">
            <div className="text-4xl font-bold text-blue-900 mb-2">Central</div>
            <div className="text-gray-600">Ministries Participating</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
            <div className="text-gray-600">Free & Digital Access</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
