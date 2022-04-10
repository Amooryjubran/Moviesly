import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function MovieHeader({ data }) {
  return (
    <Header
      style={{
        background: `linear-gradient(rgba(255, 255, 254, -1), rgba(255, 255, 255, 2.5)),url(${process.env.REACT_APP_BASE_IMG}${data.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      <Poster
        src={`${process.env.REACT_APP_BASE_IMG}${data.poster_path}`}
        alt=""
      />
      <Overview>
        <h1>{data.title}</h1>
        <hr />
        <Categories>
          <Genres>
            {data.genres.map((genre) => (
              <Genre key={genre.id}>{genre.name}</Genre>
            ))}
          </Genres>
          <RatingContainer>
            <p>{data.vote_average}/10</p>
            <Stack>
              <RatingS
                defaultValue={data.vote_average / 2}
                size="small"
                precision={0.5}
                readOnly
              />
            </Stack>
          </RatingContainer>
        </Categories>
        <hr />
        <p>{data.overview}</p>
        <hr />
        <BTNS>
          <WatchBTN>
            <LinkBtn href={`https://www.imdb.com/title/${data.imdb_id}`}>
              Watch
            </LinkBtn>
          </WatchBTN>
          <Add />
          <Eye />
        </BTNS>
      </Overview>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background-size: cover;
  color: white;
  object-fit: contain;
  height: 500px;
`;
const Poster = styled.img`
  width: 250px;
  height: 400px;
`;
const Overview = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Genres = styled.div`
  display: flex;
  gap: 15px;
`;
const Genre = styled.span`
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 25px;
`;
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RatingContainer = styled.div`
  display: flex;
  gap: 15px;
`;
const RatingS = styled(Rating)`
  font-size: 12px;
`;
const BTNS = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
const Add = styled(AddCircleOutlineIcon)`
  font-size: 24px;
`;
const Eye = styled(VisibilityIcon)`
  font-size: 24px;
`;
const WatchBTN = styled.button`
  background-color: #cc777b;
  border: none;
  color: #fff;
  letter-spacing: 0.061rem;
  height: 2.75rem;
  width: 40%;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
`;
const LinkBtn = styled.a`
  color: white;
  text-decoration: none;
`;
