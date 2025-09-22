import styled from "styled-components";

export const MFAContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    @media (max-width: 576px){
        padding: 0 10px;
    }
`
export const MFALoginForm = styled.form`
    width: 50vw;
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

    @media (max-width: 576px){
        width: 100%;
    }
`