import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import SignUp from "./pages/SignUp";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import ScrollToTop from "./helper/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:type/:movie" element={<Movie />} />
        <Route path="/:profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
