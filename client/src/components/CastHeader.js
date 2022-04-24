import { useState } from "react";
import styled from "styled-components";
import PersonPlaceHolder from "../assets/person-placeholder.jpg";

export default function CastHeader({ data }) {
  const [show, setShow] = useState(false);
  console.log(data.biography.length);
  return (
    <Wrapper>
      <CastImg
        src={
          data.profile_path
            ? `${process.env.REACT_APP_BASE_IMG}${data.profile_path}`
            : PersonPlaceHolder
        }
        alt={data.id}
      />
      <Container>
        <Title>{data.name}</Title>
        <NameLanguages>
          {data.also_known_as.length > 0 && (
            <>
              <h3>Also Knows as:</h3>
              <KnowWrapper>
                {data.also_known_as.map((known, index) => (
                  <Known key={index}>{known}</Known>
                ))}
              </KnowWrapper>
            </>
          )}
        </NameLanguages>
        {data.birthday && (
          <Bithday>
            <h3>Birthday:</h3> {data.birthday}
          </Bithday>
        )}
        <Job>{data.known_for_department}</Job>

        <p>
          {!show ? `${data.biography.substring(0, 700)}` : data.biography}
          {data.biography.length > 700 && (
            <>
              ...
              <ReadMore onClick={() => setShow(!show)}>
                Read {!show ? "More" : "Less"}
              </ReadMore>
            </>
          )}
        </p>
      </Container>
    </Wrapper>
  );
}
const Title = styled.h1`
  color: black;
  font-size: 34px;
  margin: 0 0 20px;
`;
const KnowWrapper = styled.div`
  margin: 20px 0;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
`;
const Bithday = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CastImg = styled.img`
  height: 350px;
  width: 250px;
  object-fit: cover;
  border-radius: 5px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0 20px;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 50px auto;
  max-width: 80%;
  padding: 0 50px;
`;
const NameLanguages = styled.div``;

const Known = styled.span`
  font-size: 16px;
  border: 1px solid #8a8a8a;
  padding: 5px;
  /* min-width: fit-content;
  width: 100%; */
  border-radius: 15px;
  text-align: center;
  overflow: hidden;
`;
const Job = styled.span`
  font-size: 16px;
  border: 1px solid #8a8a8a;
  padding: 2px;
  width: 10%;
  margin: 20px 0;
  border-radius: 15px;
  text-align: center;
  overflow: hidden;
`;
const ReadMore = styled.button`
  cursor: pointer;
  background: transparent;
  color: blue;
  border: none;
  margin: 0 0 0 5px;
  border-bottom: 1px solid blue;
`;
