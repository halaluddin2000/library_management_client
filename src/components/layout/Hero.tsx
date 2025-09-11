import { motion } from "framer-motion";
import heroImg from "../../assets/hero-2.jpg";

function Hero() {
  return (
    <div className="relative w-full h-[90vh]">
      <img
        src={heroImg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Welcome to Our Library
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.6 }}
          className="text-lg md:text-2xl mb-8 max-w-2xl"
        >
          Discover thousands of books and manage your reading journey
          effortlessly.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.9 }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
        >
          Explore Books
        </motion.button>
      </div>
    </div>
  );
}

export default Hero;
