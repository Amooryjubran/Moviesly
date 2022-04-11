import styled from "styled-components";
import React from "react";
import { useFetch } from "../hooks/useFetch";

export default function MoviesBanner({ url, genre }) {
  const urlLink =
    process.env.REACT_APP_BASE_URL +
    url +
    process.env.REACT_APP_API_KEY +
    genre;
  const { data } = useFetch(urlLink);
  console.log(data);
  if (!data) {
    return null;
  }
  const randomMovie = Math.floor(Math.random() * data.results.length);
  const movie = data.results[randomMovie];
  return (
    <Banner
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <BannerContainer>
        <BannerTitle>
          {movie?.title || movie?.name || movie?.original_name}
        </BannerTitle>
        <BannerBTNS>
          <BannerBtn>Play</BannerBtn>
          <BannerBtn>My List</BannerBtn>
        </BannerBTNS>
        <BannerDescr>{movie.overview.substring(0, 100)}...</BannerDescr>
      </BannerContainer>
      <Fade />
    </Banner>
  );
}

const Banner = styled.header`
  background-size: cover;
  color: white;
  object-fit: contain;
  height: 600px;
`;
const BannerContainer = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
  display: flex;
  flex-direction: column;
`;
const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
`;

const BannerBTNS = styled.div``;
const BannerBtn = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

const BannerDescr = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 500px;
  height: 80px;
  font-size: 20px;
`;
const Fade = styled.div`
  height: 425px;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;
