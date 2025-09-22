import styled, { keyframes } from "styled-components";

// const bgImage = 'https://res.cloudinary.com/drtguvwir/image/upload/v1711710075/WON-Platform-Images/yz1fa8nnbsaemqleeutr.jpg';

export const MainContainer = styled.div`
    width: 100vw;
    height: fit-content;
    background-color: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding: 0;
    margin: 0;
    row-gap: 10px;
    
    &::-webkit-scrollbar {
        display: none;
    }
`

export const TickerAndLoginform = styled.div`
    width: 100vw;
    height: 102vh;
    background-color: #fff;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: auto;
    padding: 0;
    margin: 0;
    padding: 1% 0 2% 0;

    @media (max-width: 576px) {
        height: 70vh;
    }
`

export const LogoAndFormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5%;
    padding: 2%;

     @media (max-width: 576px) {
        height: fit-content;
        gap: 1.5rem;
    }
`

export const Ticker = styled.div`
    width: 50%;
    height: 100%;
    background-color: #00A9FF;
    border-radius: 0 10% 10% 0;
    color: #03045E;
    display: flex;
    flex-direction: column;
    row-gap: 5%;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px 1px #03045E;
    padding: 10px;

     @media (max-width: 576px) {
        display: none;
    }
`

export const LogoImg = styled.img`
    width: fit-content;
    height: 15%;
`

export const LoginForm = styled.form`
    width: 100%;
    height: fit-content;
    border-radius: 10px;
    padding: 2%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    gap: 1rem;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 16px;
    
    /* From https://css.glass */
   /* From https://css.glass */
    background: rgba(255, 255, 255, 0.39);
    border-radius: 16px;
    box-shadow: 0px 0px 10px 1px #ccc;
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(255, 255, 255, 0.3);

     @media (max-width: 576px) {
        width: 95%;
    }
`

export const LogoImage = styled.img`
    width: 15%;
    height: fit-content;
    align-self: center ;
    position: absolute;
    top: 15%;

     @media (max-width: 576px) {
        position: relative;
        width: 50%;
        top: 0%;
    }
`

export const Title = styled.h1`
    font-size: 2.2rem;
    text-align: left;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: flex-end;
    width: fit-content;
`

export const TitleSpan = styled.span`
    font-size: 12px;
    font-weight: normal;
    margin: 0 10px;
    padding: 5px 0px;
`

export const FieldsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`

export const FieldContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 15px;
`

export const CustomLabel = styled.label`
    width: 25%;
    font-weight: 600;
    text-align: right;
`

export const HighlightText = styled.span`
    /* font-size: 20px; */
    color: #90caf9;
`

export const CustomInput = styled.input`
    background-color: #fff;
    color: #0466c8;
    padding: 10px;
    border-radius: 5px;
    flex-grow: 1;
    outline: none;
    border: 1px solid #ccc;
`

export const CustomCheckbox = styled.input`
    background-color: #fff;
    color: #000;
    width: 15px;
    margin-right: 15px;
`

export const MoreOptions = styled.p`
    width: fit-content;
    font-size: 12px;
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

export const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: flex-end; */
    column-gap: 15px;
`

export const RegisterBtn = styled.button`
    background-color: transparent;
    padding: 0.3rem 1rem;
    margin: 0;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 100px;
    
    &:hover {
        color: #0077B6;
        box-shadow: 0px 0px 0.2rem 0.1rem #ccc;
    }
`

export const LoginBtn = styled.button`
    width: fit-content;
    align-self: flex-end;
    margin: 0 0 0 auto;
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

     @media (max-width: 576px) {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        gap: 0.5rem;
    }
`

export const EyeIcon = styled.span`
    
`

export const FooterSection = styled.footer`
    width: 100vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
    margin: 0;
    /* background-color: #000;
    color: #fff; */
`

export const VerifyBtn = styled.button`
  padding: 0.2rem 0.5rem;
  outline: none;
  cursor: pointer;
  background-color: #3f37c9;
  color: #fff;
  border-radius: 50px;
  font-size: 12px;
  border: 1px solid blue;
  width: fit-content;
  
  &:hover {
    background-color: transparent;
    color: #000;
  }
`

export const OtherOptionsContainer = styled.div`
    width: fit-content;
    max-width: 100%;
    /* height: ${({ needOtherOptions }) => needOtherOptions ? '90px' : '0px'}; */
    height: fit-content;
    display: flex;
    flex-direction: row;
    gap: 6px;
    font-size: 13px;
    padding: 5px;
    margin: 0;
    border-radius: 0px;
    /* background-color: aliceblue; */
    
    transition: height 0.5s ease;
    overflow: hidden;
`;

export const OtherOptSpan = styled.span`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    
    &:hover {
        /* background-color: #f0f0f0; */
        box-shadow: 0px 0px 4px 1px #ccc;
        text-decoration: underline;
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
  /* width: 100%; */
  min-width: 250px;
  height: 100%;
  min-height: 50px;
  flex-grow: 1;
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
