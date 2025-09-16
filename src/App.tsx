import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home/Home";
import BookPages from "./components/pages/BookPages/BookPages";
import AddBook from "./components/pages/AddBooks/AddBook";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import BorrowSummary from "./components/pages/Borrows/BorrowSummaryPages/BorrowSummary";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookPages />} />
          <Route path="/create-book" element={<AddBook />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
