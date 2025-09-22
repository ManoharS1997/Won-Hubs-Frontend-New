import styled,{ keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const scaleUp = keyframes`
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
`;

export const HomeCon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
`

export const HomeDashCon = styled.div `
    background-color: #fff;
    width: 83vw;
    flex-grow: 1;
    padding: 15px;
    overflow-y: auto;
    height: 100%;
`

export const CustomContainer = styled.div `
    width: 100%;
    height: 93vh;
    margin-top: 7vh;
    display: flex;
`

export const Heading = styled.h1`
    font-size: 25px;
    display: flex;
    align-items: center;
    font-weight: bold;

`

export const FavouriteListContainer = styled.div`
    background-color: #D9D9D9;
    min-height: 93%;
    width: 100%;
`

export const Cards = styled.ul`
    display: flex;
    flex-wrap: wrap ;
    column-gap: 13px;
    row-gap: 13px;
    height: fit-content;
    max-height: 78vh;
    width: 100%;
    overflow-y: auto;
    animation: ${fadeIn} 0.5s ease-in-out;
    padding-left: 0px;
    margin-top: 10px;

    &::-webkit-scrollbar{
        width: 5px;
    }
`

export const Card = styled.li`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: 180px;
    background: #cbc0d3;
    border-radius: 10px;
    padding: 15px;
    transition: 0.3s;
    border: 2px solid transparent;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: ${scaleUp} 0.5s ease-in-out;

    &:hover {
        transform: scale(0.95);
    }
`

export const CardHead = styled.div`
    display: flex;
    justify-content: space-between;

`

export const FevCount = styled.span`

`

export const HeaderTag = styled.h1`
    font-size: 1em;
`

export const HeartBtn = styled.button`
    background: transparent;
    padding: 0px;
    margin: 0px;
    height: fit-content;
    width: fit-content;
    display: flex;
    align-items: center;
    border: none;
    outline: none;
`;

export const ParaTag = styled.p`
    font-size: 1em;
    margin: 1px;
`

export const ArrowBtn = styled.button`
    background: transparent;
    align-self: flex-end;
    width: 25px;
    height: 25px;
    border: none;
    outline: none;
    margin: 0px;
    padding: 0px;
`

export const ThemesPopupContent = styled.div`    
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    overflow: hidden;
    
`

export const CloseThemeBtn = styled.button`
    margin-left: auto;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    color: #000;
    outline: none;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;
    
    &:hover {
        background-color: red;
        color: #FFFFFF;
    }
`