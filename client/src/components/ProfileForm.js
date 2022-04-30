import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import GenresForm from "./GenresForm";
import ProfilePictureForm from "./ProfilePictureForm";
import { miniSliderSetting as settings } from "../utils/SliderSettings";
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
