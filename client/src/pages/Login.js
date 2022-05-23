import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpWallpaper from "../assets/signUp.jpg";
import Logo from "../assets/MoviesLify-logos_black.png";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../context/UserContext";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emaildValid, setEmaildValid] = useState(false);
  const matches = useMediaQuery("(max-width:1024px)");

  const {
    state: { user },
    actions: { loadingUser, receivedUserFromServer, errorFromServerUser },
  } = useContext(UserContext);

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const handleClick = (event) => {
    event.preventDefault();

    if (!account.email || !account.password) {
      return setError(true);
    }
    setButtonSpinner(true);
    loadingUser();
    fetch(`${process.env.REACT_APP_SERVER_API}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          receivedUserFromServer({ user: data.data });
          history(-1, { replace: true });
        } else if (data.status === 400) {
          return [setEmaildValid(true), setButtonSpinner(false)];
        } else if (data.status === 409) {
          return [setPasswordValid(true), setButtonSpinner(false)];
        }
      })
      .catch((err) => {
        console.error(err);
        errorFromServerUser({ message: "Error happened" });
      });
  };
  useEffect(() => {
    if (user.firstName) {
      return history("/");
    }
  }, [user.firstName]);

  return (
    <LoginContainer>
      {!matches && (
        <Link to="/">
          <ArrowBackIcon />
        </Link>
      )}
      <LoginWrapper state={matches}>
        {!matches && <LoginDiv />}
        <LoginFormWrapper>
          {!matches && <LoginLogo src={Logo} alt="logo" />}
          <LoginHeader>Welcome to Movieslify</LoginHeader>
          <LoginForm
            handleChange={handleChange}
            account={account}
            passwordShown={passwordShown}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            togglePassword={togglePassword}
            handleClick={handleClick}
            buttonSpinner={buttonSpinner}
            error={error}
            passwordValid={passwordValid}
            emaildValid={emaildValid}
          />
          <LoginLoginOr>
            <span>or</span>
          </LoginLoginOr>
          <LoginLogin>
            New to Movieslify ? <Link to="/signup">Sign Up</Link>
          </LoginLogin>
          {!matches && <img src={Logo} alt="logoG" className="signUpLogoG" />}
        </LoginFormWrapper>
      </LoginWrapper>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  margin: 4rem 0;
  @media (max-width: 1024px) {
    margin: 2rem 0;
  }
`;
const LoginWrapper = styled.div`
  max-width: 75%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 1024px) {
    background-image: url(${signUpWallpaper});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    padding: 2rem;
    width: 100%;
    min-height: 20rem;
    justify-content: space-evenly;
    box-shadow: 11px 15px 25px 0 #f5f5f5;
    max-width: 90%;
  }
`;

const LoginDiv = styled.div`
  background-image: url(${signUpWallpaper});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  padding: 2rem;
  width: 100%;
  min-height: 20rem;
  justify-content: space-evenly;
  box-shadow: 11px 15px 25px 0 #f5f5f5;
`;
const LoginLogo = styled.img`
  display: block;
  margin: 30px auto;
  height: 100px;
  width: 250px;
  object-fit: contain;
  transform: scale(2.5);
`;
const LoginHeader = styled.h1`
  color: #8a8a8a;
  margin: 30px auto 50px;
  text-align: center;
  font-size: 1.4rem;
  @media (max-width: 1024px) {
    color: black;
  }
`;
const LoginLoginOr = styled.h1`
  width: 80%;
  text-align: center;
  border-bottom: 1px solid #8a8a8a;
  color: #8a8a8a;
  line-height: 0.1em;
  margin: 30px auto;
  font-size: 16px;
  > span {
    background: #fff;
    padding: 0 10px;
    @media (max-width: 1024px) {
      background: none;
      color: black;
    }
  }
`;
const LoginLogin = styled.h1`
  font-size: 15px;
  text-align: center;
  > a {
    color: #cc777b;
  }
`;
const LoginFormWrapper = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
    background: hsla(0, 0%, 100%, 0.55);
  }
`;
