import { useFetch } from "../hooks/useFetch";

export default function Casts({ type, movie }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/${type}/${movie}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  console.log(data);
  return <div>Casts</div>;
}
