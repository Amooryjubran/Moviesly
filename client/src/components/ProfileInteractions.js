import React from "react";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import ReviewCard from "./ReviewCard";

export default function ProfileInteractions({ user }) {
  const { data } = useFetch("/api/reviews");
  if (!data) {
    return null;
  }
  const movieReview = data.data.map((x) => x.email === user.email && x);

  return (
    <Wrapper>
      {movieReview.map((review, index) => (
        <ReviewCard key={index} i={review} user={user} />
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin: 0 auto;
  height: 100%;
`;
