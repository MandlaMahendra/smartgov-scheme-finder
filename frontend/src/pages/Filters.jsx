import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Filters() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    income: "",
    occupation: "",
    state: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(form));
    navigate("/schemes");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl p-10 rounded-lg w-full max-w-2xl">

        <h2 className="text-3xl font-bold mb-6 text-blue-900">
          Check Your Eligibility
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <input
            type="number"
            placeholder="Age"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, age: Number(e.target.value) })
            }
          />

          <input
            type="number"
            placeholder="Annual Income"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, income: Number(e.target.value) })
            }
          />

          <input
            placeholder="Occupation"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, occupation: e.target.value })
            }
          />

          <input
            placeholder="State"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, state: e.target.value })
            }
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-900 text-white py-3 rounded hover:bg-blue-700"
          >
            Find Schemes
          </button>

        </form>
      </div>
    </div>
  );
}

export default Filters;
