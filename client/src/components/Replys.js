import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Replys({ i }) {
  const { state } = useContext(UserContext);

  const { data } = useFetch("/api/users", state.reload);

  if (!data || !i) {
    return (
      <BoxContainer>
        <CircularProgress />
      </BoxContainer>
    );
  }
  return (
    <Wrapper>
      <Seperator />
      {i.replys.map((reply, index) => {
        return (
          <Parent key={index}>
            {data.data.map((user) => {
              if (!user.replys || user.replys.length === 0) {
                return null;
              }
              const currentReply = user.replys.map(
                (userId, index) =>
                  userId === reply._id && (
                    <LinkWrapper key={index} to={`/${user._id}`}>
                      <UserImg
                        src={
                          user.profileImg
                            ? user.profileImg
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII="
                        }
                        loading="lazy"
                        alt={user.firstName}
                      />
                      <UserInfo>
                        <div>
                          <p>{user.firstName}</p>
                          <p>{user.lastName}</p>
                        </div>
                        <p>{reply.replys}</p>
                      </UserInfo>
                    </LinkWrapper>
                  )
              );
              return currentReply;
            })}
          </Parent>
        );
      })}
    </Wrapper>
  );
}
const BoxContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div``;
const LinkWrapper = styled(Link)`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
  text-decoration: none;
`;
const Parent = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImg = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;
const Seperator = styled.hr`
  height: 1px;
  background-color: lightgray;
  border: none;
  margin: 20px 0;
`;
const UserInfo = styled.div`
  > div {
    display: flex;
    gap: 5px;
  }
`;
