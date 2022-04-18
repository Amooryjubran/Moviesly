import { useState } from "react";
import styled from "styled-components";
import Wallpaper from "../assets/newsLetter.jpg";

export default function NewsLetter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleInput = (e) => {
    e.preventDefault();
    if (input.length < 1) {
      return setError(true);
    }
    fetch(`/api/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          return [setError(false), setSuccess(true)];
        } else if (data.status === 400) {
          return setError(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <Wrapper
      style={{
        background:
          " linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),  url(" +
          Wallpaper +
          ")",
      }}
    >
      <Container>
        {success ? (
          <>
            <Title>Thank you</Title>
            <Seperator />
          </>
        ) : (
          <>
            <Title>Subscribe</Title>
            <Text>Get updated with the latest movies</Text>
            <Form>
              <Input
                type="text"
                placeholder="Elon@musk.com"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {error ? <Error>Please add your email</Error> : <Seperator />}

              <Button onClick={handleInput}>Subscribe</Button>
            </Form>
          </>
        )}
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  min-height: 300px;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover !important;
  background-position: 0 -400px !important;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const Container = styled.div`
  max-width: 500px;
  margin: 80px;
  padding: 60px;
  background: hsla(0, 0%, 100%, 0.55);
`;
const Title = styled.h1`
  font-size: 24px;
`;
const Text = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;
const Error = styled.h1`
  margin: 5px 0;
  font-size: 16px;
  font-weight: bolder;
  color: red;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  border-radius: 20px;
  border: none;
  padding: 5px;
  text-indent: 14px;
  margin: 10px 0;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  display: block;
  margin: 5px auto;
  background-color: #cc777b;
  border: none;
  color: #fff;
  height: 40px;
  width: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 25px;
`;
const Seperator = styled.hr`
  margin: 0 auto;
  height: 1px;
  width: 150px;
  background-color: lightgray;
  border: none;
  opacity: 0.7;
`;
