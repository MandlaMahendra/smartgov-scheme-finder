import { useState } from "react";
import SchemeCard from "../components/SchemeCard";
import { motion } from "framer-motion";

function Eligibility() {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    occupation: "",
    state: "",
    gender: "All"
  });

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    // Validation
    if (!formData.age || !formData.income || !formData.occupation || !formData.state) {
      setError("Please fill in all fields to get accurate results.");
      return;
    }

    setError("");
    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("https://smartgov-scheme-finder.onrender.com/api/schemes/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setSchemes(data);
      } else {
        console.error("Failed to fetch matches");
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 font-sans">

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Check Your Eligibility
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered engine matches you with schemes you are strictly eligible for based on government criteria.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-blue-600"
        >
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p className="font-bold">Attention Needed</p>
              <p>{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age (Years) <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="e.g. 45"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income (₹) <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="e.g. 150000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={formData.income}
                onChange={e => setFormData({ ...formData, income: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="All">Any / All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation <span className="text-red-500">*</span></label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={formData.occupation}
                onChange={e => setFormData({ ...formData, occupation: e.target.value })}
              >
                <option value="">Select Occupation</option>
                <option value="Farmer">Farmer</option>
                <option value="Student">Student</option>
                <option value="Business">Business</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">State of Residence <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="e.g. Karnataka"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg transition transform hover:scale-[1.01] shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analysing Profile...
              </>
            ) : "Check Eligibility Now"}
          </button>
        </motion.div>

        {/* Results Section */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Start Applying
              <span className="text-sm font-normal text-white bg-green-600 px-3 py-1 rounded-full shadow-sm">{schemes.length} Matches Found</span>
            </h3>

            {schemes.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {schemes.map((scheme, index) => (
                  <motion.div
                    key={scheme._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative h-full"
                  >
                    <SchemeCard scheme={scheme} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="text-6xl mb-4">�</div>
                <h4 className="text-xl font-bold text-gray-700">No Eligible Schemes Found</h4>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Based on strict government criteria, no schemes currently match your profile.
                  However, new schemes are added regularly.
                </p>
                <button
                  onClick={() => setFormData({ age: "", income: "", occupation: "", state: "", gender: "All" })}
                  className="mt-6 text-blue-600 font-semibold hover:underline"
                >
                  Reset and try again
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default Eligibility;
