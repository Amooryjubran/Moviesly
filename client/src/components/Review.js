import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";

import ReviewCard from "./ReviewCard";

export default function Review() {
  const { movie } = useParams();
  const { state } = useContext(UserContext);
  const { data: reviews } = useFetch("/api/reviews", state.reload);
  const { data: users } = useFetch("/api/users", state.reload);

  if (!reviews || !users) {
    return null;
  }
  const movieIDs = reviews.data.map(
    (movieId) => movieId.movieId === movie && movieId
  );
  return (
    <div>
      <h1>Reviews</h1>
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
