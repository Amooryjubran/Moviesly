import { Link } from "react-router-dom";
import styled from "styled-components";
import Wallpaper from "../assets/HeroImg.jpg";

export default function HeroBanner() {
  return (
    <>
      <HeroBanners
        style={{
          background:
            " linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),  url(" +
            Wallpaper +
            ")",
        }}
      >
        <HeroTextWrapper>
          <HeroText>
            <Title>
              Your <strong>Movies</strong> Guide
            </Title>

            <LinkHero to="/browse">
              <HeroBtn>Movies</HeroBtn>
            </LinkHero>
          </HeroText>
        </HeroTextWrapper>
      </HeroBanners>
    </>
  );
}
const HeroBanners = styled.div`
  min-height: 800px;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover !important;
  background-position: 8px -400px !important;
  display: flex;
  align-items: center;
  flex-direction: row;
  @media (max-width: 1024px) {
    min-height: 600px;
    background-position: 0 !important;
  }
`;
const HeroTextWrapper = styled.div`
  position: relative;
  width: 50%;
  padding: 3rem 0px;
  float: right;
  @media (max-width: 1024px) {
    width: auto;
    margin: 0 auto;
  }
`;
const HeroText = styled.div`
  position: relative;
  padding: 2.5rem;
  max-width: 60%;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  margin: 0px auto;
  font-family: "Roboto", sans-serif;
  animation-name: animation-from-bottom;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: (300ms);
  transform: translateY(5%);
  opacity: 0;
  @keyframes animation-from-bottom {
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;
const Title = styled.h1`
  font-size: clamp(2.5rem, 10vw, 4rem);
  color: whitesmoke;
  text-transform: uppercase;
  text-align: start;
  margin: 0;
  > strong {
    background: rgb(221, 183, 186);
    background: linear-gradient(
      90deg,
      rgba(221, 183, 186, 0.3) 8%,
      rgba(204, 119, 123, 0.6) 41%,
      rgba(219, 89, 89, 0.7) 83%
    );

    background-repeat: no-repeat;
    background-size: 100% 0.3em;
    background-position: 0 80%;
    transition: background-size 0.25s ease-in;
    padding: 0 0.2rem;
  }
  > strong:hover {
    background-size: 100% 88%;
  }
  @media (max-width: 1024px) {
    text-align: center;
    font-size: 30px;
  }
`;
const HeroBtn = styled.button`
  display: block;
  margin: 20px auto;
  background-color: #cc777b;
  border: none;
  color: #fff;
  letter-spacing: 0.061rem;
  height: 3.75rem;
  width: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
  padding: 10px 63px;

  @media (max-width: 1024px) {
    height: 2.5rem;
    display: flex;
    justify-content: center;
  }
`;
const LinkHero = styled(Link)`
  text-decoration: none;
  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;
