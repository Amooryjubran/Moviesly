import React from "react";
import styled from "styled-components";

export default function NewsBar({ data }) {
  if (!data) {
    return null;
  }
  return (
    <Wrapper>
      <Title>Production Companies :</Title>
      {data.production_companies &&
        data.production_companies.map((company) => (
          <div key={company.id}>
            <Img
              src={
                company.logo_path &&
                `${process.env.REACT_APP_BASE_IMG}${company.logo_path}`
              }
              loading="lazy"
              alt=""
            />
          </div>
        ))}
      {data.belongs_to_collection && (
        <div>
          <p>Belongs to :</p>
          <p>{data.belongs_to_collection.name}</p>
          <Img
            src={`${process.env.REACT_APP_BASE_IMG}${data.belongs_to_collection.backdrop_path}`}
            alt=""
            loading="lazy"
          />
        </div>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
const Img = styled.img`
  width: 240px;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 5px 0;
  }
`;
const Title = styled.h1`
  @media (max-width: 1024px) {
    text-align: center;
    font-size: 18px;
    margin: 0 0 20px;
  }
`;
