import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LanguageIcon from "@mui/icons-material/Language";
import styled from "@emotion/styled";

export default function Sidebar({ data }) {
  if (!data) {
    return;
  }
  return (
    <Wrapper>
      <Text>
        <span>Populatiry</span> {data.popularity} <Fire />
      </Text>
      {data.tagline && (
        <Text>
          <span>Theme:</span> {data.tagline}
        </Text>
      )}

      <Text>
        <span>Release Date :</span> {data.release_date}
      </Text>
      <Text>
        <span>Revenue :</span> ${data.revenue}
      </Text>
      <Text>
        <span>Run Time :</span> {data.runtime} minutes
      </Text>
      {data.original_language && (
        <Text>
          <span>Languages :</span>
          <Lang />
          {data.original_language.toUpperCase()}
        </Text>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
const Text = styled.p`
  padding: 10px 0;
  border-bottom: 1px solid lightgray;
  font-weight: 400;
  color: #354230;
  display: flex;
  align-items: center;
  gap: 5px;
  > span {
    font-weight: 800;
  }
`;
const Lang = styled(LanguageIcon)`
  font-size: 18px;
  color: #cc777b;
`;
const Fire = styled(LocalFireDepartmentIcon)`
  color: #cc777b;
  font-size: 18px;
`;
