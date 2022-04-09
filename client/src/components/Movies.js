import styled from "@emotion/styled";
import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieHover from "./MovieHover";
import { Link } from "react-router-dom";
export default function Movies({ title, url, genre, isLarge }) {
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
    arrows: true,
    infinite: false,
    slidesToShow: 9,
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
                  state={isLarge}
                  src={
                    movie.backdrop_path &&
                    `${process.env.REACT_APP_BASE_IMG}${movie.backdrop_path}`
                  }
                  alt={movie.id}
                />
                <MovieHover movie={movie} isLarge={isLarge} />
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
  font-size: 22px;
  padding: 0 0 5px 0;
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
  height: ${(props) => (props.state ? "250px" : "100px")};
  width: ${(props) => (props.state ? "170px" : "177px")};
  object-fit: cover;
  border-radius: 5px;
`;
const SliderS = styled(Slider)`
  .slick-arrow {
    display: none !important;
  }
  &:hover {
    .slick-arrow {
      display: block !important;
    }
  }
  .slick-slide {
    z-index: 1;
  }
  .slick-list {
    overflow: visible;
  }
  .slick-next:before,
  .slick-prev:before {
    font-size: 45px;
  }
  .slick-prev:before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    transform: rotate(225deg);
    left: 10px;
    top: ${(props) => (props.state ? "-13px" : "8px")};
  }
  .slick-next:before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    transform: rotate(45deg);
    left: 6px;
    top: ${(props) => (props.state ? "-13px" : "8px")};
  }
  .slick-prev {
    z-index: 43242342342;
  }
  .slick-next {
    right: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 15px;
    border-radius: 50%;
  }
  .slick-prev {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 15px;
    border-radius: 50%;
  }
  .slick-disabled {
    opacity: 0% !important;
  }
`;

const LinkMovie = styled(Link)`
  text-decoration: none;
  color: white;
`;
