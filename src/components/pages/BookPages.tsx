import { useGetBooksQuery } from "@/redux/api/booksCreateApi";

function BookPages() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  if (isLoading) {
    <p>Loading..............</p>;
  }
  console.log(data);
  return <div>Books Page</div>;
}

export default BookPages;
