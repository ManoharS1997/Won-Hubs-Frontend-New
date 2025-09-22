import styled from "styled-components";

export const ActionBtn = styled.button `
    width: 90px;
    background-color: transparent;
    color: #FFFFFF;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        box-shadow:
        inset 0 -3em 3em rgb(0 200 0 / 10%),
        0 0 0 2px white,
        2px 2px 1.2em #333533;
    }
`

export const ActionBtnsContainer = styled.div `
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 15px;
    padding: 15px 30px;
`

export const BackBtn = styled.button `
    width: fit-content;
    background-color: transparent;
    padding: 0px;
    margin: 8px 15px;
    display: flex;
    align-items: center;
    color: #000000;
    outline: none;
    border-style: none;
`

export const BodyContainer = styled.div `
    width: 100vw;
    height: 93vh;
    margin-top: 7vh;
    display: flex;
`

export const ContentPreviewContainer = styled.div `
    width: 80%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 1px;
    margin: auto;
    padding: 15px;
`

export const CustomContainer = styled.div `
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

export const MainContainer = styled.div `
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
`
