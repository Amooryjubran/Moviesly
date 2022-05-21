import React from "react";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function TopMovies() {
  const urlLink =
    process.env.REACT_APP_BASE_URL +
    process.env.REACT_APP_TRENDING +
    process.env.REACT_APP_API_KEY +
    process.env.REACT_APP_TRENDING_KEY;

  const { data } = useFetch(urlLink);
  if (!data) {
    return null;
  }
  return (
    <Wrapper>
      <Title>Our Top Picks</Title>
      <Movies>
        {data.results.slice(0, 8).map((i) => {
          return (
            <Movie key={i.id}>
              <LinkMovie
                to={`/browse/${i.media_type ? i.media_type : "movie"}/${i.id}`}
              >
                <MovieImage
                  src={
                    i.backdrop_path
                      ? `${process.env.REACT_APP_BASE_IMG}${i.backdrop_path}`
                      : `${process.env.REACT_APP_BASE_IMG}${i.poster_path}`
                  }
                  loading="lazy"
                  alt={i.id}
                />
                <MovieTitle>{i.title ? i.title : i.name}</MovieTitle>
              </LinkMovie>
            </Movie>
          );
        })}
      </Movies>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 60px auto;
  padding: 0 100px;
  max-width: 80%;
  @media (max-width: 1024px) {
    padding: inherit;
  }
`;
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 40px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, auto);
  }
`;
const Movie = styled.div`
  margin: 0;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: bolder;
  margin: 30px 0;
  font-size: 28px;
  color: black;
  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;
const MovieImage = styled.img`
  border-radius: 10px;
  margin: 10px 0;
  object-fit: cover;
  height: auto;
  max-width: 100%;
`;
const MovieTitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  word-break: break-word;
`;
const LinkMovie = styled(Link)`
  text-decoration: none;
  color: black;
`;
