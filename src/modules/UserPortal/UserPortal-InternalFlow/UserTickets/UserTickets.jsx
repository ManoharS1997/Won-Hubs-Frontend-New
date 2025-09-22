import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

// icon imports
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoHeartSharp } from "react-icons/io5";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

//Component imports
import LeftNav from "../../LeftNav/pages/LeftNav.jsx";
import WonContext from "../../../../context/WonContext.jsx";
import Chatbot from '../Chat/Chat.jsx'
import { UserTicketsData as Data } from "../../../../DataFile/DefaultDataFile.jsx";

import {
    ActionsContainer, BackBtn, BodyContainer, ContentContainer, CustomContainer,
    CustomP, DropdownMenu, DropdownToggle, FavouriteIconBtn, HeaderContainer,
    IdAndFavoutrite, MenuItem, MultiLevelDropdownContainer, RedirectBtn,
    SearchInput, SubMenu, SubMenuItem, TicketCard, TicketId, TicketsList,
    TitleContainer, UserTicketsContainer

} from './StyledComponents'

export default function UserTickets() {
    const history = useNavigate();
    const [MyticketsData, updateMyTicketsData] = useState(Data)
    const [actionsOnSelectedRows, setActionsOnSelectedRows] = useState('')
    const [searchingText, setSearchingText] = useState('') //state for search bar

    const SelectedRowActionsList = ['Delete', 'Mark As Favorite', 'Move', 'Copy']

    useEffect(() => {
        const fetchTicketsData = async () => {
            const url = `${import.meta.env.VITE_HOSTED_API_URL}/table/ticket`
            try {
                const response = await fetch(url, { method: 'GET' });
                const data = await response.json();
                updateMyTicketsData(data.ticket)
            } catch (error) {
                console.log('Error fetching ticket data:', error)
            }
        };

        fetchTicketsData();
    }, []);

    const filteredData = () => {
        let result = []
        if (searchingText.trim() !== '') {
            result = MyticketsData.filter((item) =>
                Object.values(item).some((value) => {
                    const stringValue = value !== null && value !== undefined ? value.toString().toLowerCase() : '';
                    return stringValue.includes(searchingText.toLowerCase());
                })
            );
        }

        return MyticketsData;
    };

    const OnBack = () => {
        // Navigate to a specific route
        history('/user/home');
    };

    const toggleFavourite = (e) => {
        const id = e.currentTarget.parentNode.id
        console.log(e.currentTarget.parentNode.id)
        const updatedData = Data.map(item => {
            console.log(item.ticket_no.toString() === id)
            if (item.ticket_no.toString() === id) {
                // console.log(item.isFavourite)
                return (
                    { ...item, isFavourite: (item.isFavourite === undefined ? true : !item.isFavourite) }
                )
            }
            return item
        })
        // updateTicketsData(updatedData)
    }

    //to perform actions on selected rows 
    const OnSelectedRowActions = (event) => setActionsOnSelectedRows(event.target.value)

    // handling searching text on change
    const onChangeSearchText = (e) => {
        const newText = e.target.value;
        setSearchingText(newText);
    };

    // console.log(MyticketsData)

    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen } = value

                return (
                    <UserTicketsContainer>
                        <BodyContainer>
                            <CustomContainer>
                                <ContentContainer>
                                    <HeaderContainer>
                                        <TitleContainer>
                                            <BackBtn onClick={OnBack}>
                                                <IoIosArrowBack size={26} />
                                            </BackBtn>

                                            <MultiLevelDropdownContainer>
                                                <DropdownToggle>My Tickets</DropdownToggle>
                                                <DropdownMenu>
                                                    <MenuItem>
                                                        Export
                                                        <IoIosArrowForward className="plus" />
                                                        <SubMenu>
                                                            <SubMenuItem>PDF</SubMenuItem>
                                                            <SubMenuItem>CSV</SubMenuItem>
                                                            <SubMenuItem>Excel</SubMenuItem>
                                                        </SubMenu>
                                                    </MenuItem>
                                                    <MenuItem>Selected Row Actions
                                                        <IoIosArrowForward className="plus" />
                                                        <SubMenu>
                                                            {SelectedRowActionsList.map((each) => (
                                                                <SubMenuItem key={each} onClick={OnSelectedRowActions} href="#">{each}</SubMenuItem>
                                                            ))}
                                                            <SubMenuItem>Delete</SubMenuItem>
                                                            <SubMenuItem>Mark As Favorite</SubMenuItem>
                                                            <SubMenuItem>Move</SubMenuItem>
                                                            <SubMenuItem>Copy</SubMenuItem>
                                                        </SubMenu>
                                                    </MenuItem>

                                                    <Link to='/create-department'>
                                                        <MenuItem >
                                                            Create New
                                                            <GoPlus className="plus" />
                                                        </MenuItem>
                                                    </Link>
                                                </DropdownMenu>
                                            </MultiLevelDropdownContainer>

                                        </TitleContainer>

                                        <ActionsContainer>
                                            <SearchInput type="text" placeholder="Search" onChange={onChangeSearchText} value={searchingText} />
                                        </ActionsContainer>
                                    </HeaderContainer>

                                    <TicketsList>
                                        {filteredData().map(item => (
                                            <TicketCard key={item.id}>
                                                <IdAndFavoutrite id={item.id}>
                                                    <TicketId>{item.id ? item.id : "--"}</TicketId>

                                                    <FavouriteIconBtn type="button" id={item.ticket_id} onClick={toggleFavourite}>
                                                        {item.isFavourite === false ? (<CiHeart style={{ width: '100%', height: '100%' }} id={item.id} />) : (<IoHeartSharp style={{ width: '100%', height: '100%', color: 'red' }} id={item.id} />)}
                                                    </FavouriteIconBtn>
                                                </IdAndFavoutrite>

                                                <CustomP>Priority: {item.priority ? item.priority : 'Low'}</CustomP>
                                                <CustomP>Department: {item.department}</CustomP>
                                                <CustomP>Assigned Member: {item.assigned_members ? item.assigned_members : '--'}</CustomP>
                                                <CustomP>Status: {item.status}</CustomP>
                                                <RedirectBtn type="button"> <Link to={`/user/ticket/${item.id}`} ><FaRegArrowAltCircleRight style={{ width: '100%', height: '100%' }} /></Link></RedirectBtn>
                                            </TicketCard>
                                        ))}

                                    </TicketsList>

                                </ContentContainer>
                            </CustomContainer>
                        </BodyContainer>
                        {isChatBotOpen && <Chatbot />}
                    </UserTicketsContainer>
                )
            }}
        </WonContext.Consumer>
    )
}

