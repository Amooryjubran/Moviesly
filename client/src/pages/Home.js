import { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
}
