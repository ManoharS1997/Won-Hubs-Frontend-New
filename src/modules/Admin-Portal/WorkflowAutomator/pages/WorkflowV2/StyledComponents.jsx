import styled, { keyframes, css } from "styled-components";
import BootstrapDropdown from "react-bootstrap/Dropdown";

import Select from "react-dropdown-select";

import { Dropdown } from 'semantic-ui-react';

export const BackBtn = styled.button`
  background-color: transparent;
  color: #000;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  height: 100%;
  width: fit-content;
`

export const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`

export const CustomInput = styled.input`
  background-color: #fff;
  color: #000;
  outline: none;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid;
`

export const CustomOption = styled.option`
`

export const CustomSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
`

export const FieldDetailsContainer = styled.div`
  background-color: transparent;
  width: ${({ isOpened }) => isOpened ? "0px" : "35vw"};
  position: fixed;
  height: 87vh;
  flex-grow: 1;
  display: flex;
  transition: width 0.7s;
  right: ${({ isOpened }) => (isOpened ? "0px" : "0vw")};
`

export const FieldInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 15px;
`

export const FieldItem = styled.button`
  background-color: #d9d9d9;
  color: #000;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 15px;
  outline: none;
  border-radius: 5px;
`

export const FieldsAndFlowArea = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  column-gap: 0px;
  flex-grow: 1;
`

export const FieldsContainer = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: transparent;
`

export const FieldsList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  row-gap: 10px;
  padding: 10px;
  border-radius: ${({ active }) => (active ? "0px 10px 10px 10px" : "10px")};
  box-shadow: 0px 5px 4px 1px #9a8c98;
`

export const FormDetailsTitle = styled.h2`
  width: 100%;
  text-align: center;
`

export const HideBtn = styled.button`
  background-color: #d8e2dc;
  color: #000;
  width: fit-content;
  height: fit-content;
  align-self: center;
  outline: none;
  cursor: pointer;
  border: 1px solid #ccc;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 8px 0px 0px 8px;
  transform: translate(-27px, 50%);
  position: fixed;
  
  svg { 
    transition: transform 0.7s ease;
    transform: ${({ isOpen }) => (!isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`

export const IntegrationsTab = styled(FieldsList)`
`

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`

export const NodeLabel = styled.span`
  font-size: 12px;
  color: inherit;
`

export const NodeRightConfiguration = styled.div`
  padding:  10px;
  width: 100%;
  height: 100%;
  background-color: #d8e2dc;
  flex-grow: 1;
`

export const ReactFlowArea = styled.div`
  width: 80%;
  height: 100%;
  flex-grow: 1;
  padding: 5px;
  border-radius: 0px;
  background-color: #fff;
  color: #000;
`

export const ReactflowHeader = styled.div`
  width: 100%;
  height: 7%;
  padding: 2px 15px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ReactSelect = styled(Select)`
  background-color: #fff;
  border-radius: 50px !important;
  max-width: 100%;
  padding: 5px 15px ;
  
  .react-dropdown-select-content {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const RightFieldsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background-color: #fff;
  border-radius: ${({ firstTab }) => firstTab ? "0px 10px 10px 10px" : "10px"};
`


export const TabsContainer = styled.div`
  background-color: transparent;
  width: 100%;
  display: flex;
  align-items: flex-end;
  color: #000;
`

export const RightTabsContainer = styled(TabsContainer)`
  background-color: transparent ;
  padding-top: 0px;
`

export const SelectedFieldName = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 15px;
`

export const SelectedType = styled.select`
  padding: 10px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
`

export const SubmitBtn = styled.button`
  background-color: #bde0fe;
  outline: none;
  cursor: pointer;
  border: 1px solid #bde0fe;
  border-radius: 5px;
`

export const SaveBtn = styled.button`
  background-color: #283618;
  color: #fff;
  display: flex;
  align-items: center;
  column-gap: 10px;
  border: none;
  border-radius: 50px;
`

export const TabItem = styled.button`
  display: flex;
  align-items: center;
  column-gap: 10px;
  background-color: ${({ active }) => (active ? "#fff" : "transparent")};
  border-radius: ${({ active }) => (active ? "10px 10px 0px 0px" : "0px")};
  color: ${({ active }) => (active ? "#000" : "#000")};
  outline: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? "0px -3px 4px 0px #ccc" : "")};
`

export const ValueInput = styled.input`
  border: none;
  width: fit-content;
  height: 100%;
  outline: none;
  border-radius: 50px;
  padding: 5px 15px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 4px 2px #38b000;
  }
`

export const WorkflowContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;
  display: flex;
  background-color: #d9d9d9;
`

// imnported right tab details #########################################################################################################################################################################
export const CustomDrpdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 5px;
  margin: 0px;
  background: #fff;
  min-height: fit-content;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  border-radius: 10px;
  z-index: 1;
`

export const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #fff;
  padding: 2px;
  
  box-shadow: ${({ isOpen }) => isOpen ? '0px 0px 4px 2px #38b000 ' : 'none'};
`

