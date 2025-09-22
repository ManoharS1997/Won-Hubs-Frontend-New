import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { themes } from "../../../../utils/themes.js";

//COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import { CustomThemes } from "../components/DataFile";
import { GetUserDataByUsername, updateTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import MFAEmailLogin from "../../../MFA/MFAEmailLogin.jsx";
import MFAKeyLogin from "../../../MFA/MFAKeyLogin.jsx";
import PhoneNumberLogin from "../../../LoginPage/components/PhoneNumberLogin.jsx";
import AuthenticatorApp from "../../../MFA/AuthenticatorApp.jsx";
import BiometricAuth from "../../../MFA/BiometricAuth.jsx";
import PhoneCall from "../../../MFA/PhoneCall.jsx";
import ToggleBtn from "../../../../shared/UIElements/ToggleBtn";
import { MfaOptions } from "../../../../shared/Data/settingsdata.jsx";
import CountryRegionSelector from "../../../../shared/UIElements/RegionSelector.jsx";

import {
    AppsPopupContent, CloseBtn, CloseThemeBtn, CustomHr, CustomLabel,
    CustomLi, CustomOption, CustomSelect, CustomText, CustomToolTip,
    CustomUl, Heading, SettingContainer, SettingsContainer, SettingsHeader,
    SliderButton, SliderContainer, SliderToggleContainer, ThemeBtn,
    ThemesHeadingBtn, TooltipText, SettingsContent
} from './StyledComponents'
import { RiCreativeCommonsZeroLine } from "react-icons/ri";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '10%',
        left: '15%',
        right: '15%',
        bottom: '10%',
        borderRadius: '15px',
        // width: '50vw',
        // height: '70vh',
        overflow: 'hidden',
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0',
    },
};
const tabsList = [
    { id: 1, name: "General" },
    { id: 7, name: "Themes" },
    { id: 2, name: "Chat" },
    { id: 3, name: "MFA" },
    { id: 4, name: "Integrations" },
    { id: 5, name: "Header" },
    { id: 6, name: "Footer" },
]

