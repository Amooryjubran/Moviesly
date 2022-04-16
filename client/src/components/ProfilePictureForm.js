import React, { useContext, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePictureForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgLink, setImgLink] = useState(null);
  const history = useNavigate();
  const {
    state: { user },
    actions: { receivedUserFromServer },
  } = useContext(UserContext);
  console.log(user);
  const imageUpload = async (e) => {
    setSelectedImage(e.target.files[0]);
    const fileIn = e.target;
    const file = fileIn.files[0];
    if (file && file.size < 5e6) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "omargubran");
      fetch("https://api.cloudinary.com/v1_1/movieslify/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          e.preventDefault();
          setImgLink(response.secure_url);
        });
    } else {
      console.error("oversized file");
    }
  };
  const handleImage = (e) => {
    console.log("clicked");
    e.preventDefault();
    if (!user.email) {
      return;
    }

    fetch(`/api/profileImg`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        profileImg: imgLink,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          receivedUserFromServer({ user: data.data });
          history("/browse", { replace: true });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  if (user.profileImg) {
    history("/browse", { replace: true });
  }
  console.log(user.profileImg);
  return (
    <Wrapper>
      <Title>Add your profile image</Title>

      <input type="file" name="image" id="upload" onChange={imageUpload} />

      <ProfileImgWrapper>
        <ProfileImg
          alt="not fount"
          referrerpolicy="no-referrer"
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII="
          }
        />
        {selectedImage && <Close onClick={() => setSelectedImage(null)} />}
      </ProfileImgWrapper>

      <Submit onClick={handleImage}>Complete</Submit>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.h1`
  font-size: 20px;
  color: black;
`;
const ProfileImg = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin: 0 auto;
  padding: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;
const ProfileImgWrapper = styled.div`
  position: relative;
`;
const Close = styled(CloseIcon)`
  position: absolute;
  left: 116px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  background: white;
  top: 109px;
  cursor: pointer;
`;
const Submit = styled.button`
  display: block;
  margin: 20px auto;
  background-color: #cc777b;
  border: none;
  color: #fff;
  -webkit-letter-spacing: 0.061rem;
  -moz-letter-spacing: 0.061rem;
  -ms-letter-spacing: 0.061rem;
  letter-spacing: 0.061rem;
  height: 3.75rem;
  width: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
`;
