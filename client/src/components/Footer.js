import styled from "styled-components";

export default function Footer() {
  return (
    <Wrapper>
      <p>Developed and designed by @MoviesLify</p>
    </Wrapper>
  );
}
const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #343434;
  > p {
    color: white;
  }
`;