export const CustomFieldContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: 0 5px;
  row-gap: 5px;
  
`

export const DropdownOptions = styled.div`
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  cursor: pointer;
  color: ${({ isSelected }) => isSelected ? '#fff' : '#000'};
  background-color: ${({ isSelected }) => isSelected ? '#38b000' : '#fff'};
  
  &:hover {
    background-color: #38b000;
    color: #fff;
  }
`

export const DropdownSearchBox = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #ccc;
  height: 9%;
  width: 100%;
  border-radius: 0px;
  color: #000;
  outline: none;
  padding: 5px;
  margin: 1px 1px 1px 0px;
`

export const DropDownOptionsContainer = styled.div`
`

export const HelpContainerHeader = styled.p`
  background-color: #222;
  color: #fff;
  border-radius: 5px 5px 0px 0px;
  padding: 0px 5px;
  margin: 0;
`

export const HelpContentContainer = styled.div`
  padding: 5px;
`

export const H1Tag = styled.h1`
  font-size: 20px;
  margin: 0px;
  width: 100%;
  text-align: center;
`

export const InputTag = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  height: fit-content;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  color: #000;
  outline: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 4px 2px #38b000;
  }
`

export const LabelTag = styled.label`
  width: 40%;
`

export const NewCustomDropDown = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0px 0px 0px;
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
`

export const NodeConfigContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 10px 0px;
  row-gap: 10px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

export const NodeHelpPopupContainer = styled.div`
  width: 150px;
`

export const OptionsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  min-height: fit-content;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  column-gap: 0;
  border-radius: 5px;
  padding: 2px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`

export const RightTabContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border-radius: 10px;
`

export const SpanTag = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #df928e;
`

export const StyledDropDown = styled(BootstrapDropdown)`
  height: fit-content;
  width: fit-content;
  min-height: 35px;
  background-color: #fff;
  border-radius: 50px;
  border: 1px solid #ccc;
  padding: 10px 15px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &&.show {
    box-shadow:  0px 0px 4px 2px #38b000;
  }
`

export const StyledItem = styled(BootstrapDropdown.Item)`
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 12px;
  
  &:hover {
    background-color: #38b000;
    color: #fff
  }
`

export const StyledMenu = styled(BootstrapDropdown.Menu)`
  width: 100%;
  min-height: fit-content;
  overflow-y: auto;
  max-height: 200px;
  padding: 3px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 5px;
  
  transform: translate3d(0px, 40px, 0px) !important;

  &::-webkit-scrollbar {
    width: 2px;
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`

export const StyledToggle = styled(BootstrapDropdown.Toggle)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: none;
  width: fit-content;
`

export const TextAreaTag2 = styled.textarea`
  width: 100%;
  height: 60px;
  background: #fff;
  color: #000;
  border-radius: 5px;
  border: 1px solid #adb5bd;
  padding: 7px;
  outline: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 4px 2px #38b000;
  }
`

export const CustomPara = styled.p`
  margin: 0;
  font-size: 0.8rem;
`

// #############################################################################################################################################################################

// add new node styled on the edge

export const ActionNodeBtn = styled.button`
  border-radius: 50px;
  padding: 5px 10px;
  background-color: inherit;
  color: #000;
  outline: none;
  cursor: pointer;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  column-gap: 10px;
  
`

export const AddNodesPopupContainer = styled.div`
  background-color: #fff;
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  border-radius: 5px 5px 5px 5px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const Btn = styled.button`
    padding: ${({ deleteIcon }) => deleteIcon ? '0px' : '4px'};
    border-radius:  ${({ deleteIcon }) => deleteIcon ? '50%' : '5px'};
    background: transparent;
    color: #000;
    border: none;
    display: flex; 
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: ${({ deleteIcon }) => deleteIcon ? 'red' : 'blue'};
    }
`

export const CheckboxInput = styled.input`
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
  color: #000;
  position: absolute;
  left: -10px;
  top: -8px;
  display: block;
  margin: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: none;
  outline: none;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  transition: opacity 0.3s, transform 0.2s;

  &:hover {
    opacity: 0.04;
  }

  &:focus {
    opacity: 0.12;
  }

  &:hover:focus {
    opacity: 0.16;
  }

  &:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
  }
`

// custom checkbox
export const CheckboxLabel = styled.label`
    position: relative;
    display: inline-block;
    padding: 0px;
`

export const CheckboxSpan = styled.span`
    display: inline-block;
    width: 100%;
    cursor: pointer;

    &::before {
        content: "";
        display: inline-block;
        box-sizing: border-box;
        margin: 3px 11px 3px 1px;
        border: solid 2px;
        border-color: rgba(0, 0, 0, 0.6);
        border-radius: 2px;
        width: 18px;
        height: 18px;
        vertical-align: top;
        transition: border-color 0.2s, background-color 0.2s;
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 3px;
        left: 1px;
        width: 10px;
        height: 5px;
        border: solid 2px transparent;
        border-right: none;
        border-top: none;
        transform: translate(3px, 4px) rotate(-45deg);
    }
