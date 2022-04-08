// import CircularProgress from "@mui/material/CircularProgress";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";

export default function LoginForm({
  handleChange,
  account,
  passwordShown,
  showPassword,
  toggleShowPassword,
  togglePassword,
  handleClick,
  buttonSpinner,
  error,
  emaildValid,
  passwordValid,
}) {
  return (
    <LoginUpForm onSubmit={handleChange}>
      <LoginUpWrapper>
        <label>E-mail Address</label>
        <Input
          type="email"
          placeholder="JohnSmith@gmail.com"
          name="email"
          value={account.email}
          onChange={handleChange}
          required
        />
      </LoginUpWrapper>
      <LoginUpWrapper>
        <label>Passwrod</label>
        <Input
          type={passwordShown ? "text" : "password"}
          name="password"
          value={account.password}
          onChange={handleChange}
          required
        />

        {showPassword ? (
          <VisibilityOffIcon
            onClick={() => {
              toggleShowPassword();
              togglePassword();
            }}
          />
        ) : (
          <VisibilityIcon
            onClick={() => {
              toggleShowPassword();
              togglePassword();
            }}
          />
        )}
      </LoginUpWrapper>
      {error && <ErrorMessage>Your Password or E-mail are empty</ErrorMessage>}
      {emaildValid && <ErrorMessage>Your E-mail is incorrect</ErrorMessage>}
      {passwordValid && <ErrorMessage>Your Password is incorrect</ErrorMessage>}

      <LoginUpBtn onClick={handleClick}>
        {buttonSpinner ? <CircularProgress /> : <>Log In</>}
      </LoginUpBtn>
    </LoginUpForm>
  );
}

const LoginUpForm = styled.form`
  display: block;
  margin: auto;
  max-width: 80%;

  > div > svg {
    position: absolute;
    right: 15%;
    color: #cc777b;
  }
`;
const LoginUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const LoginUpBtn = styled.button`
  display: block;
  margin: 20px auto;
  background-color: #cc777b;
  border: none;
  color: #fff;
  letter-spacing: 0.061rem;
  height: 3.75rem;
  width: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
  > span {
    height: 20px !important;
    width: 20px !important;
  }
`;
const Input = styled.input`
  outline: 0;
  border-width: 0 0 1px;
  border-color: #8a8a8a6e;
  margin: 0.6rem 0;
  &:focus {
    border-color: #cc777b;
  }
`;

const ErrorMessage = styled.p`
  margin: 0 0 10px 0;
  color: #cc777b;
`;
