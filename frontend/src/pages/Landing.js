import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 text-white flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-5xl font-bold mb-6">
        🇮🇳 Smart Government Scheme Portal
      </h1>

      <p className="max-w-2xl text-lg mb-10 opacity-80">
        Discover, compare, and apply for government schemes tailored to your age,
        occupation, income, and state. Secure. Transparent. Digital.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Landing;
