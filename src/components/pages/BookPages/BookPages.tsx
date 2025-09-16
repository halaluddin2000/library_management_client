import { useState } from "react";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/redux/api/booksCreateApi";
import { DataTable } from "./data-table";
import { createColumns } from "./columns";
import { EditBookDialog } from "../UpdateBook/EditBookDialog";
import { toast } from "react-toastify";
import img from "../../../assets/all img.jpg";
import { useLocation } from "react-router-dom";

function BookPages() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  if (isLoading) return <p>Loading books...</p>;

  // Edit action
  const handleEdit = (book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  // Delete action
  const handleDelete = async (book) => {
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
      } catch (error) {
        toast.update(toastId, {
          render: "Failed to delete book!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <section>
      {/* Banner only on /books route */}
      {location.pathname === "/books" && (
        <img
          className="w-full h-[50vh] object-cover object-center"
          src={img}
          alt="Books Banner"
        />
      )}

      <div className="mt-10 w-[90%] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our Books Collection
        </h2>

        <DataTable
          columns={createColumns(handleEdit, handleDelete)}
          data={data?.data || []}
        />
      </div>

      {/* Edit Dialog */}
      {selectedBook && (
        <EditBookDialog
          open={openDialog}
          setOpen={setOpenDialog}
          book={selectedBook}
        />
      )}
    </section>
  );
}

export default BookPages;
