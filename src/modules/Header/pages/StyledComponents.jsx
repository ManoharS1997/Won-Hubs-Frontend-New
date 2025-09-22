import styled from 'styled-components'

export const HeaderContainer = styled.header`
    /* position: fixed; */
    width: 100vw;
    height: 7vh;
    padding: 0px 2.5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin: 0px;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    /* z-index: 999; */
    /* border-bottom: 1px solid #325270; */
    box-shadow: 2px 0px 4px 1px #325270;
`

export const LogoContainer = styled.div`
    /* width: fit-content; */
    width: 10vw;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0px;
    /* background-color: white; */
    border-radius: 5px;

    @media (max-width:576px){
        display: none;
    }
`

export const CompanyLogo = styled.img`
    height: 100%;
    width: fit-content;
`

export const ManagerHead = styled.h1`
    font-size: x-large;
    color: #099605;
`

export const SearchResultsContainer = styled.div`
    width: inherit;
    height: 30vh;
    position: absolute;
    display: none;
    flex-direction: column;
    transform: translate(-10%, 65%);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.2rem 0.1rem rgba(0,0,0,0.2);
    z-index: 1;
    
    /* From https://css.glass */
    background-color: var(--background-color);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.4px);
    -webkit-backdrop-filter: blur(11.4px);
    border: 1px solid rgba(4, 28, 117, 0.3);
`

export const SearchContainer = styled.div`
    width: 35%;
    height: 70%;
    border: 1px solid var(--secondary-color);
    border-radius: 500px;
    display: flex;
    padding: 5px 10px;
    color: inherit;
    align-items: center;
    
    &:focus-within ${SearchResultsContainer} {
        display: block;
    }

`

export const SearchInput = styled.input`
    width: 80%;
    height: 100%;
    outline: none;
    border-style: none;
    background-color: transparent;
    padding: 0px 10px;
    color: inherit;
    flex-grow: 1;
    caret-color: var(--secondary-color);
    caret-shape: underscore !important;   
`

export const SubmitButton = styled.button`
    width: fit-content;
    height: 100%;
    align-self: center;
    outline: none;
    background-color: transparent;
    border-style: none;
    border-radius: 30px ;
    cursor: pointer;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
`

export const ClearSearch = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: fit-content;
    background-color: transparent;
    color: inherit;
    outline: none;
    border-style: none;
    padding: 0px;
`

export const SearchAndNavButtonsContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid red; */
`

export const OptionsContainer = styled.div`
    display: flex;
    width: fit-content;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 12px ;
    /* z-index: 1; */
`

export const NavOption = styled.p`
    /* color: #FFFFFF; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* min-width: 100px; */
    padding: 5px 15px;
    margin: 0px;
    cursor: pointer;
    
    &:hover {
        border-radius: 0px;
        background-color: var(--secondary-color);
        color: var(--primary-color);
    }
`

export const NavIcon = styled.span`
    width: fit-content;
`

export const OptionText = styled.span`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
`

export const OptionContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
`

export const TooltipText = styled.div`
    display: none;
    position: absolute;
    background-color: #343a40;
    /* color: #fff; */
    padding: 2px;
    border-radius: 5px;
    z-index: 1;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    margin-top: 10px;
    min-width: 70px;
    text-align: center;
    
    /* overlay: {
        background-color: rgba(0,0,0,0.5);
    } */
`

export const CustomToolTip = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &:hover {
        .tooltiptext {
            display: block;
        }
    }
`

export const MyTicketsWraper = styled.div`
    position: relative;
    height: 100%;
    padding: 5px 10px;
     
    &:hover {
        background-color:  var(--secondary-color);
        color:   var(--primary-color);
    }
`

export const MyTicketsBtn = styled.button`
    background-color: transparent;
    color: inherit;
    outline: none;
    border-style: none;
    margin: 0px;
    padding: 5px;
    width: 100%;
    height: 100%;
   
`

export const MyTicketsDropdown = styled.div`
    width: max-content;
    height: fit-content;
    border-radius: 5px;
    color: #FFFFFF;
    display: none;
    background-color: #284B63;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 4px;
    
    ${MyTicketsWraper}:hover & {
        display: block;
        translate: 0%;
    }
`

export const CustomOption = styled.li`
    padding: 5px;
    list-style: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFFFFF;
    cursor: pointer;
    &:hover {
        background-color: #d9d9d9;
        color: #353535;
    }
`

export const CustomBtn = styled.button`
    background-color: inherit;
    color: inherit;
    padding: 0px 10px;
    margin: 0px;
    border-radius: 15px;
    height: 100%;
    width: fit-content;
    flex-grow: 1;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: flex-start;
`

export const SwitchUserBtn = styled.button`
    background-color: #004e98;
    color: #fff;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    width: fit-content;
`

//  My Profile styles
export const ThemesPopupContent = styled.div`    
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 1px 0px;
    padding: 10px;
    overflow: hidden;
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

export const CustomUl = styled.ul`
    padding-left: 0px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px;
    row-gap: 10px;
    column-gap: 10px;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 15px;
