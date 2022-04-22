import React from "react";
import styled from "styled-components";

export default function NewsBar({ data }) {
  return (
    <Wrapper>
      <p>Production Companies :</p>
      {data.production_companies.map((company) => (
        <div key={company.id}>
          <img
            style={{ width: "240px" }}
            src={
              company.logo_path &&
              `${process.env.REACT_APP_BASE_IMG}${company.logo_path}`
            }
            alt=""
          />
        </div>
      ))}
      {data.belongs_to_collection && (
        <div>
          <p>Belongs to :</p>
          <p>{data.belongs_to_collection.name}</p>
          <img
            style={{ width: "240px" }}
            src={`${process.env.REACT_APP_BASE_IMG}${data.belongs_to_collection.backdrop_path}`}
            alt=""
          />
        </div>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
