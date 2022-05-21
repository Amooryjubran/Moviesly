import React from "react";
import styled from "styled-components";

export default function ProfileToWatch({ user, Sliders, settings }) {
  return (
    <>
      <Title>Movies To Watch</Title>
      <Movies>
        <Sliders {...settings}>
          {user.watchLater.map((watchLater) => (
            <Image
              key={watchLater.id}
              alt={watchLater.title}
              src={`${process.env.REACT_APP_BASE_IMG}${watchLater.backdrop_path}`}
              loading="lazy"
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
