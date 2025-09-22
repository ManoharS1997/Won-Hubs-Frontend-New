import styled, { keyframes } from "styled-components";
import BootstrapDropdown from "react-bootstrap/Dropdown";
import Select from "react-dropdown-select";

const color = "#111";
const primary = "#FFAB9D";

const rotate180 = keyframes`
  from {
    transform: rotate(0deg); /* Start rotation from 0 degrees */
  }
  to {
    transform: rotate(180deg); /* Rotate to 180 degrees */
  }
`
const rotate360 = keyframes`
  from {
    transform: rotate(180deg); /* Start rotation from 0 degrees */
  }
  to {
    transform: rotate(360deg); /* Rotate to 180 degrees */
  }
`
const swing = keyframes`
    0% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
    }

    25% {
    transform: rotate(70deg);
    animation-timing-function: ease-in;
    }

    50% {
    transform: rotate(0deg);
    animation-timing-function: linear;
    }
`;

const swing2 = keyframes`
    0% {
    transform: rotate(0deg);
    animation-timing-function: linear;
    }

    50% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
    }

    75% {
    transform: rotate(-70deg);
    animation-timing-function: ease-in;
    }
`;

// #################################################################### CREATE DESIGN COMPONENT STYLES   ######################################################################

export const CustomContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0px;
`

export const Dot = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    width: 25%;
    transform-origin: center top;

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 25%;
        border-radius: 50%;
        background-color: var(--uib-color);
    }

    &:first-child {
        animation: ${swing} var(--uib-speed) linear infinite;
    }

    &:last-child {
        animation: ${swing2} var(--uib-speed) linear infinite;
    }
`;

export const DropDownOptionsContainer = styled.div`
`;

export const FinishBtn = styled.button`
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  border: none;
  height: 100%;
  transition: transform 0.5s ease;
  margin-left: auto;
  border-radius: 100px;

  svg {
    left: 0;
    transition: transform 0.5s ease;
    transform: translateX(0);
  }

  &:hover svg {
    transform: translateX(10px);
  }
`

export const NewtonsCradle = styled.div`
    --uib-size: 50px;
    --uib-speed: 1.2s;
    --uib-color: #474554;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uib-size);
    height: var(--uib-size);
`;
export const OpenIcon = styled.button`
  padding: 0px;
  align-self: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  color: #000;
  border: none;
  border-radius: 8px 0px 0px 8px;

  svg {
    animation: ${({ isOpened }) => (!isOpened ? rotate180 : rotate360)} 0.7s
      ease forwards;
  }
`

export const ReactSelect = styled(Select)`
    background-color: #fff;
    border-radius: 10px !important;
    width: 310px;
    padding: 5px 5px ;
    display: flex;
    align-items: center;
    border: none !important;
    
    .react-dropdown-select-content {
        &::-webkit-scrollbar {
        display: none;
        }
    }
    .css-1aarvou-DropdownHandleComponent{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 16px;
        width: 16px;
        margin: 0px;
        padding: 0px;
    }
    .react-dropdown-select-option-label{
      min-width: 6rem !important;
      max-width: 50rem !important;
      height: fit-content ;
      text-align: center;
    }
    .react-dropdown-select-option{
      width: fit-content !important;
      display: flex;
      align-items: center;
    }
    .react-dropdown-select-content{
      min-width: 6rem !important;
      max-width: 50rem !important;
    }
    .react-dropdown-select-type-single span{
      min-width: 6rem !important;
      max-width: 50rem !important;
    }
`
// #################################################################### TASKCARD COMPONENT styles   ######################################################################

export const TaskInformation = styled.div`             //USED IN TASKCARD COMPONENT
  display: flex;
  justify-content: space-between ;
  align-items: center;
  padding: 10px 15px;
  min-width: 10vw;
  min-height: 25px;
  border-radius: 5px;
  width: 100%;
  flex-grow: 1;
  font-weight: 600;
  background-color: #d9d9d9;
  
  background: rgba(250, 164, 3, 0.24);
  margin-top: 10px;
  color: #584902;
  border: 1px solid rgba(14, 14, 155, 1);
  transition: transform 0.3s ease;
  
  &:hover{
    transform: scale(1.0100);
  }
`
export const FieldName = styled.p`                     //USED IN TASKCARD COMPONENT
  margin: 0px;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`
// #################################################################### PREVIEW STYLES   ######################################################################

export const ActionBtnContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  margin-left: auto;
`;
export const CustomBtn = styled.button`
  background-color: #274c77;
  color: #fff;
  outline: none;
  border: 1px solid;
  border-radius: 5px;
  font-size: 12px;
  padding: 8px 15px;
  width: fit-content;
  height: fit-content;
`;
export const CustomTableContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;
export const CustomTable = styled.table`
  width: 100%;
  height: fit-content;
  border-radius: inherit;
  display: table;
  margin: 0;
  padding: 0;
`;
export const CustomThead = styled.thead`
  background-color: #2d3142;
  width: 100%;
  color: #fff;
  margin: 0;
  padding: 0;
  border-radius: 10px 10px 0px 0px;
  display: flex;
`;
export const CustomTh = styled.th`
  flex-grow: 1;
  padding: 5px;
  text-align: left;
  color: #fff;
  border: none;
  position: sticky;
  top: 0;
  display: flex;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;
export const CustomTbody = styled.tbody`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;
export const CustomTr = styled.tr`
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;

  &:hover {
    background-color: #e5e5e5;
  }
`;
export const CustomTd = styled.td`
  width: fit-content;
  height: 100%;
  padding: 5px;
  background-color: inherit;
`;
export const FieldForm = styled.form`
  display: flex;
  flex-direction: ${({ split }) => (split ? "row" : "column")};
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-around;
`;
export const FormFieldsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: ${({ double }) => (double ? "grid" : "flex")};
  grid-template-columns: ${({ double }) => (double ? "auto auto" : "auto")};
  flex-direction: column;
  row-gap: 10px;
`;
export const FieldInputContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
export const FormLable = styled.label`
  font-size: 12px;
  width: 30%;
  text-align: right;
`;
export const FormFieldinput = styled.input`
  background-color: #fff;
  color: #000;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
`;
export const FormTabscContainer = styled.div`
  width: 100%;
  min-height: 25vh;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  margin-top: auto;
`;
export const FormTabsList = styled.ul`
  width: 100%;
  height: fit-content;
  display: flex;
  column-gap: 10px;
  list-style: none;
  padding-left: 10px;
  margin: 0px;
`;
export const FormTab = styled.li`
  background-color: ${({ active }) => (active ? "#4a4e69" : "#e5e5e5")};
  color: ${({ active }) => (!active ? "#4a4e69" : "#e5e5e5")};
  padding: 5px 10px;
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  font-weight: 700;
`;
export const PreviewForm = styled.form`
  width: 80%;
  height: 80vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 16px 0px;
  margin: auto;
`;

export const TabContentContainer = styled.div`
  width: 100%;
  height: 100%t;
  flex-grow: 1;
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 0px;
  margin: 0px;
  border: none;
`;
export const SaveBtn = styled.button`
  background-color: #495057;
  color: #fff;
  outline: none;
  border-radius: 8px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 5px 1% 1% auto;
`;