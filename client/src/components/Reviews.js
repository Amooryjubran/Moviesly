import AddReview from "./AddReview";

export default function Reviews({ data }) {
  return (
    <div>
      <AddReview data={data} />
      <div>REviews</div>
    </div>
  );
}
