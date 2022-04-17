import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import moment from "moment";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Likes from "./Likes";
export default function ReviewCard({ i, user }) {
  const [likeBtn, setLikeBtn] = useState(false);
  const {
    state: { user: currentUser },
  } = useContext(UserContext);

  if (!i.likes) {
    return null;
  }
  const handleLikes = () => {
    if (!user.email || !currentUser) {
      return;
    }
    fetch(`/api/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: i._id,
        email: user.email,
        likes: currentUser.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          //   return [setButtonSpinner(false), setError(false)];
        } else if (data.status === 409) {
          //   return [setButtonSpinner(false)];
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <MainDiv>
      <Container>
        <UserIMG
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII="
          alt=""
        />
        <Parent>
          <Wrapper>
            <p>{user.firstName}</p>
            <Stack>
              <Rating
                defaultValue={i.rating}
                size="small"
                precision={0.5}
                readOnly
              />
            </Stack>
          </Wrapper>
          {i.timeStamp ? (
            <p>{moment(i.timeStamp).format("lll")}</p>
          ) : (
            <p>Recently</p>
          )}
        </Parent>
      </Container>
      <p>{i.review}</p>
      <Seperator />
      <Icons>
        <LikeDiv>
          <FavoriteBorderIcon onClick={handleLikes} />
          <Likes setLikeBtn={setLikeBtn} likeBtn={likeBtn} i={i} user={user} />
        </LikeDiv>
        <ChatBubbleOutlineIcon />
        <IosShareIcon />
      </Icons>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  box-shadow: rgb(17 12 46 / 15%) 0px 17px 24px 0px;
  padding: 15px;
  margin: 10px 0;
  border-radius: 7px;
`;
const UserIMG = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 50%;
`;
const Parent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const Seperator = styled.hr`
  height: 1px;
  background-color: lightgray;
  border: none;
  margin: 20px 0;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  > svg {
    cursor: pointer;
    font-size: 18px;
  }
`;
const LikeDiv = styled.div`
  display: flex;
  cursor: pointer;
  gap: 10px;
`;
