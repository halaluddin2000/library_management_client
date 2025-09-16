import { useGetBorrowSummaryQuery } from "@/redux/api/borrowsApi";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../BookPages/data-table";
import borrowImg from "../../../../assets/borrow-book.jpeg";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  console.log(data);

  const columns: ColumnDef<any>[] = [
    { accessorKey: "book.title", header: "Book Title" },
    { accessorKey: "book.isbn", header: "ISBN" },
    { accessorKey: "totalQuantity", header: "Quantity Borrowed" },
  ];

  if (isLoading) return <p>Loading borrow summary...</p>;

  return (
    <section>
      <img
        src={borrowImg}
        className="w-full h-[65vh] object-cover object-center"
        alt=""
      />
      <div className="w-[90%] mx-auto my-10">
        <h2 className="text-4xl font-bold text-center mb-8">Borrow Summary</h2>
        <DataTable columns={columns} data={data?.data || []} />
      </div>
    </section>
  );
}
