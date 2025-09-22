import styled, { keyframes } from 'styled-components';

// Define keyframe animation
const slideInAnimation = keyframes`
    from {
        transform: translateX(10%);
    }
    to {
        transform: translateX(0%);
    }
`;

export const MainContainer = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
`

export const BodyContainer = styled.div `
    width: 100%;
    height: 93vh;
    margin-top: 7vh;
    display: flex;
`

export const ContentContainer = styled.div `
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #d9d9d9;
    
`

export const CustomContainer = styled.div `
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow: hidden;

`

export const BackBtn = styled.button `
    width: fit-content;
    background-color: transparent;
    padding: 0px;
    margin: 15px 15px;
    display: flex;
    align-items: center;
    color: #000000;
    outline: none;
    border-style: none;
`

export const DefaultFieldlsContainer = styled.div `
    width: 100%;
    height: fit-content;
    padding: 15px;
    display: flex;
    justify-content: space-around;
`

export const FieldsContainer = styled.div `
    width: 50%;
    height: fit-content;
    display: flex;
    flex-direction: column;
`

export const FieldContainer = styled.div `
    display: flex;
    width: 100%;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 13px;
`

export const CustomLabel = styled.label `
    width: 50%;
    text-align: right;
    padding-right: 15px;
`

export const CustomInput = styled.input `
    background-color: transparent;
    color: #000000;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #bfc0c0;
    outline: none;
    padding: 6px;
`

export const CheckboxLabel = styled.label `
    /* padding-right: 15px; */
    /* padding: 6px; */
    width: 50%;
    text-align: right;
    padding-right: 15px;
`

export const CustomSelect = styled.select `  
    background-color: #FFFFFF;
    color: #000000;
    padding: 5px;
    border: 1px solid #bfc0c0;
    border-radius: 5px;
    cursor: pointer;
`

export const CustomOption = styled.option `
`

export const ActionBtnsContainer = styled.div `
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 15px;
    padding: 15px 30px;
`

export const ActionBtn = styled.button `
    min-width: 100px;
    width: fit-content;
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

export const EditorContainer = styled.div `
    width: 80vw; 
    height: 76vh;
    /* overflow-y: auto; */
    padding: 15px;
    display: flex;
    align-self: center;
    flex-wrap: 1;
    flex-direction: column;
`

export const ShareOptionsContainer = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: 0px;
    position: relative; 
`

export const ShareOptionBtn = styled.button `
    width: 100%;
    padding: 8px 15px;
    border-radius: 35px;
    background-color: inherit;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-style: none;
    
    &:hover {
        background-color: #284b63;
        color: #FFFFFF;
    }
`

export const ExportOptionsContainer = styled.div `
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #FFFFFF;
    border-radius: 15px;
    position: fixed;
    right: 15%;
    bottom: 9%;
    
    overflow: hidden;
    display: none;

    /* Apply animation when slide-in class is added */
    &.slide-in {
        display: flex;
        animation: ${slideInAnimation} 0.5s forwards;
    }

`

export const ExportOptionBtn = styled(ShareOptionBtn) `
    padding: 9px 15px;
`