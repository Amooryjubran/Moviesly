import styled from "styled-components";
import AddReview from "./AddReview";
import Review from "./Review";
export default function Reviews() {
  return (
    <Wrapper>
      <AddReview />
      <Review />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
