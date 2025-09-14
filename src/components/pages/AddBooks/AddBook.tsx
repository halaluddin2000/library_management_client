import AddForm from "./AddForm";
import addImg from "../../../assets/add img.jpg";

function AddBook() {
  return (
    <section>
      <img className="w-full h-[50vh] object-center" src={addImg} alt="" />
      <div className="w-[60%] mx-auto my-10 bg-gray-100 p-5">
        <h3 className="text-4xl font-bold text-center mb-5">ADD BOOK</h3>
        <AddForm />
      </div>
    </section>
  );
}

export default AddBook;
