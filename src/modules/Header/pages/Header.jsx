import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import Cookies from 'js-cookie'

import { IoSearch, IoPerson, IoClose, IoHeartSharp, IoCartOutline } from "react-icons/io5"
import { CiUser } from "react-icons/ci"
import { VscClearAll } from "react-icons/vsc";
import { PiPaintBrushBroadLight, PiCardsBold } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdArrowRight, MdArrowDropDown } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { GrAppsRounded } from "react-icons/gr";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TbSettingsCog } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import renderIcons from "../../../shared/functions/renderIcons.jsx";

import Modal from 'react-modal'
import WonContext from "../../../context/WonContext.jsx";
import Help from "../../Admin-Portal/Help/pages/Help.jsx";
// import Apps from "../../Admin-Portal/Apps/Apps"
import Admin from '../../Admin-Portal/Admin/pages/Admin'
import { CustomThemes, CountryCodesData } from "../../../DataFile/ThemesData.jsx"

import {
  CompanyLogo, HeaderContainer, ManagerHead, NavIcon, NavOption, OptionContent,
  OptionText, SearchAndNavButtonsContainer, SearchContainer, SearchInput, SubmitButton,
  ClearSearch, LogoContainer, MyTicketsBtn, MyTicketsWraper, MyTicketsDropdown, CustomOption,
  CustomBtn, ThemesPopupContent, CloseThemeBtn, CustomUl, CustomLi, ThemeBtn, MyProfileHeader,
  MyProfilePopupContainer, CloseBtn, GreetingMsg, LogOutBtn, ManageAccountBtn, ProfileInitialCon,
  ProfileInitialEditBtn, ProfileInitialLabel, UseId, MyProfileContainer, SettingsBtn, SettingsList,
  SettingItem, ManageAccountPopUp, CloseManageAccountBtn, ManageAccountContent, CustomUpdate, CustomInput,
  CustomSelect, CustomA, UlElement, LiElement, AnchorElement, UpdateBtn, CustomLabel, CustomContainer,
  Code, CustomVerifyContainer, AutoCorrectionsContainer, SliderToggleContainer, SliderContainer,
  SliderButton, FavouriteIconBtn, SwitchUserBtn, OptionsContainer, SearchResultsContainer
} from "./StyledComponents";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '7%',
    left: '25%',
    right: '20%',
    bottom: '20%',
    borderRadius: '15px',
    width: '50vw',
    height: '70vh',
    overflow: 'hidden',
  },
}

const profileStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '7%',
    left: '84%',
    right: '0%',
    bottom: '40%',
    borderRadius: '10px',
    width: '15vw',
    height: 'fit-content',
    overflow: 'hidden',
  },
}

