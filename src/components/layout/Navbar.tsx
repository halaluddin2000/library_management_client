import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/books", label: "All Books" },
    { to: "/create-book", label: "Add Book" },
    { to: "/borrow-summary", label: "Borrow Summary" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md p-3 relative">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Library System
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-blue-400"
                    : "hover:text-gray-300"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-[50px] left-0 w-full bg-gray-900 text-white flex flex-col gap-4 p-6 shadow-lg z-50"
          >
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-blue-400"
                      : "hover:text-gray-300"
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
