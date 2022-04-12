import { CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

export default function AddReview({ data }) {
  const { movie } = useParams();
  const [review, setReview] = useState();
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);
  const handleWishList = () => {
    setButtonSpinner(true);
    if (!user.email) {
      return;
    }

    const movieId = data.id;
    const findMovie = user.reviews.findIndex((item) => item.id === movieId);
    console.log(findMovie);
    const copy = user.reviews;
    if (findMovie === -1) {
      copy.push({ review: review, movieId: movie, email: user.email });
    }
    console.log(copy);
    updateUser({ user: { ...user, reviews: copy } });
    fetch(`/api/review`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviews: copy,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          return setButtonSpinner(false);
        } else if (data.status === 400) {
          return [setButtonSpinner(false)];
        } else if (data.status === 409) {
          return [setButtonSpinner(false)];
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    setReview("");
  };
  return (
    <Container>
      <Title>Add your review</Title>
      <Seperator />
      <Wrapper>
        <ProfileImg
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII="
          alt=""
        />
        <InputWrapper>
          <Input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Buttons>
            <CommentBtn onClick={handleWishList}>
              {buttonSpinner ? <CircularProgress size={15} /> : <>Post</>}
            </CommentBtn>
            <Cancel onClick={() => setReview("")}>Cancel</Cancel>
          </Buttons>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  height: 100% !important;
`;
const Title = styled.h1`
  font-size: 16px;
`;
const Seperator = styled.hr`
  margin: 10px 0 20px;
  height: 1px;
  background-color: lightgray;
  border: none;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  box-shadow: none !important;
`;
const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0px 6px 5px #ccc;

  /* flex: 1; */
`;
const InputWrapper = styled.div`
  flex: 2;
`;
const Input = styled.input`
  padding-bottom: 100px;
  width: 100%;
  border: none;
  box-shadow: rgb(17 12 46 / 15%) 0px 48px 100px 0px;
  &:focus {
    outline: none;
  }
`;
const CommentBtn = styled.button`
  background-color: #cc777b;
  border: none;
  color: #fff;
  height: 1.75rem;
  width: 30%;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
`;
const Cancel = styled.button`
  background-color: white;
  border: 1px solid lightgray;
  color: black;
  height: 1.75rem;
  width: 20%;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 30px;
`;
const Buttons = styled.div`
  padding: 20px 0;
  box-shadow: none !important;
  display: flex;
  gap: 10px;
`;
