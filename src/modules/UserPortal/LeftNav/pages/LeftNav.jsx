import { Link } from "react-router-dom";
import WonContext from "../../../../context/WonContext";

import { PiArrowFatLinesUpDuotone } from "react-icons/pi";
import { GrArticle } from "react-icons/gr";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlineInterests } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { TiHome } from "react-icons/ti";

import {
    LeftNavContainer,
    CustomUl,
    CustomLi,
    Alert
} from './StyledComponents'


export default function LeftNav() {
    const iconStyles = {
        marginRight: '15px',
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { ChangeUserActivetab, usersActiveTab } = value

                const changeActiveTab = (e) => ChangeUserActivetab(e.target.id)

                return (
                    <LeftNavContainer>
                        <CustomUl>

                            <Link to='/user/home'>
                                <CustomLi id='0' onClick={(e) => changeActiveTab(e, '0')} active={usersActiveTab === '0'}>
                                    <TiHome style={iconStyles} />
                                    Home
                                </CustomLi>
                            </Link>

                            <Link to='/user-internal/RaiseTicketDepartment'>
                                <CustomLi id='1' onClick={(e) => changeActiveTab(e, '1')} active={usersActiveTab === '1'}>
                                    <PiArrowFatLinesUpDuotone style={iconStyles} />
                                    Raise a Ticket
                                </CustomLi>
                            </Link>

                            <Link to='/user-internal/Articles'>
                                <CustomLi id='2' onClick={(e) => changeActiveTab(e, '2')} active={usersActiveTab === '2'}>
                                    <GrArticle style={iconStyles} />
                                    Articles
                                    <Alert>2</Alert>
                                </CustomLi>
                            </Link>

                            <Link to='/user-internal/Announcements'>
                                <CustomLi id='3' onClick={(e) => changeActiveTab(e, '3')} active={usersActiveTab === '3'}>
                                    <GrAnnounce style={iconStyles} />
                                    Announcements
                                    <Alert>4</Alert>
                                </CustomLi>
                            </Link>

                            <Link to='/user/favouritesList' >
                                <CustomLi id='4' onClick={(e) => changeActiveTab(e, '4')} active={usersActiveTab === '4'}>
                                    <MdOutlineInterests style={iconStyles} />
                                    Favourites
                                </CustomLi>
                            </Link>
                            
                            <Link to='/user/feedback'>
                                <CustomLi id='5' onClick={(e) => changeActiveTab(e, '5')} active={usersActiveTab === '5'}>
                                    <VscFeedback style={iconStyles} />
                                    Feedback
                                </CustomLi>
                            </Link>
                        </CustomUl>
                    </LeftNavContainer>
                )
            }}
        </WonContext.Consumer>
    )
}