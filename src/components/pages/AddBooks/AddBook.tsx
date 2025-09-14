import AddForm from "./AddForm";

function AddBook() {
  return (
    <div className="w-[60%] mx-auto my-10 bg-amber-100 p-5">
      <h3 className="text-4xl font-bold text-center mb-5">ADD BOOK</h3>
      <AddForm />
    </div>
  );
}

export default AddBook;
