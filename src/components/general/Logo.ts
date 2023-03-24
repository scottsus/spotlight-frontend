import styled from 'styled-components';

const Logo = styled.h1<{ margin: string }>`
  font-size: 30px;
  font-family: Mont;
  font-weight: 800;
  color: #4b3bff;
  letter-spacing: -1.5px;
  display: inline;
  margin: ${(props) => props.margin};
`;

export default Logo;
