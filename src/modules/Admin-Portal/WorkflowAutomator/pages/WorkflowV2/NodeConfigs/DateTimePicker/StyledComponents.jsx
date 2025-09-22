import styled from 'styled-components';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

export const AppContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const CloseBtn = styled.span`
  color: #aaa;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;

  &:hover,
  &:focus {
    color: red;
    text-decoration: none;
  }
`;

export const CustomHeader = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  select {
    margin: 0 5px;
  }

  button {
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

export const Label = styled.label`

`;

export const LeftArrow = styled(IoIosArrowDropleftCircle)`
  color: #aaa;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

export const Modal = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const OpenButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export const Pickerbutton = styled.button`
  padding: 8px 15px;
  margin: 0;
  border-radius: 50px;
  border: none;
  
  &:hover {
    box-shadow: 0px 0px 4px 2px #38b000;
  }
`;

export const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PickerTitle = styled.p`
  margin: 0;
  padding: 0; 
  color: #000;
  font-size: 22px;
  text-align: center;
`;

export const RightArrow = styled(IoIosArrowDroprightCircle)`
  color: #aaa;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;
