import { useState } from "react";
import styled from "styled-components";
import PersonPlaceHolder from "../assets/person-placeholder.jpg";
import { useFetch } from "../hooks/useFetch";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Imdb from "../assets/imdbIcon.png";
import Instagram from "../assets/Instagram.png";

export default function CastHeader({ data, cast }) {
  const [show, setShow] = useState(false);
  const { data: social } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/person/${cast}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!social) {
    return null;
  }
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
        <Header>
          <Title>{data.name}</Title>
          <IconsParent>
            {social.facebook_id && (
              <LinkSocial
                href={`https://www.facebook.com/${social.facebook_id}`}
              >
                <FacebookIcon />
              </LinkSocial>
            )}
            {social.instagram_id && (
              <LinkSocial
                href={`https://www.instagram.com/${social.instagram_id}`}
              >
                <SocialIcon src={Instagram} />
              </LinkSocial>
            )}
            {social.facebook_id && (
              <LinkSocial href={`https://twitter.com/${social.facebook_id}`}>
                <TwitterIcon />
              </LinkSocial>
            )}
            {social.imdb_id && (
              <LinkSocial href={`https://www.imdb.com/name/${social.imdb_id}`}>
                <SocialIcon src={Imdb} />
              </LinkSocial>
            )}
          </IconsParent>
        </Header>
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
const SocialIcon = styled.img`
  height: 20px;
`;
const Title = styled.h1`
  color: black;
  font-size: 34px;
  margin: 0 0 20px;
`;
const IconsParent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;
const LinkSocial = styled.a`
  text-decoration: none;
  &:visited {
    color: blue;
  }
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
