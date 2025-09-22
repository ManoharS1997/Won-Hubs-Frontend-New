import styled from "styled-components";

export const AppsPopupContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1px;
  background-color: var(--background-color);
  margin: 0px;
  padding: 10px;
  /* border: 1px solid #d9d9d9; */
  border-bottom: 1px solid #d9d9d9;
  overflow-y: auto;
  align-self: center;

  &::-webkit-scrollbar {
    width: 7px;
    /* display: none; */
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #3a6ea5;
  }
  
  ::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Hover color */
}
`;

export const CustomUl = styled.ul`
  padding:  1rem;
  list-style: none;
  display: grid;
  grid-template-columns:  19% 19% 19% 19% 19%;
  row-gap: 15px;
  column-gap: 15px;
  width: 100%;
  height: fit-content;
  margin: 0px;

  &::-webkit-scrollbar {
    width: 7px;
  }
`;

export const CustomLi = styled.li`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 1rem;
  /* justify-content: space-between; */
  /* box-shadow: 0px 2px 4px 1px; */

  &:hover {
    transform: scale(1.08);
    box-shadow: 0px 10px 20px 1px rgba(160, 160, 160, 0.68);
  }
`;

export const LogoElement = styled.img`
  height: fit-content;
  max-height: 100px;
  width: 70%;
  align-self: center;
  padding: 1rem;
`;

export const LogoName = styled.span`
  font-size: 10px;
  text-align: center;
  font-weight: 700;
  padding: 5px;
`;

export const CloseBtn = styled.button`
  width: fit-content;
  height: fit-content;
  left: 97%;
  /* margin-left: auto; */
  background-color: #fff;
  color: #e5383b;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 5px;
  position: sticky;

  &:hover {
    background-color: #e5383b;
    color: #fff;
  }
`;

export const InputTag = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  height: 25px;
  width: 200px;
  border-radius:   50px 0 0 50px ;
  color: #000;

`