import styled, { keyframes } from "styled-components";

const slideRight = keyframes`
    from {
        transform: translateX(-75%);
    }
    to {
        transform: translateX(0);
    }
`
const slideLeft = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-75%);
    }
`
export const NavOptionsBackdrop = styled.div`
  width: 100vw;
  height: 102%;
  font-weight: normal;
  list-style: none;
  display: ${({ show }) => (show === true ? "flex" : "none")};
  margin: 0px;
  padding: 0px;
  flex-direction: column;

  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  
  /* From https://css.glass */
    background: rgba(10, 10, 10, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.9px);
    -webkit-backdrop-filter: blur(6.9px);
`
export const OptionsList = styled.nav`
  padding: 0.3rem 0.5rem;
  height: 93vh;
  width: ${({ show }) => show === true ? '15vw' : '57.6px'};
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color:  var(--primary-color);
  left: 0;
  transition: width 0.2s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  gap:  ${({ show }) => show ? '0.3rem' : '0.5rem'};

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* For Firefox */
`;

export const OptionsItem = styled.li`
    font-family: Arial, Helvetica, sans - serif;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: ${({ show }) => show === true ? '100%' : 'fit-content'} ;
    height: ${({ show }) => show === true ? 'fit-content' : 'fit-content'} ;
    padding: ${({ show }) => !show === true ? '0.5rem' : '0.5rem'};
    gap: 0.5rem;
    margin: 0px;
    border-radius: 5px;
    color: ${(props) => (props.active ? "var(--text-color)" : "#fff")};
    background-color: ${(props) => (props.active ? "var(--background-color)" : "none")};
    text-transform: capitalize;
    margin: auto;
    transition: all 0.3s ease;
      
    &:hover {
        background-color: var(--background-color);
        color: var(--text-color);
    
        span svg {
            /* transition: transform 0.5s ease; 
            transform: scale(1.35); */
        }
    }

    @media (min-width: 577px) and (max-width: 768px){
        font-size: smaller;
    }
`
export const OptionLabelContainer = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space - between;
    align-items: center;
`
export const CustomLabel = styled.label`
`
export const SubOptionsList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit - content;
    gap: 10px;
    margin-top: 10px;
    padding: 0 0 0 10px;
`
export const SubOptionItem = styled.a`
cursor: default ;
padding: 2px 10px;
border-radius: 5px;
  
  &:hover {
    background-color: #c7f9cc;
    color: #000;
}
`
export const AdminOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
    height: fit-content;
    background-color: inherit;
    padding: 15px;
    border-radius: 10px;
    margin-top: 10px;
`
export const AdminOptionsBtn = styled.button`
    width: 100%;
    border-style: none;
    outline: none;
    cursor: pointer;
    background-color: inherit;
    color: #ffffff;
    text-align: center;
    font-size: 19px;
    border-bottom: ${(props) =>
        props.showoptions === "true" ? "1px solid grey" : "none"};
    border-radius: 0px;
    padding: 0px;
    border-radius: 5px;
    margin-bottom: 15px;
`
export const CustomUl = styled.ul`
    width: 100%;
    list-style: none;
    font-weight: bold;
    color: #000;
    padding-left: 0px;
    border-radius: 10px;
`
export const CustomLi = styled.li`
    width: 100%;
    list-style: none;
    font-weight: normal;
    color: #ffffff;
    padding: 5px 0px;
    border-radius: 10px;
    border-bottom: ${(props) =>
        props.underline !== undefined ? "1px solid grey" : "none"};
`
export const CustomText = styled(CustomLi)`
    border-radius: 0px;
`
export const CustomA = styled.a`
    width: 100%;
    height: fit-content;
    font-weight: normal;
    color: ${(props) => (props.active ? "#fff" : "#FFFFFF")};
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: ${(props) => (props.active ? "#008000" : "none")};
  
  &:hover {
    color: ${(props) => (props.active ? "#000" : "#000")};
    background-color:  ${(props) =>
        props.active ? "#70e000" : "#c7f9cc"} !important;
}

  .inbox-item {
    background-color: #d9d9d9!important;
    &:hover {
        background-color: #d9d9d9!important;
    }
}
`
export const CustomIcon = styled.span`
    width: 22px;
    height: 22px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`