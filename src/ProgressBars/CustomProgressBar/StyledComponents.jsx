import styled from "styled-components"

// bar loader styled components
export const ProgressContainer = styled.div`
  width: 50%;
  background-color: #f3f3f3;
  border-radius: 40px;
  overflow: hidden;
  margin: 20px 0;
`

export const ProgressBar = styled.div`
  height: 10px;
  background-color: #4caf50;
  text-align: center;
  line-height: 10px; /* Same as height to center text vertically */
  color: white;
  transition: width 0.4s ease;
  font-size: 0.5rem;
`
// circle loader styles
export const CircularProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: fit-content;
`

export const CircularProgress = styled.svg `
  width: 100px;
  height: 100px;
`

export const CircleBg = styled.path`
  fill: none;
  stroke: #eee;
  stroke-width: 2.0;
`

export const Circle = styled.path`
  fill: none;
  stroke: #4caf50;
  stroke-width: 2.0;
  stroke-linecap: round;
  transition: stroke-dasharray 8.35s; 
  transform-origin: center;
`

export const Percentage = styled.text`
  fill: #4caf50;
  font-size: 0.5em;
  text-anchor: middle;
`