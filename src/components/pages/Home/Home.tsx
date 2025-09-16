import Hero from "../../layout/Hero";
import Blog from "../Blog/Blog ";
import BookPages from "../BookPages/BookPages";

function Home() {
  return (
    <div>
      <Hero />

      {/* Featured Books Section */}
      <section className="mt-20 mx-auto mb-8">
        <BookPages />
      </section>
      <Blog />
    </div>
  );
}

export default Home;
