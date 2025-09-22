import styled from "styled-components";

export const EventFieldList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: auto auto;
    gap: 1.5rem;
    padding: 1.5rem;
`

export const EventFieldContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`

export const FieldLabel = styled.label`
    position: absolute;
    padding: 0 0.5rem;
    background-color: #fff;
    transform: translate(0.8rem, -60%);
    font-size: 0.725rem;
`

export const FieldInput = styled.input`
    padding: 0.5rem;
    outline: none;
    border-radius: 0.5rem;
    border: 2px solid #d1d8e3;
    
    &:focus{
        border-color: #022a6b;
    }
`

export const UpdateBtn = styled.button`
    padding: 0.5rem 0.8rem;
    border-radius: 50px;
    outline: none;
    border: none;
    background-color: #013a94;
    color: #fff;
    display: ${({ show }) => show ? 'flex' : 'none'};
    
    &:hover {
        box-shadow: inset 0 0 0.1rem 0.1rem #fff,
            0 0 2px 2px #013a94,
            0 0 0.2rem 0.2rem #ccc;
    }
`