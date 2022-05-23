import React from "react";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";
import ReviewCard from "./ReviewCard";

export default function ProfileLikes({ user }) {
  const { data } = useFetch(`${process.env.REACT_APP_SERVER_API}/api/reviews`);
  if (!data) {
    return null;
  }
  const movieReview = data.data.map(
    (x) =>
      x.likes &&
      x.likes.length > 0 &&
      x.likes.map((like) => like === user.email && x)
  );
  return (
    <Wrapper>
      {movieReview.map((review) => {
        return (
          review &&
          review.length > 0 &&
          review.map((likeReview, index) => {
            return <ReviewCard key={index} i={likeReview} user={user} />;
          })
        );
      })}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin: 0 auto;
  height: 100%;
`;
