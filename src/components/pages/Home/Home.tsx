import Hero from "../../layout/Hero";
import BookPages from "../BookPages/BookPages";

function Home() {
  return (
    <div>
      <Hero />

      {/* Featured Books Section */}
      <section className="mt-20 container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Featured Books</h2>
        <BookPages />
      </section>
    </div>
  );
}

export default Home;
