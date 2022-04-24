import styled from "@emotion/styled";
import React from "react";
import { useFetch } from "../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
export default function Movies({ title, url, genre, isLarge, movie }) {
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
          return <MovieCard isLarge={isLarge} movie={movie} />;
        })}
      </SliderS>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px 0 -42px;
  padding: 0 40px;
  overflow: hidden;
`;

const Title = styled.h1`
  font-weight: 400;
  color: white;
  font-size: 22px;
  padding: 0 0 5px 0;
  margin-bottom: -40px;
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
  .slick-slider {
    margin: -30px 0 0;
  }
  .slick-slide {
    z-index: 1;
    margin: 30px 0;
    position: relative;
  }
  .slick-list {
    overflow: visible;
    margin: 30px 0;
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
