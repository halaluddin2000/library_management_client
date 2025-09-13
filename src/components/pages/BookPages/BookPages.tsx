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
    <div className="mt-10 w-[80%] mx-auto my-8">
      <h2 className="text-4xl font-bold my-8 text-center">
        Our Books Collection
      </h2>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}

export default BookPages;
