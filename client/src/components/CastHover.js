import styled from "@emotion/styled";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExplicitIcon from "@mui/icons-material/Explicit";
import Rating from "@mui/material/Rating";
import LanguageIcon from "@mui/icons-material/Language";
export default function CastHover({ movie }) {
  return (
    <MovieOnHover>
      <Middle>
        <MovieTitle>{movie.character}</MovieTitle>
        <MovieInfo>{movie.known_for_department}</MovieInfo>
      </Middle>

      <Bottom>
        <ReleaseDate>
          {movie.original_name ? movie.original_name : movie.name}
        </ReleaseDate>
        <Language>
          <Lang />
          {movie.gender}
        </Language>
        {movie.adult ? <ExplicitIcon /> : <Adult>14+</Adult>}
      </Bottom>
    </MovieOnHover>
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
const MovieOnHover = styled.div`
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
const Icons = styled.div`
  display: flex;
  gap: 7px;
`;
const Top = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`;
const Middle = styled.div`
  display: flex !important;

  justify-content: space-between;
  flex-direction: column;
`;
const Bottom = styled.div`
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
const Add = styled(AddCircleOutlineIcon)`
  font-size: 10px;
`;
const Eye = styled(VisibilityIcon)`
  font-size: 10px;
`;
const Lang = styled(LanguageIcon)`
  font-size: 10px;
`;
const RatingS = styled(Rating)`
  font-size: 12px;
`;
