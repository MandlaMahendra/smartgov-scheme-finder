import { useState, useEffect } from "react";

function Sidebar({ filters, setFilters }) {
    const [localFilters, setLocalFilters] = useState(filters);

    // Debounce the filter updates to avoid too many API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters(localFilters);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [localFilters, setFilters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
            <h3 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">
                Filter Schemes
            </h3>

            <div className="space-y-4">
                {/* State */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                    <input
                        type="text"
                        name="state"
                        value={localFilters.state}
                        onChange={handleChange}
                        placeholder="e.g. Maharashtra"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                    <select
                        name="gender"
                        value={localFilters.gender}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Age */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={localFilters.age}
                        onChange={handleChange}
                        placeholder="e.g. 25"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Income */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Income (₹)</label>
                    <input
                        type="number"
                        name="income"
                        value={localFilters.income}
                        onChange={handleChange}
                        placeholder="e.g. 500000"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Occupation */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                    <input
                        type="text"
                        name="occupation"
                        value={localFilters.occupation}
                        onChange={handleChange}
                        placeholder="e.g. Farmer"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Sector / Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sector</label>
                    <input
                        type="text"
                        name="category"
                        value={localFilters.category}
                        onChange={handleChange}
                        placeholder="e.g. Education"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={() => setLocalFilters({
                        state: "",
                        gender: "All",
                        age: "",
                        income: "",
                        occupation: "",
                        category: ""
                    })}
                    className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition text-sm font-semibold"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
