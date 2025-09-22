import Modal from 'react-modal';
import { Link } from 'react-router-dom';

//ICON IMPORTS 
import { FiSearch } from "react-icons/fi";

import WonContext from '../../../../context/WonContext';

import {
    HelpOption,
    HelpOptionList,
    HelpPopupContent,
    HelpSearch,
    HelpSearchContainer
} from './StyledComponents'
// import zIndex from '@mui/material/styles/zIndex';


export default function Help({ helpOpen, onRequestClose }) {

    const customStyles = {
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
        },
        content: {
            top: '7%',
            left: '82%',
            right: '0%',
            bottom: '71%',
            padding: '0px',
            display: 'flex',
            borderRadius: '10px',
            width: 'fit-content',
            zIndex: '10'
        },
    };

    return (
        <WonContext.Consumer>
            {value => {
                const { ChangeUserActivetab } = value

                const onClickHandler = () => {
                    ChangeUserActivetab('3')
                    onRequestClose()
                }

                return (
                    <Modal
                        isOpen={helpOpen}
                        onRequestClose={onRequestClose}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                        <HelpPopupContent className='popup-modal'>

                            <HelpSearchContainer>
                                <HelpSearch type='search' placeholder='Search...' />
                                <FiSearch style={{ color: '#000', cursor: 'pointer' }} size={19} />
                            </HelpSearchContainer>
                            <HelpOptionList>
                                <HelpOption onClick={onRequestClose}>About Won Platform</HelpOption>

                                <HelpOption onClick={onRequestClose}> Latest Updates</HelpOption>
                                <Link to='/user/home'><HelpOption onClick={onClickHandler}>Know More</HelpOption></Link>
                            </HelpOptionList>
                        </HelpPopupContent>
                    </Modal>
                )
            }}
        </WonContext.Consumer>
    )
}