import styled from 'styled-components';

export interface IBoxDiv {
  isClickable?: boolean;
  isActive: boolean;
  width?: number;
  margin: string;
  padding: string;
}

export const BoxDiv = styled.div<IBoxDiv>`
  width: ${(props) => (props.width > 0 ? `${props.width}px` : 'auto')};
  height: 39px;
  border: 1.5px solid ${(props) => (props.isActive ? '#4b3bff' : '#dfe0e0')};
  border-radius: 7px;
  background-color: ${(props) => (props.isActive ? '#ebe9ff' : '#ffffff')};
  color: ${(props) => (props.isActive ? '#4b3bff' : '#27292a')};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'auto')};
  :hover {
    background-color: ${(props) => props.isClickable && '#ebe9ff'};
  }
`;

export const BoxText = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;
