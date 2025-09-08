import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import AddBook from "../src/components/pages/AddBook";
import BookPages from "../src/components/pages/BookPages";
import BorrowSummaryPages from "../src/components/pages/BorrowSummaryPages";
import Footer from "./components/layout/Footer";

function App() {
  return (
    // src/App.tsx
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/books" element={<AddBook />} />
          <Route path="/create-book" element={<BookPages />} />
          <Route path="/borrow-summary" element={<BorrowSummaryPages />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
