import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpWallpaper from "../assets/signUp.jpg";
import SingUpForm from "../components/SignUpForm";
import Logo from "../assets/Nike.png";
import "./signup.css";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserContext } from "../context/UserContext";
export default function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(true);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emaildValid, setEmaildValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useNavigate();
  const {
    state: { user },
    actions: { loadingUser, receivedUserFromServer, errorFromServerUser },
  } = useContext(UserContext);

  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
    if (
      !account.email ||
      !account.password ||
      !account.firstName ||
      !account.lastName
    ) {
      return setError(true);
    }
    if (account.password !== confirmPassword) {
      return [setCheckConfirmPassword(true), setError(false)];
    }
    loadingUser();
    fetch("/api/user", {
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
          history("/", { replace: true });
        } else if (data.status === 400) {
          return [setEmaildValid(true), setButtonSpinner(false)];
        } else if (data.status === 409) {
          return [setPasswordValid(true), setButtonSpinner(false)];
        } else if (data.status === 403) {
          return [setPasswordValid(true), setButtonSpinner(false)];
        }
      })
      .catch((err) => {
        console.error(err);
        errorFromServerUser({ message: "Error happened" });
      });
    setButtonSpinner(!buttonSpinner);
  };
  useEffect(() => {
    if (user.firstName) {
      return history("/");
    }
  }, [user.firstName]);
  return (
    <SignUpContainer>
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      <SignUpWrapper>
        <SignUpDiv />
        <SignUpFormWrapper>
          <SignUpLogo src={Logo} alt="logo" />
          <SingUpHeader>Welcome to Movieslify</SingUpHeader>
          <SingUpForm
            handleChange={handleChange}
            account={account}
            passwordShown={passwordShown}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            togglePassword={togglePassword}
            checkConfirmPassword={checkConfirmPassword}
            handleClick={handleClick}
            buttonSpinner={buttonSpinner}
            error={error}
            passwordValid={passwordValid}
            emaildValid={emaildValid}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
          />
          <SignUpLoginOr>
            <span>or</span>
          </SignUpLoginOr>
          <SignUpLogin>
            Aready have an account ? <Link to="/login">Log In</Link>
          </SignUpLogin>
          <img src={Logo} alt="logoG" className="signUpLogoG" />
        </SignUpFormWrapper>
      </SignUpWrapper>
    </SignUpContainer>
  );
}
const SignUpContainer = styled.div`
  margin: 4rem 0;
`;
const SignUpWrapper = styled.div`
  max-width: 75%;

  font-family: "Work Sans", sans-serif;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const SignUpDiv = styled.div`
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
const SignUpLogo = styled.img`
  display: block;
  margin: 30px auto;
  height: 20px;
`;
const SingUpHeader = styled.h1`
  color: #8a8a8a;
  margin: 30px auto 50px;
  text-align: center;
  font-size: 1.4rem;
`;
const SignUpLoginOr = styled.h1`
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
  }
`;
const SignUpLogin = styled.h1`
  font-size: 15px;
  text-align: center;
  > a {
    color: #cc777b;
  }
`;
const SignUpFormWrapper = styled.div`
  width: 100%;
`;