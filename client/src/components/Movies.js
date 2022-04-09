import styled from "@emotion/styled";
import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieHover from "./MovieHover";
import { Link } from "react-router-dom";
export default function Movies({ title, url, genre }) {
  const urlLink =
    process.env.REACT_APP_BASE_URL +
    url +
    process.env.REACT_APP_API_KEY +
    genre;

  const { data } = useFetch(urlLink);

  if (!data) {
    return null;
  }
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <SliderS {...settings}>
        {data.results.map((movie) => {
          if (!movie) {
            return null;
          }
          return (
            <MovieCard key={movie.id}>
              <LinkMovie to={`/browse/${movie.id}`}>
                <MovieImg
                  src={
                    movie.backdrop_path &&
                    `${process.env.REACT_APP_BASE_IMG}${movie.backdrop_path}`
                  }
                  alt={movie.id}
                />
                <MovieHover movie={movie} />
              </LinkMovie>
            </MovieCard>
          );
        })}
      </SliderS>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px 0;
  padding: 0 40px;
`;

const Title = styled.h1`
  font-weight: 400;
  color: white;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  /* overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px; */
`;
const MovieCard = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    div {
      display: block;
      z-index: 50;
    }
    z-index: 20;
    width: auto !important ;
    transition: all 0.3s ease-in-out;
    transform: scale(1.5);
  }
`;
const MovieImg = styled.img`
  height: 150px;
  width: 250px;
  border-radius: 5px;
`;
const SliderS = styled(Slider)`
  position: relative;
  max-width: 100vw;
  width: 100%;
  .slick-slide {
    /* margin: 100px 0; */
    z-index: 1;
  }
  .slick-list {
    /* margin: -100px 0; */
    overflow: visible;
  }
`;

const LinkMovie = styled(Link)`
  text-decoration: none;
  color: white;
`;