export default function Header() {
  const [helpModalIsOpen, setHelpModalIsOpen] = useState(false)
  const [adminModelIsOpen, setAdminModalIsOpen] = useState(false)
  const [userThemesOpen, setOpenUserThemes] = useState(false)
  const [manageAccountOpen, setManageAccount] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false)
  const [mailAndMobile, setMailAndMobile] = useState({
    mailID: 'dasdhg@gmail.com',
    mobileNo: '123456789'
  })
  const [mail, setMail] = useState('')
  const [mobile, setMobile] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [isMailVerified, setMailVerify] = useState(true)
  const [isMobileVerified, setMobileVerify] = useState(false)
  const [isAutoCorrectionOn, setAutoCorrection] = useState(false)
  const [languageSettings, setLanguageSettings] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('');
  const [searchText, setSearchText] = useState('')

  const Navigate = useNavigate()

  const toggleProfileSettings = () => setProfileSettingsOpen(!profileSettingsOpen)
  const openUserProfile = () => setOpenProfile(true)
  const closeProfile = () => setOpenProfile(false)
  const openUserThemes = () => setOpenUserThemes(true)
  const openManageaccount = () => setManageAccount(true)
  const closeManageAccount = () => setManageAccount(false)
  const closeUserThemes = () => setOpenUserThemes(false)
  const onChangeSearchText = (e) => setSearchText(e.target.value)
  const ClearSearchbar = () => setSearchText('')
  const toggleHelp = () => setHelpModalIsOpen(!helpModalIsOpen)
  const closeHelp = () => setHelpModalIsOpen(false)
  const openAdmin = () => setAdminModalIsOpen(!adminModelIsOpen)
  const closeAdmin = () => setAdminModalIsOpen(false)
  const OnChangeMail = (event) => setMail(event.target.value)
  const OnChangeMobile = (event) => setMobile(event.target.value)
  const handleAutoCorrect = () => setAutoCorrection(prev => !prev)
  const handleLanguageSettings = () => setLanguageSettings(prev => !prev)
  const renderManageAccountModel = () => (
    <Modal
      isOpen={manageAccountOpen}
      onRequestClose={closeManageAccount}
      contentLabel="Manage Account Example Modal"
      style={customStyles}
    >
      <ManageAccountPopUp className='popup-modal'>
        <CloseManageAccountBtn onClick={closeManageAccount}><IoClose /> </CloseManageAccountBtn>

        <ManageAccountContent>
          <CustomContainer>
            <CustomLabel>Email ID</CustomLabel>
            <CustomVerifyContainer>
              <CustomUpdate>
                <CustomInput type="email" placeholder={mailAndMobile['mailID']} value={mail} onChange={OnChangeMail} />
                <UpdateBtn>Update</UpdateBtn>
              </CustomUpdate>
              {isMailVerified ? <MdVerified size={20} style={{ color: 'green', marginLeft: '5px', }} /> : null}
            </CustomVerifyContainer>
          </CustomContainer>

          <CustomContainer>
            <CustomLabel>Mobile No</CustomLabel>
            <CustomVerifyContainer>
              <CustomUpdate>
                <CustomSelect className="dropdown">
                  <CustomA className="btn btn-secondary dropdown-toggle"
                    href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {countryCode ? countryCode : 'IND'}
                  </CustomA>
                  <UlElement className="dropdown-menu">
                    {Object.entries(CountryCodesData).map(([key]) => (
                      <LiElement key={key}>
                        <AnchorElement className="dropdown-item"
                          onClick={() => setCountryCode(key)}
                          href="#">
                          {key}
                        </AnchorElement>
                      </LiElement>
                    ))}
                  </UlElement>
                </CustomSelect>
                <Code>{countryCode ? CountryCodesData[countryCode] : CountryCodesData['IND']}</Code>
                <CustomInput type="number" placeholder={mailAndMobile['mobileNo']} value={mobile} onChange={OnChangeMobile} />
                <UpdateBtn>Update</UpdateBtn>
              </CustomUpdate>
              {
                isMobileVerified ? <MdVerified size={20} style={{ color: 'green', marginLeft: '5px', }} /> : null
              }
            </CustomVerifyContainer>
          </CustomContainer>
        </ManageAccountContent>
      </ManageAccountPopUp>
    </Modal>
  )
  const determineTextColor = (bgColor) => {
    const brightness = (
      parseInt(bgColor.slice(1), 16) >> 16 +
      parseInt(bgColor.slice(1), 16) >> 8 +
      parseInt(bgColor.slice(1), 16)
    ) / 3;

    return brightness > 0x7F ? '#000000' : '#ffffff';
  }

  useEffect(() => {
    setTextColor(determineTextColor(backgroundColor))
  }, [backgroundColor])

  const toggleFavourite = (e) => {
    const id = e.currentTarget.parentNode.id
    const updatedData = CustomThemes.map(item => {
      if (item.ticket_no.toString() === id) {
        return (
          { ...item, isFavourite: (item.isFavourite === undefined ? true : !item.isFavourite) }
        )
      }
      return item
    })
  }
  const LogoUrl = 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755137/eurmlmdcs6exyfbtkh9o_ebq7uc.png'

  return (
    <WonContext.Consumer>
      {value => {
        const { userType, ChangeUserActivetab, toggleSettings, changeActivetab, OnSetActiveAdminOption, updateUserType } = value

        const changeUser = () => updateUserType()

        const onTogglesettings = () => toggleSettings()

        const returnHome = () => {
          changeActivetab('Dashboard')
          OnSetActiveAdminOption('')
        }

        const setRequestTab = (e) => ChangeUserActivetab(e.target.id)

        return (
          <HeaderContainer>
            {/* <DrawerMobileNavigation /> */}
            {/* <SideNav /> */}

            <div className="flex w-[20%]" >
              {LogoUrl != ''
                ? userType === 'user'
                  ? <LogoContainer
                    data-tooltip-id='user-logo-tooltip'
                    data-tooltip-content='Go To Dashboard'
                    onClick={() => Navigate('/user/home')}
                  >
                    <CompanyLogo
                      src={LogoUrl}
                      alt='logo'
                      onClick={returnHome}
                    />
                  </LogoContainer>
                  : <LogoContainer
                    data-tooltip-id='logo-tooltip'
                    data-tooltip-content='Go To Dashboard'
                    onClick={() => Navigate('/Dashboard')}
                  >
                    <CompanyLogo
                      src={LogoUrl}
                      alt='logo'
                      onClick={returnHome}
                    />
                  </LogoContainer>
                : userType === 'user'
                  ? <Link to='/user/home'>
                    <ManagerHead
                      onClick={() => Navigate('/user/home')}
                    >
                      {Cookies.get('activeUsername') || 'User'}
                    </ManagerHead>
                  </Link>
                  : <Link to='/Dashboard' onClick={() => Navigate('/user/home')}>
                    <ManagerHead>
                      {Cookies.get('activeUsername') || 'Admin'}
                    </ManagerHead>
                  </Link>
              }
              <span className="md:hidden ml-10 font-semibold">WONHUBS</span>
            </div>

            <SearchAndNavButtonsContainer
              className="!w-fit md:!w-[80%] gap-4"
            >
              <SearchContainer
                className="!hidden md:!flex"
              >
                <SubmitButton
                  type="button"
                  title="Search"
                >
                  <IoSearch size={23} />
                </SubmitButton>
                <SearchInput
                  type="search"
                  value={searchText}
                  placeholder="Global AI Search"
                  onChange={onChangeSearchText}
                />
                <ClearSearch
                  type="button"
                  onClick={ClearSearchbar}
                  title="Clear all"
                >
                  <VscClearAll size={16} />
                </ClearSearch>

                <SearchResultsContainer>
                  <h5>Recent</h5>
                  <ul>
                    <li>Articles</li>
                  </ul>
                  <h5>Explore</h5>
                  <ul>
                    <li>Workflow Automator</li>
                  </ul>
                </SearchResultsContainer>
              </SearchContainer>

              <OptionsContainer>
                {userType === 'user' ? (
                  <MyTicketsWraper>
                    <MyTicketsBtn>
                      {/* <PiCardsBold size={20} /> */}
                      My Tickets
                    </MyTicketsBtn>

                    <MyTicketsDropdown>
                      <Link to='/user/tickets'>
                        <CustomOption onClick={setRequestTab} id='1'>My Tickets</CustomOption>
                      </Link>
                    </MyTicketsDropdown>
                  </MyTicketsWraper>
                ) : null
                }

                <NavOption
                  data-tooltip-id='help-icon-tooltip'
                  data-tooltip-content='Help'
                  onClick={toggleHelp}
                  className="!hidden md:!flex"
                >
                  <OptionContent>
                    <OptionText>
                      {/* <IoMdHelpCircleOutline size={20} /> */}
                      Help
                    </OptionText>
                  </OptionContent>
                  <Tooltip id='help-icon-tooltip' noArrow offset={8} style={{ borderRadius: '5px', padding: '5px 10px', zIndex: '10' }} />
                </NavOption>

                <Help helpOpen={helpModalIsOpen} onRequestClose={closeHelp} />

                {userType === 'user' && (
                  <>
                    <NavOption>
                      <Link to='/user-internal/Cart'>
                        <OptionContent>
                          <OptionText>
                            {/* <FaCartShopping size={20} /> */}
                            Cart
                          </OptionText>
                          {/* <NavIcon> <IoCartOutline style={{ width: '100%', marginRight: '5px' }} size={18} /> </NavIcon> */}
                        </OptionContent>
                      </Link>
                    </NavOption>
                  </>
                )}

                {userType === 'user' ? (<>
                  <NavOption
                    data-tooltip-id='user-tooltip'
                    data-tooltip-content='My Profile'
                    className="!hidden md:!flex"
                  >
                    <OptionContent onClick={openUserProfile} >
                      <OptionText >
                        {/* <CgProfile size={20} /> */}
                        Profile
                      </OptionText>
                      {/* <NavIcon> <CiUser style={{ width: '100%', marginRight: '5px' }} size={18} /> </NavIcon> */}
                    </OptionContent>
                    <Modal
                      isOpen={openProfile}
                      onRequestClose={closeProfile}
                      contentLabel="Example Modal"
                      style={profileStyles} >

                      <MyProfilePopupContainer>
                        <Link to='/Dashboard'>
                          <SwitchUserBtn type='button' onClick={changeUser}> <FaUser size={18} /></SwitchUserBtn>
                        </Link>
                        <MyProfileHeader>
                          <UseId>NowIt@nowitservices.com</UseId>
                          <CloseBtn onClick={closeProfile}>
                            <IoClose size={20} />
                          </CloseBtn>
                        </MyProfileHeader>

                        <MyProfileContainer>
                          <ProfileInitialCon>
                            <ProfileInitialLabel>N</ProfileInitialLabel>
                            <ProfileInitialEditBtn>
                              <MdOutlineModeEdit />
                            </ProfileInitialEditBtn>
                          </ProfileInitialCon>
                          <GreetingMsg>Hi, NowIt Services</GreetingMsg>
                          <ManageAccountBtn onClick={openManageaccount}>Manage Your Account</ManageAccountBtn>
                        </MyProfileContainer>

                        {/* popup for updating mail and mobile */}
                        {manageAccountOpen ? renderManageAccountModel() : null}

                        <SettingsBtn type="buton" onClick={toggleProfileSettings}>Seetings {profileSettingsOpen ? <MdArrowDropDown /> : <MdArrowRight />}</SettingsBtn>
                        <SettingsList show={profileSettingsOpen}>
                          <SettingItem>My Settings</SettingItem>

                          <AutoCorrectionsContainer>
                            <CustomLabel>Auto-corrections : </CustomLabel>
                            <SliderToggleContainer active={isAutoCorrectionOn}>
                              <SliderContainer>
                                <SliderButton active={isAutoCorrectionOn} onClick={handleAutoCorrect} />
                              </SliderContainer>
                            </SliderToggleContainer>
                          </AutoCorrectionsContainer>

                          <AutoCorrectionsContainer>
                            <CustomLabel>Auto-corrections : </CustomLabel>
                            <SliderToggleContainer active={languageSettings}>
                              <SliderContainer>
                                <SliderButton active={languageSettings} onClick={handleLanguageSettings} />
                              </SliderContainer>
                            </SliderToggleContainer>
                          </AutoCorrectionsContainer>
                        </SettingsList>

                        <CustomBtn onClick={openUserThemes}><NavIcon><PiPaintBrushBroadLight style={{ width: '100%' }} /> </NavIcon>Themes</CustomBtn>
                        <Modal
                          isOpen={userThemesOpen}
                          onRequestClose={closeUserThemes}
                          contentLabel="Example Modal"
                          style={customStyles}
                        >
                          <ThemesPopupContent className='popup-modal'>
                            <CloseThemeBtn onClick={closeUserThemes}><IoClose /> </CloseThemeBtn>
                            <CustomUl>
                              {CustomThemes.map(item => (
                                <CustomLi key={item.id}>
                                  <ThemeBtn type="button" themeBackground={item.colors.background} textColor={item.colors.text}>
                                    <FavouriteIconBtn type="button" id={item.ticket_no} onClick={toggleFavourite}>
                                      {item.isFavourite === undefined ? (<CiHeart style={{ width: '100%', height: '100%', filter: 'invert(100%)' }} id={item.ticket_no} />) : (<IoHeartSharp style={{ width: '100%', height: '100%', color: 'red' }} id={item.ticket_no} />)}
                                    </FavouriteIconBtn>
                                    <p style={{ margin: 'auto' }}>{item.name}</p>
                                  </ThemeBtn>
                                </CustomLi>
                              ))}
                            </CustomUl>
                          </ThemesPopupContent>
                        </Modal>

                        <LogOutBtn className="!rounded">Sign Out</LogOutBtn>
                      </MyProfilePopupContainer>
                    </Modal>
                  </NavOption>
                </>

                ) : (
                  <>
                    <NavOption
                      data-tooltip-id='admin-tooltip'
                      data-tooltip-content='Admin'
                      onClick={openAdmin}
                      className="!hidden md:!flex"
                    >
                      <OptionContent>
                        <OptionText>
                          {/* <IoPerson size={20} /> */}
                          Profile </OptionText>
                      </OptionContent>
                    </NavOption>
                    {<Admin adminOpen={adminModelIsOpen} onRequestClose={closeAdmin} />}
                    <Tooltip id='admin-tooltip' noArrow offset={8} style={{ borderRadius: '5px', padding: '5px 10px', zIndex: '10' }} />
                  </>
                )}
              </OptionsContainer>

              <div className="md:hidden">
                {renderIcons('FaSearch', 20, 'inherit')}
              </div>
              <div className="md:hidden w-8 h-full flex items-center justify-center ">
                <img
                  src={LogoUrl}
                  alt='profile'
                  className="rounded-full"
                />
              </div>
            </SearchAndNavButtonsContainer>
          </HeaderContainer>
        )
      }}
    </WonContext.Consumer>
  )
}
