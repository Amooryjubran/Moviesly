import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";

import ReviewCard from "./ReviewCard";

export default function Review() {
  const { movie } = useParams();
  const { state } = useContext(UserContext);
  const { data: reviews } = useFetch(
    `${process.env.REACT_APP_SERVER_API}/api/reviews`,
    state.reload
  );
  const { data: users } = useFetch(
    `${process.env.REACT_APP_SERVER_API}/api/users`,
    state.reload
  );

  if (!reviews || !users) {
    return null;
  }
  const movieIDs = reviews.data.map(
    (movieId) => movieId.movieId === movie && movieId
  );
  return (
    <div>
      <Title>Reviews</Title>
      {movieIDs.map((review) => {
        if (!review) {
          return null;
        }
        return users.data.map(
          (user, index) =>
            user.email &&
            user.email.includes(review.email) && (
              <ReviewCard key={index} i={review} user={user} />
            )
        );
      })}
    </div>
  );
}
const Title = styled.h1`
  @media (max-width: 1024px) {
    text-align: center;
    font-size: 24px;
  }
`;
