import { useState, useEffect } from 'react'

import WonContext from '../../../../context/WonContext';
import ChatBot from '../Chat/Chat'
import LeftNav from '../../LeftNav/pages/LeftNav';

import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import Modal from 'react-modal'
import { ArticlesContent as data } from '../../../../DataFile/DefaultDataFile';

import {
    ArrowBtn, Card, CardHead, Cards, CloseThemeBtn,
    CustomContainer, FevCount, HeaderTag, Heading, HeartBtn,
    HomeCon, HomeDashCon, ParaTag, ThemesPopupContent
} from './StyledComponents'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '10%',
        left: '3%',
        right: '2%',
        bottom: '10%',
        borderRadius: '15px',
        width: '94%',
        height: '80%',
        overflow: 'hidden',
        padding: '5px'
    },
}

const Favourites = () => {
    const [FevTicketsList, setFevTicketsLIst] = useState([])
    const [FevGroupsList, setFevGroupsList] = useState([])
    const [FevIssuesList, setFevIssuesList] = useState([])
    const [isFevTicketsOpen, setFevTickets] = useState(false)
    const [isFevGroupsOpen, setFevGroups] = useState(false)
    const [isFevIssuesOpen, setFevIssues] = useState(false)

    const handleHeartClick = (id, category) => {
        if (category === 'groups') {
            const updatedCards = FevGroupsList.map(card => {
                if (card.id === id) {
                    return { ...card, favorite: false };
                }
                return card;
            });

            setFevGroupsList(updatedCards.filter(card => card.id !== id));
        } else if (category === 'issues') {
            const updatedCards = FevIssuesList.map(card => {
                if (card.id === id) {
                    return { ...card, favorite: false };
                }
                return card;
            });

            setFevIssuesList(updatedCards.filter(card => card.id !== id));
        } else if (category === 'tickets') {
            const updatedCards = FevTicketsList.map(card => {
                if (card.id === id) {
                    return { ...card, favorite: false };
                }
                return card;
            });

            setFevTicketsLIst(updatedCards.filter(card => card.id !== id));
        }
    };

    const ToggleFevTickets = () => setFevTickets(true)

    const closeFevTickets = () => setFevTickets(false)

    const ToggleFevGroups = () => setFevGroups(true)

    const closeFevGroups = () => setFevGroups(false)

    const ToggleFevIssues = () => setFevIssues(true)

    const closeFevIssues = () => setFevIssues(false)

    // category Renders 
    const renderFevTicketsModel = () => {
        return (
            <Modal
                isOpen={isFevTicketsOpen}
                onRequestClose={closeFevTickets}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <ThemesPopupContent className='popup-modal'>
                    <CloseThemeBtn onClick={closeFevTickets}><IoClose size={35} /> </CloseThemeBtn>
                    <Cards>
                        {FevTicketsList.map((card, index) => (
                            <Card key={index}>
                                <CardHead>
                                    <HeaderTag>{card.id}</HeaderTag>
                                    <HeartBtn isFev={card.favorite} onClick={() => handleHeartClick(card.id, card.category)}>
                                        {card.favorite ? <BsSuitHeartFill style={{ color: '#e5383b' }} size={20} /> : <BsSuitHeart size={20} style={{ color: '#fff' }} />}
                                    </HeartBtn>
                                </CardHead>

                                <ParaTag>Dept: {card.department}</ParaTag>
                                <ParaTag>priority: {card.priority}</ParaTag>
                                <ParaTag>Assigned To: {card.assignedTo}</ParaTag>
                                <ParaTag>Status: {card.status}</ParaTag>
                                <ArrowBtn><FaCircleArrowRight style={{ width: '100%', height: '100%' }} /></ArrowBtn>

                            </Card>
                        ))}
                    </Cards>
                </ThemesPopupContent>
            </Modal>
        )
    }

    const renderFevGroupsModel = () => {
        return (
            <Modal
                isOpen={isFevGroupsOpen}
                onRequestClose={closeFevGroups}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <ThemesPopupContent className='popup-modal'>
                    <CloseThemeBtn onClick={closeFevGroups}><IoClose size={30} /> </CloseThemeBtn>
                    <Cards>
                        {FevGroupsList.map((card, index) => (
                            <Card key={index}>
                                <CardHead>
                                    <HeaderTag>{card.id}</HeaderTag>
                                    <HeartBtn isFev={card.favorite} onClick={() => handleHeartClick(card.id, card.category)}>
                                        {card.favorite ? <BsSuitHeartFill style={{ color: '#e5383b' }} size={20} /> : <BsSuitHeart size={20} style={{ color: '#fff' }} />}
                                    </HeartBtn>
                                </CardHead>

                                <ParaTag>Dept: {card.department}</ParaTag>
                                <ParaTag>priority: {card.priority}</ParaTag>
                                <ParaTag>Assigned To: {card.assignedTo}</ParaTag>
                                <ParaTag>Status: {card.status}</ParaTag>
                                <ArrowBtn><FaCircleArrowRight style={{ width: '100%', height: '100%' }} /></ArrowBtn>

                            </Card>
                        ))}
                    </Cards>
                </ThemesPopupContent>
            </Modal>
        )
    }

    const renderFevIssuesModel = () => {
        return (
            <Modal
                isOpen={isFevIssuesOpen}
                onRequestClose={closeFevIssues}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <ThemesPopupContent className='popup-modal'>
                    <CloseThemeBtn onClick={closeFevIssues}><IoClose size={30} /> </CloseThemeBtn>
                    <Cards>
                        {FevIssuesList.map((card, index) => (
                            <Card key={index}>
                                <CardHead>
                                    <HeaderTag>{card.id}</HeaderTag>
                                    <HeartBtn isFev={card.favorite} onClick={() => handleHeartClick(card.id, card.category)}>
                                        {card.favorite ? <BsSuitHeartFill style={{ color: '#e5383b' }} size={20} /> : <BsSuitHeart size={20} style={{ color: '#fff' }} />}
                                    </HeartBtn>
                                </CardHead>

                                <ParaTag>Dept: {card.department}</ParaTag>
                                <ParaTag>priority: {card.priority}</ParaTag>
                                <ParaTag>Assigned To: {card.assignedTo}</ParaTag>
                                <ParaTag>Status: {card.status}</ParaTag>
                                <ArrowBtn><FaCircleArrowRight style={{ width: '100%', height: '100%' }} /></ArrowBtn>

                            </Card>
                        ))}
                    </Cards>
                </ThemesPopupContent>
            </Modal>
        )
    }

    // Filtering data by category
    useEffect(() => {
        const filteredTickets = data.filter(item => item.category === 'tickets');
        setFevTicketsLIst(filteredTickets);

        const filteredGroups = data.filter(item => item.category === 'groups');
        setFevGroupsList(filteredGroups);

        const filteredIssues = data.filter(item => item.category === 'issues');
        setFevIssuesList(filteredIssues);

    }, []);

    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen } = value

                return (
                    <HomeCon>
                        <CustomContainer>
                            <HomeDashCon>
                                <Heading>Favourites <BsSuitHeart size={30} style={{ alignSelf: 'center', marginLeft: '10px' }} /> </Heading>

                                <Cards>
                                    <Card onClick={ToggleFevTickets}>
                                        <CardHead >
                                            <HeaderTag style={{ fontSize: '30px' }}>Tickets</HeaderTag>
                                            <div>
                                                <BsSuitHeartFill style={{ color: '#e5383b', marginRight: '2px' }} size={17} />
                                                <FevCount>{FevTicketsList.length}</FevCount>
                                            </div>
                                        </CardHead>
                                    </Card>
                                    {isFevTicketsOpen ? renderFevTicketsModel() : null}

                                    <Card onClick={ToggleFevGroups}>
                                        <CardHead >
                                            <HeaderTag style={{ fontSize: '30px' }}>Groups</HeaderTag>
                                            <div>
                                                <BsSuitHeartFill style={{ color: '#e5383b', marginRight: '2px' }} size={17} />
                                                <FevCount>{FevGroupsList.length}</FevCount>
                                            </div>
                                        </CardHead>
                                    </Card>
                                    {isFevGroupsOpen ? renderFevGroupsModel() : null}

                                    <Card onClick={ToggleFevIssues}>
                                        <CardHead >
                                            <HeaderTag style={{ fontSize: '30px' }}>Issues</HeaderTag>
                                            <div>
                                                <BsSuitHeartFill style={{ color: '#e5383b', marginRight: '2px' }} size={17} />
                                                <FevCount>{FevIssuesList.length}</FevCount>
                                            </div>
                                        </CardHead>
                                    </Card>
                                    {isFevIssuesOpen ? renderFevIssuesModel() : null}
                                </Cards>
                                {isChatBotOpen ? <ChatBot /> : null}
                            </HomeDashCon>
                        </CustomContainer>
                    </HomeCon>
                )
            }}
        </WonContext.Consumer>
    )
}

export default Favourites;