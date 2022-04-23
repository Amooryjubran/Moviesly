import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Cast() {
  const { cast } = useParams();
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/person/${cast}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!data) {
    return null;
  }
  return <div>Cast</div>;
}
