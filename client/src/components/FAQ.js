import styled from "@emotion/styled";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function FAQ() {
  const [faq, setFaq] = useState(false);
  const handleFaq = (index) => {
    if (faq === index) {
      return setFaq(null);
    }
    setFaq(index);
  };
  const Data = [
    {
      question: "Why would I use MoviesLify instead of Rotten Tomatoes ?",
      answer: "You tell me!",
    },
    {
      question: "Is this going to sell my data ?",
      answer: "Of course, how am I going to make some money ?",
    },
    {
      question: "Who funded this project ?",
      answer: "Elon Musk",
    },
  ];
  return (
    <Wrapper>
      <Title>FAQ</Title>
      {Data.map((i, index) => (
        <Container key={index}>
          <Parent>
            {faq === index ? (
              <CloseIcon onClick={() => handleFaq(index)} />
            ) : (
              <OpenIcon onClick={() => handleFaq(index)} />
            )}
            <Info>
              <Text>{i.question}</Text>
              {faq === index && <Answer>{i.answer}</Answer>}
            </Info>
          </Parent>
        </Container>
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 60px auto;
  padding: 0 100px;
  max-width: 80%;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: bolder;
  margin: 30px 0;
  font-size: 28px;
  color: black;
`;
const Container = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 20px 0;
  margin: 20px 0;
`;
const Parent = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const OpenIcon = styled(AddIcon)`
  cursor: pointer;
`;
const CloseIcon = styled(RemoveIcon)`
  cursor: pointer;
`;

const Text = styled.h1`
  font-size: 20px;
`;
const Answer = styled.p``;
