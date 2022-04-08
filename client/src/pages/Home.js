import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const {
    state: { user },
  } = useContext(UserContext);
  console.log(user);

  return <div>Home</div>;
}
