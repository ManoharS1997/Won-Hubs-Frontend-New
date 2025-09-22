import styled from "styled-components";


export const MFAMainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const AuthenticationIconContainer = styled.span`
    /* position: absolute; */
    /* top: 20%; */
`

export const FormContainer = styled.div`
    width: 50%;
    height: fit-content;
`

export const ChooseMFAContainer = styled.div`
    width: 40%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    box-shadow: 0 0 0.2rem 0.1rem #ccc;
    padding: 1rem;
    border-radius: 1rem;
`

export const CardsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 49% 49%;
    /* flex-direction: column; */
    column-gap: 2%;
    row-gap: 1rem;
    align-items: center;
    /* justify-content: center; */
    /* min-width: 10%; */
`

export const ChooseCardContainer = styled.div`
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 10%;
    background-color: #0c87f3;
    color: #FFF;
    text-transform: capitalize;
    font-size: 1rem;
    
    &:hover{
        box-shadow: 0 0 0.2rem 0.1rem #ccc;
        background-color: #6b6b6b;
    }
`

export const ChooseMethodTitle = styled.h3``