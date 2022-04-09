import { useParams } from "react-router-dom";

export default function Movie() {
  const { movie } = useParams();
  console.log(movie);
  return <div>{movie}</div>;
}
