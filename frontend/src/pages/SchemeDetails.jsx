import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SchemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/schemes/${id}`)
      .then(res => res.json())
      .then(data => setScheme(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!scheme) {
    return (
      <div className="gov-container py-20 text-center">
        Loading scheme details...
      </div>
    );
  }

  return (
    <div className="gov-container py-12">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-700 hover:underline"
      >
        ← Back to Schemes
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">

        <img
          src={scheme.image}
          alt={scheme.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-8">

          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded text-sm">
            {scheme.category}
          </span>

          <h1 className="text-3xl font-bold mt-4 mb-4">
            {scheme.name}
          </h1>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {scheme.fullDescription || scheme.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <p><strong>Age:</strong> {scheme.minAge} - {scheme.maxAge}</p>
            <p><strong>Income:</strong> ₹{scheme.minIncome} - ₹{scheme.maxIncome}</p>
            <p><strong>Occupation:</strong> {scheme.occupation}</p>
            <p><strong>State:</strong> {scheme.state}</p>
          </div>

          <a
            href={scheme.applyLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Apply Officially
          </a>

        </div>
      </div>
    </div>
  );
}

export default SchemeDetails;
