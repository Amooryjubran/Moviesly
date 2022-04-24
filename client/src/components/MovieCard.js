import { Link } from "react-router-dom";
import styled from "styled-components";
import MovieHover from "./MovieHover";

export default function MovieCard({ movie, isLarge }) {
  return (
    <Wrapper key={movie.id} state={isLarge}>
      <LinkMovie
        to={`/browse/${movie.media_type ? movie.media_type : "movie"}/${
          movie.id
        }`}
      >
        <MovieImg
          state={isLarge}
          src={
            movie.backdrop_path
              ? `${process.env.REACT_APP_BASE_IMG}${movie.backdrop_path}`
              : `${process.env.REACT_APP_BASE_IMG}${movie.poster_path}`
          }
          alt={movie.id}
        />
        <MovieHover movie={movie} isLarge={isLarge} />
      </LinkMovie>
    </Wrapper>
  );
}
const MovieImg = styled.img`
  height: ${(props) => (props.state ? "250px" : "100px")};
  width: ${(props) => (props.state ? "170px" : "177px")};
  object-fit: cover;
  border-radius: 5px;
`;
const LinkMovie = styled(Link)`
  text-decoration: none;
  color: white;
`;
const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  filter: brightness(80%);

  &:hover {
    div {
      display: block;
      z-index: 50;
    }
    z-index: 20;
    width: fit-content;
    transition: all 0.5s ease-in-out;
    transform: ${(props) => (props.state ? "scale(1.3)" : "scale(1.1)")};
    filter: brightness(110%);
  }
`;
