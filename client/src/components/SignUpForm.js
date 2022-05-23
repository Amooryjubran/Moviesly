// import CircularProgress from "@mui/material/CircularProgress";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";

export default function SingUpForm({
  handleChange,
  account,
  error,
  emaildValid,
  passwordValid,
  passwordShown,
  showPassword,
  toggleShowPassword,
  togglePassword,
  checkConfirmPassword,
  handleClick,
  buttonSpinner,
  confirmPassword,
  setConfirmPassword,
}) {
  return (
    <SignUpForm onSubmit={handleChange}>
      <SignUpWrapper>
        <label>First Name</label>
        <Input
          type="text"
          placeholder="John"
          name="firstName"
          value={account.firstName}
          onChange={handleChange}
          required
        />
      </SignUpWrapper>
      <SignUpWrapper>
        <label>Last Name</label>
        <Input
          type="text"
          placeholder="Smith"
          name="lastName"
          value={account.lastName}
          onChange={handleChange}
          required
        />
      </SignUpWrapper>
      <SignUpWrapper>
        <label>E-mail Address</label>
        <Input
          type="email"
          placeholder="JohnSmith@gmail.com"
          name="email"
          value={account.email}
          onChange={handleChange}
          required
        />
      </SignUpWrapper>
      <SignUpWrapper>
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
      </SignUpWrapper>
      <SignUpWrapper>
        <label>Confirm Passwrod</label>
        <Input
          type={passwordShown ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>Please complete the form</ErrorMessage>}
        {emaildValid && <ErrorMessage>Your E-mail isn't valid</ErrorMessage>}
        {checkConfirmPassword && (
          <ErrorMessage>Your Password don't match</ErrorMessage>
        )}
        {passwordValid && (
          <ErrorMessage>Your Password is incorrect</ErrorMessage>
        )}
      </SignUpWrapper>
      <SignUpBtn onClick={handleClick}>
        {!buttonSpinner ? <CircularProgress /> : <>Create Account</>}
      </SignUpBtn>
    </SignUpForm>
  );
}

const SignUpForm = styled.form`
  display: block;
  margin: auto;
  max-width: 80%;

  > div > svg {
    position: absolute;
    right: 15%;
    color: #cc777b;
  }
`;
const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SignUpBtn = styled.button`
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
  @media (max-width: 1024px) {
    height: 2.4rem;
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
  @media (max-width: 1024px) {
    padding: 10px;
    border-radius: 50px;
  }
`;

const ErrorMessage = styled.p`
  margin: 0 0 10px 0;
  color: #cc777b;
`;
