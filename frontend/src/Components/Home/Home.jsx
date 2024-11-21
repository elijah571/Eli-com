import Footer from "../Footer";
import Navbar from "../Navbar";

const Home = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}

      <Footer />
    </>
  );
};

export default Home;
