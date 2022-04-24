import { useFetch } from "../hooks/useFetch";

export default function CastMovies({ cast }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/person/${cast}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  console.log(data.cast);
  if (!data) {
    return null;
  }
  return <div>CastMovies</div>;
}
