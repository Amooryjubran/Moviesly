import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import GenresForm from "./GenresForm";
import ProfilePictureForm from "./ProfilePictureForm";
export default function ProfileForm() {
  const urlLink =
    process.env.REACT_APP_BASE_URL +
    process.env.REACT_APP_LIST_OF_GENRES +
    process.env.REACT_APP_API_KEY;
  const { data } = useFetch(urlLink);
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);

  if (!data || !user) {
    return null;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true,
  };

  return (
    <Wrapper>
      <GenresForm
        settings={settings}
        data={data}
        user={user}
        updateUser={updateUser}
      />
      <ProfilePictureForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 90%;
`;
