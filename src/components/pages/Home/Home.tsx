import Hero from "../../layout/Hero";
import BookPages from "../BookPages/BookPages";

function Home() {
  return (
    <div>
      <Hero />

      {/* Featured Books Section */}
      <section className="mt-20 mx-auto">
        <BookPages />
      </section>
    </div>
  );
}

export default Home;
