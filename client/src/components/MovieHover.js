import styled from "@emotion/styled";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExplicitIcon from "@mui/icons-material/Explicit";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import LanguageIcon from "@mui/icons-material/Language";
export default function MovieHover({ movie }) {
  return (
    <MovieOnHover>
      <Top>
        <Stack>
          <Rating
            defaultValue={movie.vote_average / 2}
            size="small"
            precision={0.5}
            readOnly
          />
        </Stack>
        <Icons>
          <Add />
          <Eye />
        </Icons>
      </Top>
      <Middle>
        <MovieTitle>{movie.title ? movie.title : movie.name}</MovieTitle>
        <MovieInfo>{movie.overview.substring(0, 100)}...</MovieInfo>
      </Middle>

      <Bottom>
        <ReleaseDate>
          {movie.release_date ? movie.release_date.substring(0, 4) : "Recently"}
        </ReleaseDate>
        <Language>
          <Lang />
          {movie.original_language}
        </Language>
        {movie.adult ? <ExplicitIcon /> : <Adult>14+</Adult>}
      </Bottom>
    </MovieOnHover>
  );
}

const MovieTitle = styled.h1`
  font-weight: 400;
  font-size: 14px;
  color: #d3d3d3;
`;
const MovieInfo = styled.p`
  color: #d3d3d3;
  margin: 10px 0;
  font-size: 10px;
`;
const MovieOnHover = styled.div`
  position: absolute;
  top: 30%;
  /* max-width: 85%; */
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
  font-size: 10px;
`;
const Language = styled.span`
  display: flex;
  gap: 5px;
  align-items: end;
  font-size: 14px;
`;
const ReleaseDate = styled.span`
  font-size: 10px;
`;
const Add = styled(AddCircleOutlineIcon)`
  font-size: 16px;
`;
const Eye = styled(VisibilityIcon)`
  font-size: 16px;
`;
const Lang = styled(LanguageIcon)`
  font-size: 16px;
`;