`

export const CustomLi = styled.li`
    width: 143px;
    height: 120px;
    border-radius: 10px;
    padding: 0px;
    box-shadow: 0px 2px 1px 0px;
    &:hover {
        translate: 0 -10px;
        box-shadow: 0 0 20px 5px #db7f8e;
    }
`

export const ThemeBtn = styled.button` 
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.themeBackground};
    color: ${(props) => props.textColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    outline: none;
    border-style: none;
    font-size: 12px;
`

export const MyProfilePopupContainer = styled.div`
    width: 100;
    position: fixed;
    height: fit-content;
    top: 7%;
    left: 80%;
    right: 1%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 1px 0px;
    padding: 15px;
`

export const MyProfileHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px; 
`

export const UseId = styled.h1`
    font-size:14px;
    margin: 0px;
    text-align: right;
`

export const CloseBtn = styled.button`
    padding: 2px;
    border-radius: 50%;
    background-color: #fff;
    color: #000;

    &:hover {
        background-color: red;
        color: #fff;
        outline: none;
    }
    
`

export const MyProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0pc;
`

export const ProfileInitialCon = styled.div`
    background-color: #b374ad;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

`

export const ProfileInitialLabel = styled.label`
    padding: 10px 0px 10px 18px;
    font-size: 20px;
    align-self: center;
`

export const ProfileInitialEditBtn = styled.button`
    padding: 0px 0px 1px 1px;
    height: 18px;
    width: 18px;
    background-color: #3d3b3d;
    color: #fff;
    align-self: flex-end;
    border-radius: 50%;
`

export const GreetingMsg = styled.h1`
    font-size: 23px;
    padding: 0;
    margin: 2px;
`

export const ManageAccountBtn = styled.button`
    border: 1px solid #dedcde;
    width: 90%;
    border-radius: 30px;
    color: #7238ba;
    background-color: #fff;
`

export const LogOutBtn = styled.button`
    background-color: inherit;
    color: #000;
    width: 30%;
    padding: 5px;
    border-radius: 10px;
    align-self: flex-start;
`

export const PopupContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    height: 15%;
    width: 20%;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 3px 3px 3px 3px;
`

export const MyProfilePopupContent = styled.div`    
    width: 100;
    position: fixed;
    height: fit-content;
    top: 7%;
    left: 80%;
    right: 1%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 1px 0px;
    padding: 15px;
`

export const SettingsBtn = styled.button`
    background-color: inherit;
    border-style: none;
    align-self: flex-start;
    color: #000;
`

export const SettingsList = styled.ul`
    padding-left: 15px;
    list-style: none;
    display: ${(props) => props.show ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: 0px 0px 0px 30px;
    
`

export const SettingItem = styled.li`
    width: 100%;
    font-size: 12px;
    &:hover {
        color: #004e98;
    }
`

export const ManageAccountPopUp = styled.div`
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 1px 0px;
    padding: 10px;
    overflow: hidden;
`

export const CloseManageAccountBtn = styled.button`
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

export const ManageAccountContent = styled.div`
    height: 90%;
    flex-grow:1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    
`

export const CustomLabel = styled.p`
    text-align: left;
    margin: 0px;
    font-size: 12px;
    color: #000000;
`

export const CustomUpdate = styled.div`
    border: 1px solid #ccc;
    height: 30px;
    width: 90%;
    border-radius:5px;
    padding: 4px;
    display: flex;
    justify-content: space-between;
`

export const CustomContainer = styled.div`
    height: fit-content;
    width:60%;
    margin-bottom: 8px;
`

export const CustomVerifyContainer = styled.div`
    height: 30px;
    display: flex;
    align-items: center;


    
`

export const CustomInput = styled.input`
    width: 70%;
    outline: none;
    border: none;
    margin-left: 4px;
`

export const UpdateBtn = styled.button`
    display: flex;
    align-items: center;
    color: green;
    background-color: #75c9c8;
    width: fit-content;
    padding: 5px;
    border-radius: 4px;
    border: none;
`

export const CustomSelect = styled.div`
    height: fit-content;
    width: fit-content;
    border-radius: 10px;
    background-color: #fff;
    color: #000;
    
    
    .dropdown-toggle {
        background-color: #595959;
        color: #FFF;
        padding-top: 4px;
    }
    
    .dropdown-item {
        &:hover {
            background-color: #D9D9D9;
        }
    }
    .btn{
        height: 20px;
        border-radius: 2px;
        padding: 3px;
        background-color: #fff;
        color: #000;
        border: none;
        text-align: center;
        
    }
`

export const CustomA = styled.a`
    background-color: 'blue' !important;
    width: 100%;
    font-size: 10px;
`

export const UlElement = styled.ul`
    width: fit-content;

`

export const AnchorElement = styled.a`
`

export const LiElement = styled.li`
`

export const Code = styled.p`
    color: #000;
    width: fit-content;
    font-size: 10px;
    text-align: center;
    padding: 3.5px;
    margin: 0px;

`

export const AutoCorrectionsContainer = styled.button`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    border-radius: 15px;
    background-color: #fff;
    border: none;
    margin-right: 15px;
    outline: none;
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

export const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
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

export const FavouriteIconBtn = styled.button`
    background-color: transparent;
    padding: 0px;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    border-style: none;
`