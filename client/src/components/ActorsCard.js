import CastHover from "./CastHover";
import PersonPlaceHolder from "../assets/person-placeholder.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function ActorsCard({ cast, isSmall }) {
  return (
    <CastCard key={cast.cast_id} state={isSmall}>
      <LinkCast to={`/browse/cast/${cast.id}`}>
        <CastImg
          state={isSmall}
          src={
            cast.profile_path
              ? `${process.env.REACT_APP_BASE_IMG}${cast.profile_path}`
              : PersonPlaceHolder
          }
          loading="lazy"
          alt={cast.id}
        />
        <CastHover cast={cast} isSmall={isSmall} />
      </LinkCast>
    </CastCard>
  );
}
const CastImg = styled.img`
  height: ${(props) => (!props.state ? "350px" : "100px")};
  width: ${(props) => (!props.state ? "250px" : "177px")};
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
    width: ${(props) => (!props.state ? "250px" : "177px")};
    transition: all 0.5s ease-in-out;
    transform: scale(1.1);
    filter: brightness(110%);
  }
`;
