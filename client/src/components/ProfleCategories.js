import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { miniSliderSetting as settings } from "../utils/SliderSettings";

export default function ProfleCategories({ user }) {
  return (
    <Wrapper>
      <Title>Top Genres</Title>
      <Genres>
        <Sliders {...settings}>
          {user.favoriteGenres.map((category) => (
            <Genre key={category.id}>{category.name}</Genre>
          ))}
        </Sliders>
      </Genres>
      <Seperator />
      <Btn>Follow</Btn>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin: 0 auto;
  max-width: 30%;
  height: 200px;
  @media (max-width: 1024px) {
    width: 90%;
    max-width: 100%;
  }
`;
const Genres = styled.div`
  margin: 20px 0;
`;
const Title = styled.h1`
  font-size: 16px;
  color: black;
`;
const Sliders = styled(Slider)`
  .slick-slide {
    padding: 0 5px;
  }

  .slick-next:before {
    position: absolute;
    content: "";
    width: 7px;
    height: 7px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    transform: rotate(45deg);
    left: -2px;
    top: 5px;
  }
  .slick-prev:before {
    display: none;
  }

  .slick-disabled {
    opacity: 0% !important;
  }
`;
const Genre = styled.span`
  font-size: 12px;
  border: 1px solid #8a8a8a;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
`;
const Seperator = styled.hr`
  height: 1px;
  background-color: lightgray;
  border: none;
`;
const Btn = styled.button`
  display: block;
  margin: 30px auto;
  background-color: #cc777b;
  border: none;
  color: #fff;
  letter-spacing: 0.061rem;
  height: 40px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  width: 80%;
`;
