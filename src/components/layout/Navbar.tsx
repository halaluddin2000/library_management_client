import "./Navbar.css";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "All Books" },
    { path: "/add-book", label: "Add Book" },
    { path: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">📚 Library System</h1>
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`hover:text-yellow-400 transition ${
                location.pathname === link.path
                  ? "text-yellow-400 font-semibold"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
