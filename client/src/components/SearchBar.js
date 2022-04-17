import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
export default function SearchBar() {
  return (
    <Wrapper>
      <Input type="text" placeholder="Search ..." />
      <SearchIcon />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  text-align: center;
  margin: -15px 0 0;

  > svg {
    color: #cc777b;
    position: absolute;
    right: 43%;
    top: 18%;
  }
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 20px;
  text-indent: 14px;
  box-shadow: 2px 7px 2px rgba(0, 0, 0, 0.1);
  &::placeholder {
    color: #cc777b;
  }
  &:focus {
    outline: none;
  }
`;