`

export const Input = styled.input`
  font-size: 14px;
  padding: 5px 5px 5px 2px;
  display: flex;
  width: 100%;
  border: none;
  border-bottom: 1px solid #515151;
  background: transparent;
  outline: none;
  color: #000;

  &:focus ~ label,
  &:valid ~ label {
    top: 0px;
    font-size: 10px;
    color: #5264ae;
  }
`

export const Bar = styled.span`
  position: relative;
  display: block;
  width: 100%;

  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: #5264ae;
    transition: 0.2s ease all;
  }

  &:before {
    left: 50%;
  }

  &:after {
    right: 50%;
  }

  ${Input}:focus ~ &:before,
  ${Input}:focus ~ &::after {
    width: 50%;
  }
`

export const ButtonsSection = styled.div`
  display: flex;
`

export const CustomPolygon = styled.polygon`
  width: 100%;
  height: fit-content;
`

export const CustomSvg = styled.svg`
  position: fixed;
  width: 10px;
  height: 100%;
  align-self: center;
  margin-top: auto;
  left: 102%;
  top: 22%;
  display: ${({ showPopup }) => (showPopup ? 'flex' : 'none')};
  align-items: center;
`

export const DropDownContainer = styled.div`
  width: fit-content;
  min-width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 5px;
  margin: 0px;
`

export const DropdownBtn = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: inherit;
  color: inherit;
  width: 100%;
  height: 100%;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  column-gap: 10px;
`

export const DropdownUl = styled.ul`
  padding: 0px;
  list-style: none;
  width: fit-content;
  height: fit-content;
  display: none;
  border-radius: 5px;
  flex-direction: column;
  background-color: #ffffff;
  position: absolute;
  row-gap: 10px;
  top: 100%;
  z-index: 2;
  transition: 0.2s ease all;
  opacity: 1;
  min-width: 200px;
  text-align: left;
  box-shadow: 0px 3px 5px -1px #ccc;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  li {
    width: 100%;
    border-left: 2px solid #3ca0e7;
    padding: 0 10px;
    text-decoration: none;
    text-align: left;
    column-gap: 10px;
    clear: both;
    text-align: left;
    padding: 10px;
    border-style: none;
    transition: all 0.3s ease;

    &:hover {
      color: #3ca0e7;
      padding-left: 15px;
      border-left: 4px solid #3ca0e7;
    }

    a {
      color: black;
      text-decoration: none;
      transition: all 0.3s ease;
      color: black;
      padding-left: 0;
      width: 100%;
    }

    &:hover {
      cursor: pointer;

      ul {
        visibility: visible;
        opacity: 1;
        display: block;
      }
    }
  }

  p {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    column-gap: 15px;
    cursor: pointer;

    a {
      color: #000;
    }
  }

  ${DropDownContainer}:hover & {
    display: flex;
  }
`

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
`

export const Group = styled.div`
  position: relative;
  width: fit-content;
  min-width: 250px;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const InputHighlighter = keyframes`
  from {
    background: #5264AE;
  }

  to {
    width: 0;
    background: transparent;
  }
`

export const Highlight = styled.span`
  position: absolute;
  height: 60%;
  width: 100%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;

  ${Input}:focus ~ & {
    animation: ${InputHighlighter} 0.3s ease;
  }
`

export const Label = styled.label`
  color: #999;
  font-size: 12px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 15px;
  transition: 0.2s ease all;
`

export const PopupNodesList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 0;
`

export const Strip = styled.div`
  position: absolute;
  background-color: transparent;
  color: #000;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: 55px;
  left: 80%;
  padding: 0 2px;
`

export const StripItem = styled.span`
  background-color: inherit;
  padding: 5px;
  position: relative;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 2px 1px #ccc;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`

export const UiDropDown = styled(Dropdown)`
`

// flow activation button styled-components

export const ToggleContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;
`

export const FlowActivateLabel = styled.label``

export const SwitchContainer = styled.button` 
  width: 40px;
  height: 10px;
  border: none;
  border-radius: 999px;
  display: flex;
  padding: 0px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
  outline: none;
  background-color: ${({ active }) => active ? '#29bf12' : '#fff'};
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Knob = styled.div`
  background-color: #fff;
  position: absolute;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  padding: 10px;
  box-shadow: 0px 0px 2px 1px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  translate: ${({ active }) => active ? '0px' : 'none'};
  transform: ${({ active }) => active ? 'translateX(30px)' : 'translateX(0%)'};

  /* ${(props) =>
    props.active &&
    css`
      animation: ${rotate} 2s linear infinite;
    `} */
`

export const ConditionSelectBtn = styled.button`
  cursor: pointer;
  padding: 0 5px;
  margin: 0;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  
  &:hover {
    border-bottom: 1px solid blue;
  }
`
