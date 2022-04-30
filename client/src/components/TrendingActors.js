import { useFetch } from "../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActorsCard from "./ActorsCard";
import styled from "styled-components";
export default function TrendingActors() {
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  if (!data) {
    return null;
  }
  const carouselSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 4,
    centerMode: false,
    vertical: false,

    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 848,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Wrapper>
      <Title>Trending Actors</Title>
      <SliderS {...carouselSettings}>
        {data.results.map((cast) => {
          if (!cast) {
            return null;
          }
          return <ActorsCard key={cast.id} cast={cast} />;
        })}
      </SliderS>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 40px auto;
  padding: 0 40px;
  overflow: hidden;
`;

const Title = styled.h1`
  color: black;
  font-size: 34px;
  text-align: center;
  @media (max-width: 1024px) {
    font-size: 24px;
  }
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
    position: relative !important;
    max-width: 81.5% !important;
    margin: 0 202rem;
  }
  .slick-slide {
    z-index: 1;
    margin: 20px 0 30px;
    position: relative;
  }
  .slick-list {
    overflow: visible;
    margin: 20px 0 30px;
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
