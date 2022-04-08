import Logo from "../../assets/Nike.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import styled from "@emotion/styled";
import Brightness3Icon from "@mui/icons-material/Brightness3";

export default function Navbar() {
  return (
    <Wrapper>
      <Container>
        <MenuIcon />
        <LogoImg src={Logo} alt="logo" />
      </Container>
      <Container>
        <SearchIcon />
        <Brightness3Icon />
        <PersonIcon />
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;
const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  list-style: none;
`;
const LogoImg = styled.img`
  height: 75px;
  width: 150px;
  object-fit: contain;
`;
