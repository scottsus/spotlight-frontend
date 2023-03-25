import styled from 'styled-components';

interface IDivider {
  margin: string;
  width?: string;
}

const Divider = styled.div<{ margin: string }>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 1.5px;
  border-radius: 3px;
  background-color: #dfe0e0;
  margin: ${(props) => props.margin};
`;

export default Divider;
