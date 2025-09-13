import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link to="/" className="text-xl font-bold">
          Library System
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-400" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-400" : "hover:text-gray-300"
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-book"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-400" : "hover:text-gray-300"
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrow-summary"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-400" : "hover:text-gray-300"
              }
            >
              Borrow Summary
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
