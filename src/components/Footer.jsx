import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">SU</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white font-heading">Salary<span className="text-primary-light">Uncle</span></span>
                <p className="text-xs text-gray-500 leading-none">Smart Loans. Real Support.</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              India's most trusted salary loan partner. We help salaried professionals get instant loans with zero paperwork and same-day disbursement.
            </p>
            <div className="flex items-center gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'EMI Calculator', path: '/emi-calculator' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-primary">→</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5 text-base">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Salary Advance Loan',
                'Personal Loan',
                'Emergency Cash Loan',
                'Medical Loan',
                'Travel Loan',
                'Home Renovation Loan',
                'Education Loan',
                'Wedding Loan',
              ].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-primary">→</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5 text-base">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm text-gray-400">Level 3, Tower B, DLF Cyber City, Gurugram, Haryana 122002</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary flex-shrink-0" size={16} />
                <a href="tel:+918796041166" className="text-sm text-gray-400 hover:text-primary transition-colors">+91 87960 41166</a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary flex-shrink-0" size={16} />
                <a href="mailto:support@salaryuncle.com" className="text-sm text-gray-400 hover:text-primary transition-colors">support@salaryuncle.com</a>
              </li>
            </ul>

            {/* RBI Badge */}
            <div className="mt-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">RBI</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">RBI Registered NBFC</p>
                  <p className="text-gray-500 text-xs">License No: N-13.02345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SalaryUncle. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Grievance Redressal</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Fair Practice Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
