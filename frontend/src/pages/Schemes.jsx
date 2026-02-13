import { useEffect, useState } from "react";
import SchemeCard from "../components/SchemeCard";
import axios from "axios";
import { motion } from "framer-motion";

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://smartgov-scheme-finder.onrender.com/api/schemes");
        setSchemes(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load schemes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Header Section */}
      <div className="bg-white shadow-sm border-b py-8 px-4 md:px-12 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              All Government Schemes
            </h1>
            <p className="text-gray-500 mt-2">
              Complete list of all verified schemes from Central and State Ministries.
            </p>
          </div>
          <div className="text-sm font-semibold text-blue-800 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            {schemes.length} Schemes Available
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Loading All Schemes...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2">Error Loading Data</h3>
            <p>{error}</p>
          </div>
        ) : schemes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-800">No schemes found.</h3>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {schemes.map((scheme) => (
              <motion.div
                key={scheme._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <SchemeCard scheme={scheme} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Schemes;
