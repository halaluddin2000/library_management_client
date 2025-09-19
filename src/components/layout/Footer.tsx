import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-14 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          {/* About / Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Library System
            </h2>
            <p className="text-gray-400 max-w-xs">
              Manage your library efficiently with our easy-to-use platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-start items-center">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-gray-400">
              <li>
                <a href="/books" className="hover:text-white">
                  Books
                </a>
              </li>
              <li>
                <a href="/create-book" className="hover:text-white">
                  Add Book
                </a>
              </li>
              <li>
                <a href="/borrow-summary" className="hover:text-white">
                  Borrow Summary
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Library System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
