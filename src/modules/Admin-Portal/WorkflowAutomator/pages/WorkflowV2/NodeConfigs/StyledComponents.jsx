import styled from "styled-components";
import Calendar from 'react-calendar';

export const CalenderContainer = styled.div`
    position: relative;
    width: fit-content;
    align-self: flex-end;
    top: 10%;
    right: 100%;
`

export const CustomDateBtn = styled.button`
    width: 30%;
    padding: 3px;
    border-radius:  5px;
    background: #495057;
    color: #fff;
    margin: 5px;
    padding: 10px 15px;
    border: none;
    
    &:hover {
        background-color: #ccc;
        color: #495057;
    }
`

export const CustomDateContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: ${({ isOpen }) => isOpen ? '0px 0px 4px 2px #38b000 ' : 'none'};
    
    &:focus {
        box-shadow: 0px 0px 4px 2px #38b000;
    }
`

export const CustomSpan = styled.span`
    width: 2px;
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
    background-color: #ccc;
    margin: 0 5px;
    
    &:hover {
        background-color: '#000'
    }
`

export const DatepickersContainer = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    height: 100%;
    background-color: #fff;
    border-radius: 50px;
`

export const MyCalenderContainer = styled.div`
    width: 300px;
    height: 250px;
    font-size: 0.8rem;
    padding: 2px;
    z-index: 1;
    position: absolute;
    left: 18%;
    right: 100%;
`

export const PTag = styled.p`
    width: 80%;
    margin: 0px 0px 0px 6px;
`

export const StyledCalender = styled(Calendar)`
    background: #FFFFFF;
    border-radius: 10px;
    color: #000;
    padding: 3px;
    font-size: 0.8rem;

    .react-calendar { 
        width:100%;
        background-color: #fff;
        color: #000;
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        font-family: Arial, Helvetica, sans-serif;
    }
    .react-calendar__navigation button {
        color: #343a40;
        min-width: 44px;
        background: none;
        font-size: 16px;
        margin-top: 8px;
    }
    .react-calendar__navigation button:enabled{
        font-size: 1rem;
        font-weight: bold;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #dee2e6;
    }
    .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
    }
    abbr[title] {
        text-decoration: none;
    }
    .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    }
    .react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--weekend) {
        color: #000; /* Adjust this color value as needed */
    }
    .not-in-month {
        color: #D9D9D9; 
    }
    .react-calendar__tile--now {
        background: #6f48eb33;
        font-weight: bold;
        color: #6f48eb;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #6f48eb33;
        color: #6f48eb;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #6f48eb;
        color: white;
    }
    .react-calendar__tile--rangeStart {
        border-radius: 6px;
        background: #6f48eb;
        color: white;
    }
`

export const ModalInnerContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: 15px;
    padding: 10px;
`

export const OpenModalBtn = styled.button`
    padding: 10px 15px;
    margin: 0;
    border: none;
    outline: none;
    align-self: flex-start;
    color: #000;
    background-color: #fff;
    border-radius: 50px;
    cursor: pointer;
    
    &:hover {
        color: #38b000;
        box-shadow: 0px 0px 4px 2px #38b000;
    }
`

export const CloseModalBtn = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    align-self: flex-end;
    color: red;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    /* width: 25px;
    height: 25px; */
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: red;
        color: #fff;
    }
`

export const SectionContainer = styled.div`
    width: 100%;
    height: 50vh;
`

export const SectionTitle = styled.h5` 
`

export const SectionList = styled.ul`
    list-style: none;
    display: flex;
    /* grid-template-columns: auto auto auto auto auto auto; */
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
`

export const SectionItem = styled.li`
    width: 200px;
    height: 150px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;background-color: #FFDEE9;
    background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
    text-align: center;
    
    &:hover {
        box-shadow: 0px 0px 10px 1px;
    }
`

export const SelectedContentText = styled.span`
    margin-right: 15px;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #38b000;
    height: 100%;
    display: flex;
    align-items: center;
    
    &:hover {
        border-color: #3f37c9;
    }
`

export const NoDataAvailableContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`