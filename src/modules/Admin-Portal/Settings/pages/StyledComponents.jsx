import styled from "styled-components";

export const AppsPopupContent = styled.div`    
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    /* border-radius: 10px; */
    background-color:  var(--background-color);
    /* box-shadow: 0px 0px 1px 0px; */
    padding: 0px;
    overflow: hidden;
`
export const CloseBtn = styled.button`
    border-radius: 50%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    outline: none;
    border-style: none;
    cursor: pointer;
    margin-right: 0.5rem;

    color: #000;
    &:hover {
        background-color: red;
        color: #fff;
    }
`
export const CloseThemeBtn = styled.button`
    margin-left: auto;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: transparent;
    color: #000;
    outline: none;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;
    &:hover {
        background-color: red;
        color: #FFFFFF;
    }
`
export const CustomHr = styled.hr`
    margin: 0;
`
export const CustomLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
    margin: 0px;
    margin-right: 5px;
    &:hover{
        color: blueviolet;
    }
`
export const CustomLi = styled.li`
    width: 100%;
    height: 150px;
    border-radius: 10px;
    padding: 0px;
    box-shadow: 0px 2px 1px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    /* text-shadow: -2px -2px 1px #cecccc; */

    &:hover {
        box-shadow: 0 0 0.5rem 2px ${({ boxShadow }) => boxShadow ? boxShadow : '#010152'};
        scale: 0.95;
    }
`
export const CustomOption = styled.option`
    background-color: #fff;
`
export const CustomSelect = styled.select`
    padding: 0 0%.5;
    border: 1px solid #cacbcc;
    font-size: 13px;
    font-weight: 600;
    background-color: #fff;
    color: #000;
    outline: none;
    height: 2rem;
    width: fit-content;
`
export const CustomText = styled.span`
    width: fit-content;
    &:hover {
        .tooltip {
            display: block;
        }
    }
`
export const CustomToolTip = styled.div`
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
   width: fit-content;

    &:hover {
        .tooltiptext {
            display: block;
            width: 100%;
        }
    }
`
export const CustomUl = styled.ul`
    padding-left: 0px;
    list-style: none;
    display: grid;
    grid-template-columns: auto auto auto auto;
    flex-wrap: wrap;
    padding: 10px;
    row-gap: 10px;
    column-gap: 10px;
    width: 100%;
    height: fit-content;
    overflow: auto;
    margin: 0px;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`
export const Heading = styled.h1`
    font-size: medium;
    margin: 0px;
    padding: 0 0.5rem;
`
export const SettingContainer = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    width: 80%;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    border: 2px solid transparent;

    &:hover {
        border: 2px solid #85c8ff;
    }
`
export const SettingsContainer = styled.div`
    min-width: 20vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 0px;
    background-color:  var(--background-color);
    color:  var(--text-color);
    /* border: 1px solid #dedede; */
    /* position: absolute; */
    right: 1rem;
    top: 8%;
    z-index: 1;

`
export const SettingsContent = styled.div`
    padding: 1rem;
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.5s;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 5px;
    }

    &:hover::-webkit-scrollbar-thumb {
        background-color: #ccc;
    }
`
export const SettingsHeader = styled.div`
    width: 100% ;
    height: 7%;
    display: flex ;
    align-items:  center ;
    justify-content: space-between ;
    padding: 0 1rem;
`
export const SliderButton = styled.button`
    position: relative;
    width: 10px;
    height: 5px;
    background-color:   ${(props) => (props.active ? '#000' : '#bfbfbf')};
    border: none;
    border-radius: 15px;
    cursor: pointer;
    outline: none;

    &:before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-radius: 50%;
        transition: 0.4s;
        transform: ${(props) => (props.active ? 'translateX(19px)' : 'translateX(0)')};
    }
`
export const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
export const SliderToggleContainer = styled.div`
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background-color: #fff;
`
export const ThemeBtn = styled.button`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.themeBackground};
    color: ${(props) => props.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border-style: none;
    font-size: 12px;
    border-radius: inherit;
`
export const ThemesHeadingBtn = styled.button`
    font-size: 15px;
    margin: 0px;
    background-color: #ffffff;
    color: #353535;
    width: fit-content;
    padding: 5px;
    /* margin-left: 15px; */
    outline: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const TooltipText = styled.div`
    display: none;
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 0px 5px;
    border-radius: 5px;
    z-index: 1;
    top: 100%;
    left: 50%;
    transform: translateX(-60%);
    font-size: 11px;
    margin-top: 5px;
`