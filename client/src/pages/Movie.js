import { useParams } from "react-router-dom";
import MovieHeader from "../components/MovieHeader";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import NewsBar from "../components/NewsBar";
import Reviews from "../components/Reviews";

export default function Movie() {
  const { movie } = useParams();

  const API_KEY = "?api_key=";
  const URL =
    process.env.REACT_APP_BASE_URL +
    process.env.REACT_APP_MOVIE_ID +
    movie +
    API_KEY +
    process.env.REACT_APP_API_KEY;

  const { data } = useFetch(URL);
  if (!data) {
    return null;
  }
  return (
    <>
      <MovieHeader data={data} movie={movie} />
      <Container>
        <Sidebar data={data} />
        <Reviews />
        <NewsBar data={data} />
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  max-width: 70%;
  margin: 40px auto;
  gap: 20px;
  > div {
    flex: 1;
    padding: 20px;
  }
  > div:nth-of-type(2) {
    flex: 2;
  }
  div:nth-of-type(odd) {
    /* height: 50%;
    position: sticky;
    top: 0; */
  }
`;
