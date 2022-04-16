import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function GenresForm({ settings, data, user, updateUser }) {
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
              const findGenre = user.favoriteGenres.findIndex(
                (item) => item.id === genreId
              );
              console.log(findGenre);
              const copy = user.favoriteGenres;
              if (findGenre === -1) {
                copy.push(genre);
              } else {
                copy.splice(findGenre, 1);
              }
              updateUser({ user: { ...user, favoriteGenres: copy } });
              console.log(copy);
              fetch(`/api/genres`, {
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
                  console.log(data);
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
      </Genres>
    </>
  );
}

const Title = styled.h1`
  font-size: 20px;
  color: black;
`;
const Genres = styled.div`
  margin: 20px 0;
`;
const Genre = styled.span`
  font-size: 16px;
  border: 1px solid #8a8a8a;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
`;
const Sliders = styled(Slider)`
  .slick-slide {
    padding: 0 5px;
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
    top: -5px;
  }

  .slick-disabled {
    opacity: 0% !important;
  }
`;
