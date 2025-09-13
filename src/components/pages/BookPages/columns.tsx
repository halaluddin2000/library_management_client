import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span
        className="truncate block max-w-[200px]"
        title={row.original.description}
      >
        {row.original.description || "No description"}
      </span>
    ),
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-sm ${
          row.original.copies > 0
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {row.original.copies > 0 ? `${row.original.copies}` : "out of stock"}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      row.original.createdAt ? (
        <span>{format(new Date(row.original.createdAt), "dd MMM yyyy")}</span>
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) =>
      row.original.updatedAt ? (
        <span>{format(new Date(row.original.updatedAt), "dd MMM yyyy")}</span>
      ) : (
        "N/A"
      ),
  },
];
