import styled from 'styled-components';

const Divider = styled.div<{ margin: string }>`
  width: 100%;
  height: 1.5px;
  border-radius: 3px;
  background-color: #dfe0e0;
  margin: ${(props) => props.margin};
`;

export default Divider;
