import styled from "styled-components";
import { Link } from 'react-router-dom'

export const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const CloseBtn = styled.button`
  background-color: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  outline: none;
  border-style: none;
  margin-left: auto;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #e5383b;
    color: #ffffff;
  }
`;
export const ContentContainer = styled.div`
  width: fit-content;
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: var(--background-color);
`;
export const CustomLi = styled.li`
    /* flex: 0 0 calc(25% - 10px); */
    /* max-width: calc(25% - 10px); */
    height: 180px;
    background: #adb5bd;
    color: #000;
    border-radius: 10px;
    padding: 15px;
    transition: 0.3s;
    border: 2px solid transparent;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    &:hover {
        transform: scale(1.05);
    }
    list-style-type: none;
    box-shadow: 1px 1px 10px #dee2e6;
`;
export const CustomLink = styled(Link)`
    /* flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px); */
    height: 180px;
    background: #adb5bd;
    color: #000;
    border-radius: 10px;
    padding: 15px;
    transition: 0.3s;
    border: 2px solid transparent;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
        transform: scale(1.04);
        background: #495057;
    }
    list-style-type: none;
    box-shadow: 1px 1px 10px #dee2e6;
`
export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export const TemplatesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  background-color: var(--background-color);
  border-radius: 15px;
  padding: 10px;
  list-style: none;
  width: 100%;
  height: fit-content;
  margin: 0px;
`;