import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

import ReviewCard from "./ReviewCard";

export default function Review() {
  const { movie } = useParams();
  const { data: reviews } = useFetch("/api/reviews");
  const { data: users } = useFetch("/api/users");
  if (!reviews || !users) {
    return null;
  }

  const movieIDs = reviews.data.map(
    (movieId) => movieId.movieId === movie && movieId
  );
  return (
    <div>
      <h1>Reviews</h1>
      {movieIDs.map((review, index) => {
        if (!review) {
          return null;
        }
        return users.data.map(
          (user) =>
            user.email &&
            user.email.includes(review.email) && (
              <ReviewCard key={index} i={review} user={user} />
            )
        );
      })}
    </div>
  );
}
