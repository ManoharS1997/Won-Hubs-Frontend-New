import styled, { keyframes } from 'styled-components'

export const RegisterMainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const RegisterForm = styled.form`
    width: 40%;
    height: 55%;
    border-radius: 10px;
    padding: 2%;
    /* margin: auto; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 25px;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255, 0);
    font-size: 16px;
    
    /* From https://css.glass */
   /* From https://css.glass */
    background: rgba(255, 255, 255, 1);
    border-radius: 16px;
    box-shadow: 10px 0px 20px 1px #ccc;
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`

export const Title = styled.div`
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin: 0 0 5% 0;
    padding: 0;
    display: flex;
    align-items: center;
    width: 100%;
`

export const MoreOptions = styled.p`
    width: fit-content;
    font-size: 12px;
    text-decoration: underline;
    color: #03045E;
    font-weight: 600;
    margin: 0;
    
    &:hover {
        color: #ccc;
    }
    
    &:active {
        color: aquamarine;
    }
`

export const LoginBtn = styled.button`

    width: fit-content;
    /* align-self: flex-end; */
    /* margin: 15px 0; */
    border-radius: 80px;
    padding: 10px 20px;
    background-color: #7fc8f8;
    color: #3a0ca3;
    border: none;
    border: 2px solid #fff;
    border-color: transparent;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0px 0px 10px 2px #a2d2ff;
        background-color: #2196f3;
        color: #fff;
        border-color: #fff;
    }
`

export const FieldsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 2%;
`

export const TitleSpan = styled.span`
    font-size: 12px;
    font-weight: normal;
    margin: 0 10px;
    padding: 5px 0px;
`

export const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
    margin-top: 5%;
`

export const RegisterBtn = styled.button`
    background-color: transparent;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
        color: #c0c0c0;
    }
`

export const CustomAnchorEl = styled.a`
  font-weight: 700;
  
  &:hover {
    text-decoration: underline;
  }
`

export const InfoSpan = styled.span`
  opacity: 0.4;
  
  &:hover {
    opacity: 1;
  }
`

export const VerifyBtn = styled.button`
  padding: 0.2rem 0.5rem;
  outline: none;
  cursor: pointer;
  background-color: blue;
  color: #fff;
  border-radius: 50px;
  font-size: 12px;
  border: 1px solid blue;
  
  &:hover {
    background-color: transparent;
    color: #000;
  }
`


// custom input
export const InputHighlighter = keyframes`
    from {
        background: #1e96fc;
    }

    to {
        width: 0;
        background: transparent;
    }
`

export const Group = styled.div`
  position: relative;
  width: 100%;
  /* min-width: 250px; */
  height: 100%;
  min-height: 50px;
  /* flex-grow: 1; */
  /* padding: 5px 10px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const Input = styled.input`
  /* font-size: 14px; */
  padding: 10px;
  display: flex;
  width: 100%;
  border: none;
  border-bottom: 1px solid #9eb3c2;
  background: transparent;
  outline: none;
  color: #03045E;

  &:focus ~ label,
  &:valid ~ label {
    top: -5px;
    font-size: 12px;
    /* color: #5264ae; */
  }
`

export const Label = styled.label`
  /* color: #000; */
  /* font-size: 12px; */
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 15px;
  transition: 0.2s ease all;
  text-transform: capitalize;
  display: flex;
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
    background: #1e96fc;
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

export const ShowPasswordIcon = styled.button`
    position: absolute;
    background-color: transparent;
    border: none;
    left: 95%;
    padding: 5px;
    margin: 0;
    border-radius: 50%;
    color: #4361ee;
    
    &:hover{
        /* background: rgba(255, 255, 255, 0.1 ); */
    }
`