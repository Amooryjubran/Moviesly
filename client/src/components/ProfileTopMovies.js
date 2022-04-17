import React from "react";
import styled from "styled-components";

export default function ProfileTopMovies({ settings, user, Sliders }) {
  return (
    <>
      <Title>Top Movies</Title>
      <Movies>
        <Sliders {...settings}>
          {user.watched.map((top) => (
            <Image
              key={top.id}
              alt={top.title}
              src={`${process.env.REACT_APP_BASE_IMG}${top.backdrop_path}`}
            />
          ))}
        </Sliders>
      </Movies>
    </>
  );
}

const Title = styled.h1`
  font-size: 16px;
  color: black;
`;
const Movies = styled.div`
  margin: 20px 0 10px;
`;
const Image = styled.img`
  border-radius: 15px;
`;
