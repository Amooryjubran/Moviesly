import styled from "styled-components";

export default function Tabs({ handleClick, active }) {
  return (
    <TabsParent>
      <TabsWrapper>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Reviews
        </Tab>
      </TabsWrapper>

      <TabsWrapper>
        <Tab onClick={handleClick} active={active === 1} id={1}>
          Likes
        </Tab>
      </TabsWrapper>
    </TabsParent>
  );
}
const TabsWrapper = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;
const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 100%;
  position: relative;
  margin-right: 0.1em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "#cc777b" : "white")};
  color: ${(props) => (props.active ? "white" : "#cc777b")};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;
  @media (max-width: 1024px) {
    height: 100%;
    top: 0;
  }
  :hover {
    background-color: white;
    color: #cc777b;
  }
`;
const TabsParent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
