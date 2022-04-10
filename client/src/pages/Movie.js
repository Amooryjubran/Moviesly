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

  console.log(URL);

  const { data } = useFetch(URL);
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <>
      <MovieHeader data={data} />
      <Container>
        <Sidebar />
        <Reviews />
        <NewsBar />
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  > div {
    flex: 1;
    padding: 10px;
  }
  > div:nth-of-type(2) {
    flex: 2;
  }
  div:nth-of-type(odd) {
    background: #eee;
  }
`;
