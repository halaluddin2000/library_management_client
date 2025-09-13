import { useGetBooksQuery } from "@/redux/api/booksCreateApi";
import { DataTable } from "./data-table";
import { columns } from "./columns";

function BookPages() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <p>Loading..............</p>;
  }

  console.log("API Response:", data);

  return (
    <div>
      <p>Books Page</p>
      <div>
        <DataTable columns={columns} data={data?.data || []} />
      </div>
    </div>
  );
}

export default BookPages;
