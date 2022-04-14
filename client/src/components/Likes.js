import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";

export default function Likes({ setLikeBtn, likeBtn, i, user }) {
  return (
    <Wrapper>
      <LikeButton onClick={() => setLikeBtn(!likeBtn)}>
        <p>{i.likes[0]}</p>
      </LikeButton>
      {likeBtn &&
        i.likes.length > 1 &&
        i.likes.map((like, index) => {
          const currentUser = user.email;
          console.log(currentUser);

          return;
        })}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const LikeButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: gray;
  cursor: pointer;
`;
