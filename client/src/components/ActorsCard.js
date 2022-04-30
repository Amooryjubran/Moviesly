import CastHover from "./CastHover";
import PersonPlaceHolder from "../assets/person-placeholder.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function ActorsCard({ cast }) {
  return (
    <CastCard key={cast.cast_id}>
      <LinkCast to={`/browse/cast/${cast.id}`}>
        <CastImg
          src={
            cast.profile_path
              ? `${process.env.REACT_APP_BASE_IMG}${cast.profile_path}`
              : PersonPlaceHolder
          }
          alt={cast.id}
        />
        <CastHover cast={cast} />
      </LinkCast>
    </CastCard>
  );
}
const CastImg = styled.img`
  height: 350px;
  width: 250px;
  object-fit: cover;
  border-radius: 5px;
`;
const LinkCast = styled(Link)`
  text-decoration: none;
  color: white;
`;
const CastCard = styled.div`
  position: relative;
  cursor: pointer;
  filter: brightness(80%);

  &:hover {
    div {
      display: block;
      z-index: 50;
    }
    z-index: 20;
    width: 250px;
    transition: all 0.5s ease-in-out;
    transform: scale(1.1);
    filter: brightness(110%);
  }
`;
