import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "styled-components";
export default function ScrollToTop() {
  const [hidden, setHiddent] = useState(false);
  const showScroll = () => {
    if (window.pageYOffset > 200) {
      setHiddent(true);
    } else setHiddent(false);
  };
  const ScrolToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", showScroll);
    return () => {
      window.removeEventListener("scroll", showScroll);
    };
  }, []);

  return (
    <Arrow state={hidden}>
      <ArrowUp onClick={ScrolToTop} />
    </Arrow>
  );
}

const Arrow = styled.div`
  opacity: ${(props) => (props.state ? "1" : "0")};
  z-index: 2222;
  bottom: 20px;
  right: 5%;
  position: fixed;
  background-color: white;
  box-shadow: 1px 1px 1px #ccc;
  padding: 10px;
  border-radius: 50%;
`;
const ArrowUp = styled(KeyboardArrowUpIcon)`
  cursor: pointer;
`;
