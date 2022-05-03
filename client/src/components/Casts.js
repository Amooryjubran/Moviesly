import { useFetch } from "../hooks/useFetch";
import Slider from "react-slick";
import ActorsCard from "./ActorsCard";
import styled from "styled-components";
import { carouselSettings } from "../utils/SliderSettings";
export default function Casts({ type, movie }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/${type}/${movie}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!data) {
    return null;
  }
  return (
    <Wrapper>
      <Title>Casts</Title>
      <SliderS {...carouselSettings}>
        {data.cast.map((cast) => {
          if (!cast) {
            return null;
          }
          return <ActorsCard cast={cast} key={cast.credit_id} />;
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
