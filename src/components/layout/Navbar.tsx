import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Library System</h1>
        <ul className="flex gap-6">
          <li>
            <Link to="/books">All Books</Link>
          </li>
          <li>
            <Link to="/create-book">Add Book</Link>
          </li>
          <li>
            <Link to="/borrow-summary">Borrow Summary</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
