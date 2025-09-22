import styled from "styled-components";

export const BurgerButton = styled.button`
  padding: 0;
  background-color: #f2f2f0;
  border: 1px solid #ccc;
  cursor: pointer;
  outline: none;
  display: block;
  border-radius: 50rem;
  width: 0;
  height: 0;
  align-self: flex-end;
  
  position: absolute;
  /* z-index: 1000; */
  background-color: var(--primary-color);
  box-shadow: 0 0 5px 1px var(--background-color);
  color: white;
  border: none;
  cursor: pointer;
  transition: left 0.3s ease-in-out;

  svg {
    transform: ${({ show }) => show ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;
  }
`

