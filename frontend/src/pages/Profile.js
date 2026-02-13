import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added email to prevent uncontrolled input warning
    age: "",
    gender: "",
    state: "",
    occupation: "",
    profilePhoto: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const localUser = JSON.parse(localStorage.getItem("user"));

      // Fallback to local user if available, to show UI immediately
      if (localUser && !user) {
        setUser(localUser);
        setFormData({
          name: localUser.name || "",
          email: localUser.email || "",
          age: localUser.age || "",
          gender: localUser.gender || "",
          state: localUser.state || "",
          occupation: localUser.occupation || "",
          profilePhoto: localUser.profilePhoto || "",
          phoneNumber: localUser.phoneNumber || ""
        });
        setLoading(false);
      }

      if (!token) {
        // Stop loading but don't redirect automatically if the user just wants to see the page (per request)
        // However, if there is no local user either, we might need to show a "Please Login" state.
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://smartgov-scheme-finder.onrender.com/api/auth/profile", {
          headers: { "x-auth-token": token }
        });
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          state: res.data.state || "",
          occupation: res.data.occupation || "",
          profilePhoto: res.data.profilePhoto || "",
          phoneNumber: res.data.phoneNumber || ""
        });
      } catch (err) {
        console.error(err);
        // If API fails, we rely on local data or show error, but avoid auto-redirecting for now
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      // Use a large limit on server or handle appropriately. 
      // Here we send JSON with base64 image.
      const res = await axios.put("https://smartgov-scheme-finder.onrender.com/api/auth/profile", formData, {
        headers: { "x-auth-token": token }
      });
      setUser(res.data);
      setIsEditing(false);
      // Update local storage user name if changed
      const lsUser = JSON.parse(localStorage.getItem("user"));
      if (lsUser) {
        lsUser.name = res.data.name;
        localStorage.setItem("user", JSON.stringify(lsUser));
      }
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile. Image might be too large.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Profile...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please log in to view and edit your profile.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-blue-900 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full p-1 shadow-md relative group">
                {isEditing ? (
                  <div className="w-full h-full relative cursor-pointer">
                    <img
                      src={formData.profilePhoto || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white text-xs font-semibold">Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, profilePhoto: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  user?.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500 font-bold uppercase border-4 border-white">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="pt-20 pb-8 px-8 flex justify-between items-end">
            <div>
              {/* Name and Email in header */}
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold border border-green-200">
                Verified Citizen
              </span>
            </div>
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 hover:text-gray-800 font-semibold px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition shadow-sm"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition shadow-sm"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-semibold transition border border-red-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left Column: Personal Details */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Full Name", field: "name", type: "text", readOnly: true },
                  { label: "Email", field: "email", type: "text", readOnly: true },
                  { label: "Age", field: "age", type: "number" },
                  { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
                  { label: "State", field: "state", type: "text" },
                  { label: "Occupation", field: "occupation", type: "text" },
                  { label: "Phone", field: "phoneNumber", type: "tel" }
                ].map((item) => (
                  <div key={item.field}>
                    <label className="text-xs text-gray-400 uppercase font-semibold">{item.label}</label>
                    {isEditing ? (
                      item.type === "select" ? (
                        <select
                          className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-gray-700"
                          value={formData[item.field]}
                          onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}
                        >
                          <option value="">Select</option>
                          {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          type={item.type}
                          className={`w-full border-b border-gray-300 focus:outline-none py-1 text-gray-700 ${item.readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'focus:border-blue-500'}`}
                          value={formData[item.field]}
                          onChange={(e) => !item.readOnly && setFormData({ ...formData, [item.field]: e.target.value })}
                          placeholder={item.readOnly ? "" : `Enter ${item.label}`}
                          readOnly={item.readOnly}
                          disabled={item.readOnly}
                        />
                      )
                    ) : (
                      <p className="text-gray-700 font-medium">{user?.[item.field] || (item.field === 'email' ? user?.email : "--")}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard & Applications */}
          <div className="md:col-span-2 space-y-8">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-blue-900">0</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Applications</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-green-600">0</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Approved</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-orange-500">0</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Pending</div>
              </div>
            </div>

            {/* Application History (Mock) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Recent Applications</h3>
                <Link to="/schemes" className="text-sm text-blue-600 hover:underline">View All</Link>
              </div>

              <div className="p-12 text-center text-gray-400">
                <div className="text-4xl mb-3">📄</div>
                <p>No applications submitted yet.</p>
                <button
                  onClick={() => navigate("/schemes")}
                  className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Browse Schemes
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
