import styled from "styled-components";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ProfileToWatch from "./ProfileToWatch";
import ProfileTopMovies from "./ProfileTopMovies";
import { formSliderSetting as settings } from "../utils/SliderSettings";

export default function ProfileWatch({ user }) {
  return (
    <Wrapper>
      <ProfileToWatch user={user} Sliders={Sliders} settings={settings} />
      <ProfileTopMovies user={user} Sliders={Sliders} settings={settings} />
      <Seperator />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin: 0 auto;
  max-width: 25%;
  height: 100%;
  @media (max-width: 1024px) {
    max-width: 100%;
    width: 90%;
  }
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
const LinkMovie = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Seperator = styled.hr`
  height: 1px;
  background-color: lightgray;
  border: none;
`;
