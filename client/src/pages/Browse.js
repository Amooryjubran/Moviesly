import styled from "@emotion/styled";
import React from "react";
import Movies from "../components/Movies";
import BackIMG from "../assets/BrowseBG.jpeg";
import MoviesBanner from "../components/MoviesBanner";

export default function Browse() {
  return (
    <Wrapper>
      <MoviesBanner
        url={process.env.REACT_APP_GENRE}
        genre={process.env.REACT_APP_NETFLIX}
      />
      <Movies
        title="Trending"
        url={process.env.REACT_APP_TRENDING}
        genre={process.env.REACT_APP_TRENDING_KEY}
      />
      <Movies
        title="Top Rated"
        url={process.env.REACT_APP_TOP_RATED}
        genre={process.env.REACT_APP_TOP_GENRE}
      />
      <Movies
        title="Netflix Originals"
        url={process.env.REACT_APP_GENRE}
        genre={process.env.REACT_APP_NETFLIX}
      />
      <Movies
        title="Action"
        url={process.env.REACT_APP_TYPE}
        genre={process.env.REACT_APP_ACTION}
      />
      <Movies
        title="Comedy"
        url={process.env.REACT_APP_GENRE}
        genre={process.env.REACT_APP_COMEDY}
      />
      <Movies
        title="Horror"
        url={process.env.REACT_APP_TYPE}
        genre={process.env.REACT_APP_HORROR}
      />
      <Movies
        title="Romance"
        url={process.env.REACT_APP_GENRE}
        genre={process.env.REACT_APP_ROMANCE}
      />
      <Movies
        title="Documentary"
        url={process.env.REACT_APP_GENRE}
        genre={process.env.REACT_APP_DOCU}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-image: url(${BackIMG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
