import {styled} from 'styled-components'
export const PreviewBtn = styled.button`
  background: #001F54; /* Dark Blue background */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  height: 100%;
  margin-left: auto;
  border-radius: 92px;
  position: relative;
  z-index: 0;
  transition: transform 0.5s ease;

  /* Gradient Border */
  border: 2px solid #aca4a4;
  background-image: linear-gradient(#001F54, #001F54),
    linear-gradient(90deg, #d7d7d7, #ffffff, #c0c0c0, #e0e0e0);
  background-origin: border-box;
  background-clip: padding-box, border-box;

  svg {
    left: 0;
    transition: transform 0.5s ease;
    transform: translateX(0);
  }

  &:hover {
    box-shadow: 0 0 10px rgba(192, 192, 192, 0.7); /* subtle silver glow */
  }

  &:hover svg {
    transform: translateX(10px);
  }
`;
