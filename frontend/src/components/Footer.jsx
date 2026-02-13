import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-xl font-bold text-amber-500 mb-4">SmartGov Scheme Finder</h3>
                        <p className="text-gray-400 text-sm">
                            Your gateway to government schemes and benefits. We help citizens discover and apply for eligible schemes with ease and transparency.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/dashboard" className="hover:text-amber-500 transition">Home</Link></li>
                            <li><Link to="/schemes" className="hover:text-amber-500 transition">Browse Schemes</Link></li>
                            <li><Link to="/eligibility" className="hover:text-amber-500 transition">Check Eligibility</Link></li>
                            <li><Link to="/profile" className="hover:text-amber-500 transition">My Profile</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Admin Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Admin Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <span>📍</span>
                                <span>Ministry of Electronics & IT, New Delhi, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📧</span>
                                <a href="mailto:admin@smartgov.in" className="hover:text-amber-500">admin@smartgov.in</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📞</span>
                                <span>+91 11-24301337 (Helpline)</span>
                            </li>
                            <li className="mt-4 pt-4 border-t border-gray-800 text-xs">
                                <p>System Admin: <strong>SmartGov Administrator</strong></p>
                                <p>Version: 1.0.0 (Beta)</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Government of India. All Rights Reserved.</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <Link to="/" className="hover:text-white">Privacy Policy</Link>
                        <span>|</span>
                        <Link to="/" className="hover:text-white">Terms of Use</Link>
                        <span>|</span>
                        <Link to="/" className="hover:text-white">Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
