import { Fragment, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import CloseIcon from "@mui/icons-material/Close";
export default function SearchBar() {
  const [addWidth, setAddWidth] = useState(false);
  const [search, setSearch] = useState("");
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`,
    search
  );
  return (
    <SearchBarWrapper>
      <Search
        style={{ color: "white" }}
        onClick={() => setAddWidth(!addWidth)}
      />
      {addWidth && (
        <SearchPopUp props={search}>
          <Close onClick={() => [setAddWidth(!addWidth), setSearch("")]} />
          <SearchContainer>
            <SearchHeader>What Are You Looking For ?</SearchHeader>
            <SearchBarInput
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
            <Liner />
          </SearchContainer>
          {search && search.length > 3 && (
            <SearchTitle>
              You Searched For ' <SearchParam>{search}</SearchParam> ' :
            </SearchTitle>
          )}
          <SearchItems>
            {search.length > 3 &&
              data.results &&
              data.results.map((movie) => {
                return (
                  <>
                    {search.length > 3 && (
                      <div
                        onClick={() => [setAddWidth(!addWidth), setSearch("")]}
                      >
                        <MovieCard movie={movie} />
                      </div>
                    )}
                  </>
                );
              })}
          </SearchItems>
        </SearchPopUp>
      )}
    </SearchBarWrapper>
  );
}
const SearchBarInput = styled.input`
  border: 1px solid white;
  width: 100%;
  height: 38px;
  outline: none;
  font-size: 16px;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0.75;
  padding: 10px 0;
  color: black;
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;

const SearchPopUp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props) => (props.props.length > 0 ? "auto" : "30%")};
  background: white;
  width: 100%;
  z-index: 99;
  transition: top ease 5s;
  box-shadow: 0px 68px 207px 200px rgba(0, 0, 0, 0.65);
`;

const Search = styled(SearchIcon)`
  font-size: 20px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  padding: 50px;
  background: white;
`;
const SearchHeader = styled.h1`
  color: black;
  font-weight: 400;
  padding: 10px 0;
`;
const Close = styled(CloseIcon)`
  font-size: 18px;
  position: absolute;
  right: 3%;
  top: 25px;
  cursor: pointer;
`;
const Liner = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;
const SearchItems = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  max-width: 75%;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  max-width: 90%;
`;
const SearchTitle = styled.h1`
  color: black;
  font-weight: 400;
  padding: 0 0 45px 170px;
  font-size: 20px;
`;

const SearchParam = styled.span`
  color: black;
`;
