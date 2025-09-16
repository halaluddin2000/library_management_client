import { motion } from "framer-motion";
import BlogImg from "../../../assets/blog.jpg";

function Blog() {
  return (
    <div className="relative my-10 w-full h-[90vh]">
      <img
        src={BlogImg}
        alt="Blog"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full  text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Inspire Daily Reading
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.6 }}
          className="text-lg items-start md:text-2xl mb-8 max-w-2xl"
        >
          Visit Our Blog and Page Find Out Daily Inspiration Quotes from the
          Best Authors.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.9 }}
          className="border-2 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-lg font-medium transition duration-300"
        >
          View Our Blog
        </motion.button>
      </div>
    </div>
  );
}

export default Blog;
