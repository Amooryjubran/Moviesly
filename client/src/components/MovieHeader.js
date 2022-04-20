import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { UsePut } from "../hooks/UsePut";
import { useFetch } from "../hooks/useFetch";
export default function MovieHeader({ data, movie }) {
  const [show, setShow] = useState(false);
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);
  const { data: whereToWatch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/movie/${movie}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
  );
  if (!whereToWatch) {
    return null;
  }
  const [handlePut, checkWatchLater] = UsePut({
    user: user,
    data: data,
    updateUser: updateUser,
    url: `watchLater`,
    object: user.watchLater,
    update: { user: { ...user, watchLater: user.watchLater } },
    input: {
      watchLater: user.watchLater,
      email: user.email,
    },
  });
  const [handleWatched, checkWatched] = UsePut({
    user: user,
    data: data,
    updateUser: updateUser,
    url: `watched`,
    object: user.watched,
    input: {
      watched: user.watched,
      email: user.email,
    },
    update: { user: { ...user, watched: user.watched } },
  });
  return (
    <Header
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      <Poster
        src={`${process.env.REACT_APP_BASE_IMG}${data.poster_path}`}
        alt=""
      />
      <Overview>
        <h1>{data.title}</h1>
        <Seperator />
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
        <Seperator />
        <p>{data.overview}</p>
        <Seperator />
        <BTNS>
          <WatchParent>
            <WatchBTN onClick={() => setShow(!show)}>Watch</WatchBTN>
            {show && (
              <WatchItParent>
                {whereToWatch.results.CA.buy && (
                  <>
                    <p>Buy it on</p>
                    <Seperator />
                    <WatchIt>
                      {whereToWatch.results.CA.buy.map((watch) => (
                        <WatchImg
                          src={`${process.env.REACT_APP_BASE_IMG}${watch.logo_path}`}
                          alt={watch.id}
                        />
                      ))}
                    </WatchIt>
                  </>
                )}
                {whereToWatch.results.CA.rent && (
                  <>
                    <p>Rent it on</p>
                    <Seperator />
                    <WatchIt>
                      {whereToWatch.results.CA.rent.map((watch) => (
                        <WatchImg
                          src={`${process.env.REACT_APP_BASE_IMG}${watch.logo_path}`}
                          alt={watch.id}
                        />
                      ))}
                    </WatchIt>
                  </>
                )}
                {whereToWatch.results.CA.flatrate && (
                  <>
                    <p>Flatrate</p>
                    <Seperator />
                    <WatchIt>
                      {whereToWatch.results.CA.flatrate.map((watch) => (
                        <WatchImg
                          src={`${process.env.REACT_APP_BASE_IMG}${watch.logo_path}`}
                          alt={watch.id}
                        />
                      ))}
                    </WatchIt>
                  </>
                )}
              </WatchItParent>
            )}
          </WatchParent>

          <Add state={checkWatchLater} onClick={() => handlePut()} />
          <Eye state={checkWatched} onClick={() => handleWatched()} />
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
  height: 600px;
`;
const Poster = styled.img`
  width: 250px;
  height: 400px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
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
  color: ${(props) => (props.state === 0 ? "#cc777b" : "white")};
  font-size: 24px;
  cursor: pointer;
`;
const Eye = styled(VisibilityIcon)`
  color: ${(props) => (props.state === 0 ? "#cc777b" : "white")};
  font-size: 24px;
  cursor: pointer;
`;
const WatchBTN = styled.button`
  background-color: #cc777b;
  border: none;
  color: #fff;
  letter-spacing: 0.061rem;
  height: 2.75rem;
  width: 100%;
  padding: 5px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
`;

const Seperator = styled.hr`
  height: 1px;
  background-color: #354230;
  border: none;
`;
const WatchParent = styled.div`
  position: relative;
`;
const WatchImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;
const WatchIt = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 20px;
`;
const WatchItParent = styled.div`
  position: absolute;
  color: white;
  background: #000;
  padding: 30px;
  top: 55px;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 2px #ffffff;
  z-index: 99999;
  > p {
    margin: 0 0 10px;
  }
`;
