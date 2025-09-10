import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import AddBook from "./components/pages/AddBook";
import BookPages from "./components/pages/BookPages";
import BorrowSummaryPages from "./components/pages/BorrowSummaryPages";
import Footer from "./components/layout/Footer";
import Hero from "./components/layout/Hero";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
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
