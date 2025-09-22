import styled from "styled-components";

export const AnnounceCon = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
`

export const Card = styled.li`
    width: 298px;
    min-height: 210px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px;
    background-color: #f4f3ee;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url('https://res.cloudinary.com/drtguvwir/image/upload/v1705900319/WON-Platform-Images/npjet0nreq1jwxaxlttq.jpg');
    color: #FFFFFF;
    background-position: left;
    
    &:hover {
        box-shadow: 0 0 16px 4px #48abe0;
        position: relative;
        transform: scale(2);
        transform: translate(0, -5px);
        transition: all 200ms;
    }
`

export const CardId = styled.span`
    font-size: 20px;
    padding-bottom: 15px;
    font-weight: bold;
`

export const CardsList = styled.ul`
    padding-left: 0px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    column-gap: 10px;
    row-gap: 10px;
    width: 100%;
    height: 80vh;
    max-height: 100%;
    overflow-y: auto;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
    }
`

export const ContentContainer1 = styled.div`
    width: 85vw;
    height: 93vh;
    background: #d9d9d9;
    padding: 10px;
`

export const CustomA = styled.a`
`

export const CustomContainer = styled.div`
    display: flex;
`

export const CustomP = styled.p`
    width: 100%;
    font-size: 13px;
`

export const EventsHead = styled.h1`
    font-size: 25px;
    margin: 0px;
    padding-left: 2%;
    text-align: left;
    margin-bottom: 20px;
`

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`

export const RedirectBtn = styled.button`
    width: 20px;
    height: 20px;
    padding: 0px;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
    color: #FFFFFF;
    margin-left: auto;
    border-style: none;
`