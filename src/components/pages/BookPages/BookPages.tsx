import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/redux/api/booksCreateApi";

import { DataTable } from "./data-table";
import { createColumns, type Book } from "./columns";
import img from "../../../assets/all img.jpg";
import { useLocation } from "react-router-dom";
import { EditBookDialog } from "../UpdateBook/EditBookDialog";
import { BorrowDialog } from "../Borrows/BorrowFormOpen/BorrowDialog";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function BookPages() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const location = useLocation();

  const [borrowOpen, setBorrowOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (isLoading)
    return (
      <div className="flex mt-10 justify-center items-center">
        <PulseLoader color="#0b0a0a" margin={10} size={20} />
      </div>
    );

  // Borrow action
  const handleBorrow = (book: Book) => {
    if (book.copies === 0) return alert("Out of stock");
    setSelectedBook(book);
    setBorrowOpen(true);
  };

  // Edit action
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  // Delete action
  const handleDelete = async (book: Book) => {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      const toastId = toast.loading("Deleting book...");
      try {
        await deleteBook(book._id).unwrap();
        toast.update(toastId, {
          render: "Book deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (err) {
        const error = err as FetchBaseQueryError & {
          data?: { message?: string };
        };

        toast.update(toastId, {
          render: error?.data?.message || "Failed to delete book!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <section>
      {/* Banner Image */}
      {location.pathname === "/books" && (
        <img
          className="w-full h-[50vh] object-cover object-center"
          src={img}
          alt="Books Banner"
        />
      )}

      <div className="mt-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our Books Collection
        </h2>

        {/* Table for md+ */}
        <div className="hidden md:block overflow-x-auto">
          <DataTable
            columns={createColumns(handleEdit, handleDelete, handleBorrow)}
            data={data?.data || []}
          />
        </div>

        {/* Cards for mobile */}
        <div className="grid gap-4 md:hidden">
          {data?.data?.map((book: Book) => (
            <div
              key={book._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-1">Genre: {book.genre}</p>
              <p className="text-gray-600 mb-1">ISBN: {book.isbn}</p>
              <p className="text-gray-600 mb-2 truncate">
                {book.description || "No description"}
              </p>
              <p
                className={`px-2 py-1 rounded text-sm inline-block ${
                  book.copies > 0
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {book.copies > 0 ? `${book.copies} available` : "Out of stock"}
              </p>

              <div className="flex justify-end mt-2 space-x-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(book)}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={() => handleBorrow(book)}
                >
                  Borrow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      {selectedBook && (
        <EditBookDialog
          open={openDialog}
          setOpen={setOpenDialog}
          book={selectedBook}
        />
      )}

      {/* Borrow Dialog */}
      {selectedBook && (
        <BorrowDialog
          open={borrowOpen}
          setOpen={setBorrowOpen}
          book={selectedBook}
        />
      )}
    </section>
  );
}
