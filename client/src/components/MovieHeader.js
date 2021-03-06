import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { UsePut } from "../hooks/UsePut";
import { useFetch } from "../hooks/useFetch";
export default function MovieHeader({ data, movie, type }) {
  const [show, setShow] = useState(false);
  const [updateWatchLater, setUpdateWatchLater] = useState(`false`);
  const [updateWatched, setUpdateWatched] = useState(`false`);
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);
  const { data: whereToWatch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/${type}/${movie}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
  );
  if (!whereToWatch) {
    return null;
  }
  const [handlePut] = UsePut({
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
    isUpdated: updateWatchLater,
    setIsUpdated: setUpdateWatchLater,
  });
  const [handleWatched] = UsePut({
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
    isUpdated: updateWatched,
    setIsUpdated: setUpdateWatched,
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
        loading="lazy"
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
            <WatchBTN
              disabled={
                !whereToWatch ||
                !whereToWatch.results.CA ||
                whereToWatch.results.length === 0
              }
              onClick={() => setShow(!show)}
            >
              Watch
            </WatchBTN>
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

          <Add $state={updateWatchLater} onClick={() => handlePut()} />
          <Eye $state={updateWatched} onClick={() => handleWatched()} />
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
  @media (max-width: 1024px) {
    height: 100%;
    flex-direction: column;
    padding: 20px 0;
  }
`;
const Poster = styled.img`
  width: 250px;
  height: 400px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  @media (max-width: 1024px) {
    height: 300px;
    width: 200px;
  }
`;
const Overview = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1024px) {
    text-align: center;
    max-width: 80%;
  }
`;
const Genres = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const Genre = styled.span`
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 25px;
`;
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    gap: 15px;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
  }
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
  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;
const Add = styled(AddCircleOutlineIcon)`
  color: ${(props) => (!props.$state ? "#cc777b" : "white")};
  font-size: 24px;
  cursor: pointer;
`;
const Eye = styled(VisibilityIcon)`
  color: ${(props) => (!props.$state ? "#cc777b" : "white")};
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
