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
    background-color: var(--background-color);
`

export const CardsContainer = styled.ul `
    padding-left: 0px;
    padding: 15px;
    background-color: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 15px;
    border-radius: 15px;
    width: 100%;
`

export const Card = styled.li `
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 200px;
    font-weight: 700;
    background-color: #cce3de;
    background-image: url(${(props => props.bg ? props.bg : 'none')});
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
    
    border: 2px solid #1985a1;
    
    &:hover {
        border-color: #db7f8e;
        opacity: 1;
        transition: opacity 0.3s ease; 
    }
`

export const PopupContainer = styled.div `
    width: 100%;
    height: 95%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 15px;
    
    &::-webkit-scrollbar{
        width: 7px;
    }
`

export const CategoryTitle = styled.h3 ``


export const TemplatesList = styled.ul `
    padding-left: 0px;
    list-style: 0px;
    display: flex;
    row-gap: 18px;
    column-gap: 18px;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
`

export const TemplateItem = styled.li `
    width: 110px;
    min-height: 150px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    /* background-color: #e8e8e4; */
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    /* padding-bottom: 10px; */
    text-align: center;
    /* background-image: url('https://res.cloudinary.com/drtguvwir/image/upload/v1706784350/WON-Platform-Images/z96pynq441h85cprby4r.png');
    background-position: center ;
    background-size: cover; */ 
    
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
`

export const TemplateImage = styled.img `
    width: 100%;
    height: 90%;
    border-radius: 8px 8px 0px 0px;
`

export const TemplateTitle = styled.p `
    padding: 5px;
    font-size: 12px;
`

export const ClosePopupBtn = styled.button `
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    color: #e5383b;
    justify-content: center;
    background-color: #FFFFFF;
    border-style: none;
    margin-left: auto;
    
    &:hover {
        background-color: #e5383b;
        color: #FFFFFF;
    }
`