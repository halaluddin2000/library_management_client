import { useGetBooksQuery } from "@/redux/api/booksCreateApi";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import img from "../../../assets/all img.jpg";
import { useLocation } from "react-router-dom";

function BookPages() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const location = useLocation();

  if (isLoading) {
    return <p>Loading..............</p>;
  }

  console.log("API Response:", data);

  return (
    <section>
      {location.pathname === "/books" && (
        <img className="w-full h-[60vh] object-center" src={img} alt="" />
      )}
      <div className="mt-10 w-[90%] mx-auto my-8">
        <h2 className="text-4xl font-bold my-8 text-center">
          Our Books Collection
        </h2>
        <DataTable columns={columns} data={data?.data || []} />
      </div>
    </section>
  );
}

export default BookPages;
