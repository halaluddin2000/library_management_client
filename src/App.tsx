import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home/Home";
import BookPages from "./components/pages/BookPages/BookPages";
import AddBook from "./components/pages/AddBooks/AddBook";
import BorrowSummaryPages from "./components/pages/BorrowSummaryPages/BorrowSummaryPages";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookPages />} />
          <Route path="/create-book" element={<AddBook />} />
          <Route path="/borrow-summary" element={<BorrowSummaryPages />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
