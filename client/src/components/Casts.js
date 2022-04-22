import { useFetch } from "../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CastHover from "./CastHover";
import PersonPlaceHolder from "../assets/person-placeholder.jpg";
export default function Casts({ type, movie }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/${type}/${movie}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 4,
    centerMode: false,
    vertical: false,

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

  if (!data) {
    return null;
  }
  return (
    <Wrapper>
      <Title>Casts</Title>
      <SliderS {...settings}>
        {data.cast.map((movie) => {
          if (!movie) {
            return null;
          }
          console.log(movie);
          return (
            <MovieCard key={movie.cast_id}>
              <LinkMovie
                to={`/browse/${movie.media_type ? movie.media_type : "movie"}/${
                  movie.id
                }`}
              >
                <MovieImg
                  src={
                    movie.profile_path
                      ? `${process.env.REACT_APP_BASE_IMG}${movie.profile_path}`
                      : PersonPlaceHolder
                  }
                  alt={movie.id}
                />
                <CastHover movie={movie} />
              </LinkMovie>
            </MovieCard>
          );
        })}
      </SliderS>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px auto -42px;
  padding: 0 40px;
  overflow: hidden;
`;

const Title = styled.h1`
  color: black;
  font-size: 34px;
  text-align: center;
`;

const MovieCard = styled.div`
  position: relative;
  cursor: pointer;
  filter: brightness(80%);

  &:hover {
    div {
      display: block;
      z-index: 50;
    }
    z-index: 20;
    width: auto !important ;
    transition: all 0.5s ease-in-out;
    transform: scale(1.1);
    filter: brightness(110%);
  }
`;
const MovieImg = styled.img`
  height: 350px;
  width: 250px;
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

const LinkMovie = styled(Link)`
  text-decoration: none;
  color: white;
`;
