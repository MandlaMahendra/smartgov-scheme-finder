function SchemeCard({ scheme }) {

  const handleApply = () => {
    if (scheme.applyLink) {
      window.open(scheme.applyLink, "_blank");
    } else {
      alert("Official application link is not available at the moment.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">

      {/* Card Header (Optional: Image or Color Strip) */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {scheme.category || "General"}
          </span>
          {scheme.sector && (
            <span className="ml-2 text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded">
              {scheme.sector}
            </span>
          )}
        </div>
        {scheme.state && scheme.state !== "All" && (
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
            📍 {scheme.state}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {scheme.name}
        </h3>

        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {scheme.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Gender:</span>
            <span>{scheme.gender || "All"}</span>
          </div>
          {scheme.minAge > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Age:</span>
              <span>{scheme.minAge} - {scheme.maxAge} years</span>
            </div>
          )}
          {scheme.maxIncome < 99999999 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Income Limit:</span>
              <span>₹{scheme.maxIncome.toLocaleString()} / year</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-400">Status: Active</span>
        <button
          onClick={handleApply}
          className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded shadow-sm transition flex items-center gap-2"
        >
          Apply Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </button>
      </div>

    </div>
  );
}

export default SchemeCard;
