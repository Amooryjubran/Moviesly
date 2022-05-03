import { useFetch } from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import styled from "styled-components";
import { carouselSettings } from "../utils/SliderSettings";
export default function CastMovies({ cast }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/person/${cast}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!data) {
    return null;
  }
  return (
    <Wrapper>
      <Title>Also Appeared In</Title>
      <SliderS {...carouselSettings}>
        {data.cast.map((movie) => (
          <MovieCard movie={movie} key={movie.id} isLarge={false} />
        ))}
      </SliderS>
    </Wrapper>
  );
}
const Title = styled.h1`
  color: black;
  font-size: 34px;
  text-align: center;
`;
const Wrapper = styled.div`
  margin: 30px 0 -42px;
  padding: 0 40px;
  overflow: hidden;
  > div {
    position: relative;
    width: 100%;
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
    margin: -30px 0 0;
  }
  .slick-slide {
    z-index: 1;
    margin: 30px 0;
    position: relative;
  }
  .slick-slide img {
    width: 250px;
    height: 350px;
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
