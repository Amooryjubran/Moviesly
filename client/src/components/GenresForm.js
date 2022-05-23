import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function GenresForm({ settings, data, user, updateUser }) {
  const [likedGenre, setLikedGenre] = useState(null);
  return (
    <>
      <Title>What's your faviourite genres ?</Title>
      <Genres>
        <Sliders {...settings}>
          {data.genres.map((genre) => {
            const handleGenres = () => {
              if (!user.email) {
                return;
              }
              const genreId = genre.id;
              console.log(genreId);
              const findGenre = user.favoriteGenres.findIndex(
                (item) => item.id === genreId
              );
              const copy = user.favoriteGenres;
              if (findGenre === -1) {
                copy.push(genre);
              } else {
                copy.splice(findGenre, 1);
              }
              updateUser({ user: { ...user, favoriteGenres: copy } });
              setLikedGenre(copy);
              fetch(`${process.env.REACT_APP_SERVER_API}/api/genres`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  favoriteGenres: copy,
                  email: user.email,
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  // console.log(data);
                })
                .catch((error) => {
                  console.log("error", error);
                });
            };
            return (
              <Genre onClick={handleGenres} key={genre.id}>
                {genre.name}
              </Genre>
            );
          })}
        </Sliders>
        <LikedGenres>
          {likedGenre &&
            likedGenre.map((genres) => (
              <Genre key={genres.id}>{genres.name}</Genre>
            ))}
        </LikedGenres>
      </Genres>
    </>
  );
}

const LikedGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 20px;
  color: black;
  @media (max-width: 1024px) {
    text-align: center;
  }
`;
const Genres = styled.div`
  margin: 20px 0;
`;
const Genre = styled.span`
  font-size: 16px;
  border: 1px solid #8a8a8a;
  padding: 6px 12px;
  min-width: fit-content;
  border-radius: 15px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  margin: 0 6px;
  @media (max-width: 1024px) {
    border: 1px solid black;
    padding: 6px;
  }
`;
const Sliders = styled(Slider)`
  .slick .slick-slide {
    padding: 0 5px;
  }
  .slick-slide {
    margin: 0 5px;
  }

  .slick-list {
    margin: 0 -5px;
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
    top: -25px;
  }
  .slick-prev:before {
    display: none;
  }

  .slick-disabled {
    opacity: 0% !important;
  }
`;