export default function Settings() {
    const [myNotifications, setMyNotifications] = useState(false)
    const [autoCorrection, setAutoCorrections] = useState(false)
    const [laguage, setLanguage] = useState(false)
    const [chat, setChat] = useState(false)
    const [isMFaEnabled, setIsMFaEnabled] = useState(false);
    const [mfaTypes, setMfaTypes] = useState([]);
    const [mfaSetupModal, setMfaSetupModal] = useState(false);
    const [selectedMFA, setSelectedMFA] = useState('');
    // const [tabsList, setTabsList] = useState(tabsList1)
    const [activeTab, setActiveTab] = useState(1)
    // Initialize from localStorage, or default to 'light'

    // const toggleSwitch = () => setIsChecked(!isChecked);
    // const toggleMyNotifications = () => 
    const toggleAutoCorrections = () => setAutoCorrections(!autoCorrection)
    const toggleLaunguage = () => setLanguage(!laguage)
    const toggleChat = () => setChat(!chat)
    const userName = JSON.parse(localStorage.getItem('activeUserData'))?.id

    const toggleMFA = () => {
        try {
            updateTableData('users', userName, { mfa_enabled: `${!isMFaEnabled}` }, 'Settings', window.location.href)
            setIsMFaEnabled(!isMFaEnabled)
        } catch (error) {
            console.error(error)
        }
    }
    const ChooseMFAHandler = (e) => {
        // console.log(e.target)
        setMfaTypes(prev => {
            const updatedArray = [...prev, e.target.id];
            return [...new Set(updatedArray)];
        });
    }
    const removeMFAHandler = async (type) => {
        await updateTableData('users', userName, { mfa_type: mfaTypes.filter(item => item !== type) }, 'Settings', window.location.href)
        setMfaTypes(prev => prev.filter(item => item !== type))
    }
    const ForwardAddress = 'won-admin@nowitservices.com'
    const mfaToggleRenderer = () => {
        Swal.fire({
            title: isMFaEnabled ? 'Disable' : 'Enable' + ' MFA?',
            text: isMFaEnabled ? "You Won't be asked for MFA on every login" : "You Will be asked for MFA on every login.",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#08a129",
            cancelButtonColor: "#a12828",
            confirmButtonText: isMFaEnabled ? 'Disable' : 'Enable'
        }).then((result) => {
            if (result.isConfirmed) {
                toggleMFA()
                Swal.fire({
                    title: isMFaEnabled ? 'Disabled!' : 'Enabled!',
                    text: `MFA ${isMFaEnabled ? 'disabled' : 'enabled'} for you account Successfully.`,
                    icon: "success"
                });
            }
        });
    }
    const removeMFA = async (label, type) => {
        try {
            Swal.fire({
                title: `Disable ${label}!`,
                text: "You Won't be asked for this MFA on next login.",
                // icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#08a129",
                cancelButtonColor: "#a12828",
                confirmButtonText: 'Disable'
            }).then((result) => {
                if (result.isConfirmed) {
                    removeMFAHandler(type)
                    Swal.fire({
                        title: 'Disabled!',
                        text: `${label} Disabled Successfully.`,
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.error(error)
        }
    }

    const myNotificationsHandler = async () => {
        try {
            Swal.fire({
                title: myNotifications ? 'Disable' : 'Enable' + ' Notifications?',
                text: myNotifications ? "You Won't recieve notifications." : "You Will recieve notifications.",
                // icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#08a129",
                cancelButtonColor: "#a12828",
                confirmButtonText: myNotifications ? 'Disable' : 'Enable'
            }).then((result) => {
                if (result.isConfirmed) {
                    updateTableData('users', userName, { notifications: (!myNotifications).toString() }, 'Settings', window.location.href)
                    setMyNotifications(!myNotifications)
                    Swal.fire({
                        title: myNotifications ? 'Disabled!' : 'Enabled!',
                        text: `MFA ${myNotifications ? 'disabled' : 'enabled'} for you account Successfully.`,
                        icon: "success"
                    });
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = async () => {
        try {
            const userDetails = await GetUserDataByUsername()
            // console.log(userDetails)
            if (userDetails) {
                setMyNotifications(userDetails.user.notifications === 'true')
                setIsMFaEnabled(userDetails.user.mfa_enabled === 'true')
                userDetails.user.mfa_type && setMfaTypes(userDetails.user.mfa_type)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const switchModalMFA = () => {
        switch (selectedMFA) {
            case 'sms':
                return <PhoneNumberLogin mfaType={mfaTypes} setMfa={setMfaTypes} setClose={setMfaSetupModal} setup />
            case 'email':
                return <MFAEmailLogin mfaType={mfaTypes} setMfa={setMfaTypes} setClose={setMfaSetupModal} setup />
            case 'call':
                return <PhoneCall mfaType={mfaTypes} setMfa={setMfaTypes} setClose={setMfaSetupModal} setup />
            case 'authenticator':
                return <AuthenticatorApp mfaType={mfaTypes} setMfa={setMfaTypes} setClose={setMfaSetupModal} setup />
            case 'biometric':
                return <BiometricAuth mfaType={mfaTypes} setMfa={setMfaTypes} setClose={setMfaSetupModal} setup />
            case 'passkey':
                return <MFAKeyLogin mfaType={mfaTypes} setMfa={setMfaTypes} setClose={setMfaSetupModal} setup />
            default:
                return <></>
        }
    }
    const RenderMFASetupModal = (e) => {
        setMfaSetupModal(true)
        ChooseMFAHandler(e)
        setSelectedMFA(e.target.id)
    }
    const cancleMFASetup = async () => {
        setMfaSetupModal(false)
        setSelectedMFA('')
        setMfaTypes(prev => prev.filter(item => item !== selectedMFA))
        await getUserDetails()
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { onChangeRecordsPageRecords, setSelectedTheme, recordsPerPage } = value
                const recordsChange = (e) => onChangeRecordsPageRecords(e.target.value)

                return (
                    <SettingsContainer
                        id="settings"
                        style={{
                            // display: openSettings ? 'block' : 'none',
                            padding: '0',
                            margin: '0',
                        }}
                    >
                        <SettingsHeader>
                            <ul className="flex items-center justify-center w-full gap-4 m-0 p-0">
                                {tabsList.map(tab => (
                                    <li
                                        key={tab.id} onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-[0.5rem] py-[0.3rem]
                                            cursor-pointer hover:border-b-3 hover:border-blue-200 
                                        ${activeTab === tab.id ? 'border-b-3 border-blue-500' : ''}
                                    `}>
                                        {tab.name}
                                    </li>
                                ))}
                            </ul>
                        </SettingsHeader>

                        <CustomHr />
                        {activeTab === 1 &&
                            <SettingsContent>
                                <SettingContainer>
                                    <CountryRegionSelector />
                                </SettingContainer>

                                <SettingContainer>
                                    <CustomLabel>My Notifications : </CustomLabel>

                                    <ToggleBtn
                                        id={'myNotifications'}
                                        isChecked={myNotifications}
                                        handleCheckboxChange={myNotificationsHandler}
                                    />
                                </SettingContainer>

                                <SettingContainer>
                                    <CustomLabel>Auto-corrections : </CustomLabel>

                                    <ToggleBtn
                                        id={'auto-corrections'}
                                        isChecked={autoCorrection}
                                        handleCheckboxChange={toggleAutoCorrections}
                                    />
                                </SettingContainer>

                                <SettingContainer>
                                    <CustomLabel>Records Per Page : </CustomLabel>

                                    <CustomSelect onChange={recordsChange}>
                                        <CustomOption selected value={recordsPerPage}>{recordsPerPage} (Default)</CustomOption>
                                        <CustomOption value={1}>1</CustomOption>
                                        <CustomOption value={2}>2</CustomOption>
                                        <CustomOption value={3}>3</CustomOption>
                                        <CustomOption value={5}>5</CustomOption>
                                        <CustomOption value={10}>10</CustomOption>
                                        <CustomOption value={20}>20</CustomOption>
                                        <CustomOption value={50}>50</CustomOption>
                                        <CustomOption value={100}>100</CustomOption>
                                    </CustomSelect>
                                </SettingContainer>

                                <SettingContainer>
                                    <CustomLabel>Language settings : </CustomLabel>

                                    <ToggleBtn
                                        id={'language'}
                                        isChecked={laguage}
                                        handleCheckboxChange={toggleLaunguage}
                                    />
                                </SettingContainer>

                                <SettingContainer>
                                    <CustomLabel>Forward Address : </CustomLabel>
                                    <CustomToolTip>
                                        <CustomText text={ForwardAddress}>{ForwardAddress.length > 100 ? ForwardAddress.slice(0, 10) + '...' : ForwardAddress}
                                            <TooltipText className="tooltiptext">{ForwardAddress}</TooltipText> </CustomText>
                                    </CustomToolTip>
                                </SettingContainer>
                            </SettingsContent>}

                        {activeTab === 2 &&
                            <SettingsContent>
                                <SettingContainer>
                                    <CustomLabel>Chat : </CustomLabel>


                                    <ToggleBtn
                                        id={'chat'}
                                        isChecked={chat}
                                        handleCheckboxChange={toggleChat}
                                    />
                                </SettingContainer>
                            </SettingsContent>}

                        {activeTab === 3 &&
                            <SettingsContent>
                                <SettingContainer className="flex flex-col gap-2">
                                    <CustomLabel
                                        style={{ display: 'flex' }}
                                        className="w-full flex justify-between gap-4"
                                    >
                                        <span>MFA :</span>
                                        <ToggleBtn
                                            isChecked={isMFaEnabled}
                                            handleCheckboxChange={mfaToggleRenderer}
                                        // customStyles={{
                                        //     ball: { width: '2.5rem', height: '1.2rem' },
                                        //     slider: { width: '1rem', height: '1rem' }
                                        // }}
                                        />
                                    </CustomLabel>
                                    <ul className="w-full px-2 flex flex-col gap-2 text-left">
                                        {MfaOptions.map((item, index) => {
                                            // console.log(mfaTypes, item.value)
                                            return (
                                                <li key={index}
                                                    className={`w-[85%] self-center flex justify-between items-center
                                                     border !border-transparent gap-4 
                                                     hover:!border-blue-500`}
                                                >
                                                    <span>{item.label}</span>

                                                    <ToggleBtn
                                                        id={item.id}
                                                        name="mfa-type"
                                                        value={item.id}
                                                        isDisabled={!isMFaEnabled}
                                                        isChecked={mfaTypes?.includes(item.value) && isMFaEnabled}
                                                        handleCheckboxChange={mfaTypes?.includes(item.value) ? (e) => removeMFA(item.label, e.target.id) : (e) => RenderMFASetupModal(e)}
                                                        checkboxProps={{ id: item.value }}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </SettingContainer>
                            </SettingsContent>}
                        {activeTab === 4 &&
                            <SettingsContent>
                                <SettingContainer style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', rowGap: '10px' }}>
                                    <CustomLabel style={{ fontWeight: 'bold', textDecoration: 'underline' }}>INTEGRATIONS</CustomLabel>
                                    <CustomLabel>Email Integrations</CustomLabel>
                                    <CustomLabel>Notifications Integrations</CustomLabel>
                                    <CustomLabel>Workflow Integrations</CustomLabel>
                                    <CustomLabel>Designer Integrations</CustomLabel>
                                </SettingContainer>
                            </SettingsContent>
                        }
                        {activeTab === 5 &&
                            <SettingsContent>
                                <SettingContainer>
                                    <CustomLabel>Header Settings : </CustomLabel>
                                </SettingContainer>
                            </SettingsContent>
                        }
                        {activeTab === 6 &&
                            <SettingsContent>
                                <SettingContainer>
                                    <CustomLabel>Footer Settings : </CustomLabel>
                                </SettingContainer>
                            </SettingsContent>
                        }
                        {activeTab === 7 &&
                            <SettingsContent>
                                <AppsPopupContent className='popup-modal'>
                                    <CustomUl>
                                        {Object.keys(themes).map(item => (
                                            <CustomLi
                                                key={item}
                                                value={item}
                                                onClick={() => {
                                                    // console.log(e.target)
                                                    setSelectedTheme(item)
                                                }}
                                                style={{
                                                    backgroundColor: themes[item]['--primary-color'],
                                                    textShadow: `-2px -2px 1px ${themes[item]['--background-color']}`
                                                }}
                                                boxShadow={themes[item]['--background-color']}
                                            >
                                                {item}
                                            </CustomLi>
                                        ))}
                                    </CustomUl>
                                </AppsPopupContent>
                            </SettingsContent>
                        }
                        <div
                            // isOpen={mfaSetupModal}
                            // onRequestClose={() => setMfaSetupModal(false)}
                            // contentLabel="Example Modal"
                            style={{
                                ...customStyles,
                                zIndex: '1',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                padding: '0',
                                position: 'fixed',
                                top: '0%',
                                left: '0%',
                                right: '0%',
                                bottom: '0%',
                                border: 'none',
                                boxShadow: 'none',
                                display: mfaSetupModal ? 'flex' : 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div className="flex align-center justify-between w-3/4 h-3/4 p-4 bg-white rounded-lg">
                                {switchModalMFA()}
                                <button
                                    type="button"
                                    style={{ backgroundColor: '#f80000', color: '#FFF' }}
                                    className="w-[10rem] h-fit absolute bottom-[15%] right-[15%] rounded-[0.3rem] bg-{#f80000}-500 text-black p-2 hover:text-[#FFF]"
                                    onClick={cancleMFASetup}
                                >Cancle Setup</button>
                            </div>
                        </div>
                    </SettingsContainer>
                )
            }}
        </WonContext.Consumer>
    )
}