import styled from "styled-components";

export const MainContainer = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
`

export const BodyContainer = styled.div `
    width: 100%;
    height: 100%;
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
    /* overflow-y: auto; */
    padding: 15px;
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
    width: 65vw; 
    height: fit-content;
    column-gap: 25px;
    display: flex;
    align-self: center;
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
    /* justify-content: space-between; */
    align-items: center;
    margin-bottom: 13px;
    column-gap: 10px;
`

export const CustomLabel = styled.label `
    width: 25%;
    text-align: ${({right})=> right===true ? 'right' : 'left'};
    /* padding-right: 15px; */
`

export const CustomInput = styled.input `
    background-color: transparent;
    color: #000000;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #bfc0c0;
    outline: none;
    padding: 6px;
    width: 60%;
    flex-grow: 1;
    cursor: pointer;
`

export const CheckboxLabel = styled.label `
    /* padding-right: 15px; */
    /* padding: 6px; */
    width: 25%;
    text-align: right;
    /* padding-right: 10px; */
`

export const CustomSelect = styled.select `  
    background-color: #FFFFFF;
    color: #000000;
    padding: 5px;
    border: 1px solid #bfc0c0;
    border-radius: 5px;
    cursor: pointer;
    width: 70%;
    flex-grow: 1;
`

export const CustomTextarea = styled.textarea `
    width: fit-content;
    flex-grow: 1;
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #000000;
    padding: 5px;
`

export const CustomOption = styled.option `
`

export const ActionBtnsContainer = styled.div `
    height: fit-content;
    width: 65vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 15px;
    margin-top: auto;
    margin-bottom: 5px;
    align-self: center;

    /* border: 1px solid; */
`

export const ActionBtn = styled.button `
    /* min-width: 100px; */
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
    width: 65vw; 
    height: 62vh;
    /* overflow-y: auto; */
    padding: 15px 0px;
    display: flex;
    align-self: center;
    flex-wrap: 1;
    flex-direction: column;
`



export const CloseFullViewBtn = styled.button `
    width: fit-content;
    height: fit-content;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    color: #e5383b;
    border-style: none;
    
    &:hover {
        background-color: #e5383b;
        color: #FFFFFF;
    }
`

// sidebar styles

export const SidebarContainer = styled.div `
    width: 17vw;
    /* height: 90vh; */
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #353535;
    color: #FFFFFF;
    overflow-y: auto;
`

export const CustomHeading = styled.h2 `
    text-align: center;
`

export const FieldsList = styled.ul `
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const AddFieldBtn = styled.button `
    padding: 10px;
    width: 100%;
    height: fit-content;
    background-color: #000000;
    outline: none;
    border-style: none;
    color: #FFFFFF;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    
    &:hover {
        border-color: #004e98;
    }
` 

export const AddIcon = styled.span `
    background-color: transparent;
    padding: 0px;
    width: fit-content;
    height: 100%;
`

export const TextEditorCustomContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
    border: 1px solid #f3f3f3;
    margin: 0px;
    overflow-y: auto;
    position: relative;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`

export const ExpandBtn = styled.button `
    width: fit-content;
    height: fit-content;
    padding: 5px;
    align-self: flex-end;
    background-color: rgba(255, 255, 255, 0.5);
    color: #000000;
    margin: 5px;
    position: absolute;
    left: 96%;
    bottom: 0%;
    font-weight: 700;
    border-style: none;
    cursor: pointer;
    border-radius: 50%;
`