import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileHeader from "../components/ProfileHeader";
import ProfileLikes from "../components/ProfileLikes";
import ProfileReview from "../components/ProfileReview";
import ProfileWatch from "../components/ProfileWatch";
import ProfleCategories from "../components/ProfleCategories";
import Tabs from "../components/Tabs";
import { useFetch } from "../hooks/useFetch";

export default function Profile() {
  const { profile } = useParams();
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_API}/api/user/${profile}`
  );
  const [active, setActive] = useState(0);

  if (!data) {
    return null;
  }
  const user = data.data;
  if (!user) {
    return null;
  }
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    console.log("cliekd");
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <Wrapper>
      <ProfileHeader user={user} />
      <Parent>
        <ProfleCategories user={user} />
        <Container>
          <Tabs active={active} handleClick={handleClick} />
          <Content active={active === 0}>
            <ProfileReview user={user} />
          </Content>
          <Content active={active === 1}>
            <ProfileLikes user={user} />
          </Content>
        </Container>

        <ProfileWatch user={user} />
      </Parent>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  font-family: "Work Sans", sans-serif;
`;
const Parent = styled.div`
  display: flex;
  max-width: 70%;
  margin: 40px auto;
  gap: 20px;
  > div {
    flex: 1;
    padding: 20px;
  }
  > div:nth-of-type(2) {
    flex: 2;
  }
`;

const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

const Container = styled.div``;
