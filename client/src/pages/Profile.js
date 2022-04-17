import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInteractions from "../components/ProfileInteractions";
import ProfileWatch from "../components/ProfileWatch";
import ProfleCategories from "../components/ProfleCategories";
import { useFetch } from "../hooks/useFetch";

export default function Profile() {
  const { profile } = useParams();
  const { data } = useFetch(`/api/user/${profile}`);
  if (!data) {
    return null;
  }
  const user = data.data;
  if (!user) {
    return null;
  }
  return (
    <Wrapper>
      <ProfileHeader user={user} />
      <Parent>
        <ProfleCategories user={user} />
        <ProfileInteractions user={user} />
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
