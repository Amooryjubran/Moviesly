import styled from "styled-components";
import ExplicitIcon from "@mui/icons-material/Explicit";
import LanguageIcon from "@mui/icons-material/Language";
export default function CastHover({ cast }) {
  return (
    <Wrapper>
      <Container>
        <MovieTitle>{cast.character}</MovieTitle>
        <MovieInfo>{cast.known_for_department}</MovieInfo>
      </Container>
      <Parent>
        <ReleaseDate>
          {cast.original_name ? cast.original_name : cast.name}
        </ReleaseDate>
        <Language>
          <Lang />
          {cast.gender}
        </Language>
        {cast.adult ? <ExplicitIcon /> : <Adult>14+</Adult>}
      </Parent>
    </Wrapper>
  );
}

const MovieTitle = styled.h1`
  font-weight: 400;
  font-size: 12px;
  color: #d3d3d3;
`;
const MovieInfo = styled.p`
  color: #d3d3d3;
  margin: 5px 0;
  font-size: 8px;
  border: 1px solid #8a8a8a;
  border-radius: 15px;
  text-align: center;
  width: fit-content;
  padding: 5px 10px;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 80%;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  background: #7a6468;
  background: -webkit-radial-gradient(top, #7a6468, #4926b3);
  background: -moz-radial-gradient(top, #7a6468, #4926b3);
  background: radial-gradient(to bottom, #7a6468, #4926b3);
  display: none;
`;
const Container = styled.div`
  display: flex !important;
  justify-content: space-between;
  flex-direction: column;
`;
const Parent = styled.div`
  display: flex !important;

  gap: 15px;
  align-items: center;
`;
const Adult = styled.div`
  border: 1px solid white;
  color: white;
  font-size: 8px;
  padding: 2px;
`;
const Language = styled.span`
  display: flex;
  gap: 5px;
  align-items: end;
  font-size: 10px;
`;
const ReleaseDate = styled.span`
  font-size: 10px;
`;
const Lang = styled(LanguageIcon)`
  font-size: 10px;
`;
