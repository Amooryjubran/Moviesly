import Logo from "../../assets/MoviesLify-logo-white.png";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    state: { user: currentUser },
  } = useContext(UserContext);
  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    window.location.reload(false);
  };
  if (!currentUser) {
    return null;
  }
  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <LogoImg src={Logo} alt="logo" />
        </Link>
      </Container>
      <Container>
        {currentUser.firstName ? (
          <Parent>
            <PersonIcon onClick={() => setShowSidebar(!showSidebar)} />
            {showSidebar && (
              <Sidebar>
                <UserWrapper>
                  <UserImg
                    src={
                      currentUser.profileImg
                        ? currentUser.profileImg
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAPFBMVEX29vawsLD5+fm6urqtra3CwsKysrLy8vLi4uLe3t7m5uaxsbHp6enFxcXNzc3s7OzT09O9vb3Q0NDZ2dlO/F6aAAAFFUlEQVR4nO2dyXarMAxAQQYzT+H///UZkjRNHyHEtmyJ6C66aLvgHnmQDZaTRBAEQRAEQRCEO3An9oMEY3Et2nKeR8Nc1UPyBfYAQ9VPOvtNqrqxTk7sDkndq0X0L+Z3TT4Xp1Q3ke71hvMv96lKzmYOUE470nf35lKcyhxK9d56NU/785hDOx2SvrX3yzlaOxT9cevVXJcnEIdSf6a9mHfsQw4fBvse8pq1OBTKRnsxnxmLQ/t5G/8R79mKQ2ltvYjnsZ/fEqhctI34FNvACldtpuJujZytOLTu2stEzm1wK7QHbSM+8hKHDzLyfXFWOStcPGkbitgyx4Han3aWMwq48qbNKWP12coXcS4tffCqzWYyg86vd5q1sZUO4SVjefJmMbRB7tubR8A99+7Vm0HAvffuVXyIrfUeBG0Gmy8wY3inOrbXO2DC0DbLk9hibyhQwk2+oSM1c/INHWU0X6A+hfvZZtnwpr3xgpC03LxJpy7ue8cv0aS9rd4CHoL0KhxyLO00q2PL7QBYwxr17SY0bdoDOlK2tnpTztjQpjHiu2zet5h+eU+EvT2+L/gP8aYHojfpdo7Yv1PKCfq3juffOn9/a74GPl8A//GuKHt/63rM75vvJ2/S6+8v3W9B3F+jPI0liPuppLcdEPfPab8RRevgKrbZGwocbdrZWoLylcfqTXn2XkBq6NSbeYKTopNOzq+gvDIhnazdwPieiXjSsoIwhROfvG94DziLcCP0cB7h9p67kM9Z7nj+uKeJ7XMYsD0NuwWnkzWDR20eg9oVjy1dM0hZHnibxDNuB+D9dHHi2ywbeDkoyWYKewCtB21OY9od90ODtL9RfAnUrtqxDSyBtnEIOcO+fce+jAmLLZY9LLcZs5Ty688D2GVumRp4axvx4eO2nmUX7tYr47Haa49gt6fQNsNbd9w80+xS09dAmx+st6dn9iXInoC2T9+ZZ5k6mfUCFPNekUXzp64+ZSXRpZTonDcbBVTNr1Rfni/UD0xA67lT+qlc7tRXw5nr5d64Fkiuy8pQ1kPxDfWRH3xbOWxBEARBYAvsEfvhELhqLbdYjH2XT0oprXXTNOanVmrKu36cy7q4/+MZMCJFW43dpNOfjHxjXXJFT91YtQVz+UV5WYWkm7KvlqO3iz24yhvncr21w2o/dV2ZVtxu9jCP246TnfKTvLrUfFblAOv1LE7OD3fNY0MCYLjsXc9ip94Sb/CQVAeuZ7FQJ73hCMVoX9f/nbqmepUNJO93ip3MSV5lA8UF1Xo1z8iZw4zWwp/M05FSP4fW54eZ++aKzAdtpmOHsl7NexohDxjsmziJS3zQKirumRP4LgDrQOi++BR3YHf5YMlNXMf8AAaGILPXNvE6uc/rGz4n2jmEuNrRKnz4uYnHSTxGxMHjGRJr8Qh93NMFRG40wU/UebuAyI3Q58IRC8R+ROATCT4uVfND2IM3RRPb94eQh2bRqrRYELD+IJ1WvhCwpeNVWbMh1BUAMVbcewRbjVPIWJ4IcnSWWrhDBRyxxrk1IbRJDeZXQgzpSIWn3AgwhyMVGnMDP2lDrBzpAP6hSkop6i/wGzrB0XwBewpHrHjtAnY9PprdG38mg5GoN/IheSr7S/+BXAqCZNayoMQbxzu24Ask3uIt3uIt3uIt3uIt3uJNEfEWb/EWb/EWb/EWb/EWb4qIt3iLt3iLt3gz9s6wvXtFE+wrIHYricUEV1sQBEEQBEEQgvAP11lefkObcB4AAAAASUVORK5CYII="
                    }
                    alt="profileImage"
                  />
                  <UserName>
                    <p>
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p>{currentUser.email}</p>
                  </UserName>
                </UserWrapper>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/${currentUser._id}`}
                >
                  <Btn>Profile</Btn>
                </Link>
                <Seperator />
                <Logout onClick={handleLogOut}>Log out</Logout>
              </Sidebar>
            )}
          </Parent>
        ) : (
          <Btns>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">
                  <Btn>SignUp</Btn>
                </Link>
              </li>
            </ul>
          </Btns>
        )}
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
  z-index: 100;
  position: sticky;
  top: 0;
  box-shadow: rgb(17 12 46 / 15%) 0px 48px 100px 0px;
  background: #000;
`;
const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  list-style: none;
  > svg {
    color: white;
  }
`;
const LogoImg = styled.img`
  height: 100px;
  width: 250px;
  object-fit: contain;
  transform: scale(2.5);
`;

const Btn = styled.button`
  background-color: #cc777b;
  border: none;
  color: #fff;
  height: 36px;
  width: 100%;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 15px 0;
`;
const Logout = styled.button`
  background-color: white;
  border: none;
  color: black;
  height: 36px;
  width: 100%;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const Btns = styled.div`
  > ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    gap: 20px;
  }
  > ul > li > a {
    color: white;
    text-decoration: none;
  }
`;
const Sidebar = styled.div`
  position: absolute;
  color: white;
  background: #000;
  padding: 25px;
  top: 55px;
  right: 0px;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 2px #ffffff;
`;
const Parent = styled.div`
  position: relative;
  > svg {
    color: white;
    cursor: pointer;
  }
`;
const UserImg = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
`;
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserName = styled.div`
  > p {
    display: flex;
  }
`;
const Seperator = styled.hr`
  height: 1px;
  width: 80%;
  background-color: white;
  border: none;
  margin: 20px auto;
`;
