import styled, { keyframes } from "styled-components";

// Slide-in animation from the center
const slideIn = keyframes`
  from {
    transform: translateY(-50%) scale(0.5);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const scaleOut = keyframes`
  from{
    scale: 1;
  }
  to {
    scale: 0;
  }
`

// Slide-out animation to the center
const slideOut = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(100%) scale(0.5);
    opacity: 0;
  }
`;

const alertBg = type => {
  switch (type) {
    case 'success':
      return "#4caf50";
    case 'failure':
      return "#fc0313"
    case 'critical':
      return "#fc0313"
    default:
      return "#FFFFFF"
  }
}

const alertTxtColor = type => {
  switch (type) {
    case 'success':
      return "#fff";
    case 'failure':
      return "#fff"
    case 'critical':
      return "#fff"
    default:
      return "#000"
  }
}

const criticalAlertsStyles = {
  flexDirection: 'column'
}

// Wrapper to position alerts at the center
export const AlertWrapper = styled.div`
  position: fixed;
  top: 8vh;
  /* left: auto; */
  right: 0.5rem;
  /* transform: translate(-50%, -50%); */
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  z-index: 1000;
`;

// Alert styles with dynamic animation
export const Alert = styled.div`
  background-color: ${({ type }) => alertBg(type)};
  color:  ${({ type }) => alertTxtColor(type)};
  padding: ${({ type }) => type === 'critical' ? "0.5rem" : '0px'};
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  animation: 
    ${slideIn} 0.5s ease-in-out, 
    ${({ type }) => type === 'critical' ? scaleOut : slideOut} 0.5s ease-in-out ${(props) => props.duration - 500}ms forwards;
  min-width: 300px;
  max-width: 400px;
  height: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: ${({ type }) => type === 'critical' ? "fixed" : 'relative'};
  top: ${({ type }) => type === 'critical' ? "45%" : 'none'};
  left: ${({ type }) => type === 'critical' ? "40%" : 'none'};
  
  ${({ type }) => (
    type === 'critical' &&
    criticalAlertsStyles
  )}
`

export const AlertIcon = styled.span`
  height: 100%;
  width: fit-content;
  padding: 0.5rem;
  background-color: rgba(0,0,0,0.2);
`

export const CloseBtn = styled.button`
  padding: 0rem;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: transparent;
  border: none;
  color: inherit;
  margin-left: auto;
  margin-right: 0.5rem;
`


export const CriticalContentCon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`