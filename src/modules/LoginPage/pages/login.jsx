import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { IoIosArrowForward } from "react-icons/io";

import WonContext from '../../../context/WonContext';
import ReactMultiCarousel from '../../../shared/components/Corousels/ReactMultiCorousel';
import PasswordLoginForm from '../components/PasswordLoginForm';
import ForgotUsernameForm from '../components/ForgotUsernameForm';
import EmailLogin from '../components/EmailLoginForm';
import PhoneNumberLogin from '../components/PhoneNumberLogin';
import KeyLogin from '../components/KeyLogin';
import { useAlert } from '../../../shared/hooks/alertHook';
import { IncreaseLoginCount } from '../../../utils/CheckAndExecuteFlows/CRUDoperations';
import GLogin from '../components/GoogleLogin/GoogleLogin';

import {
  MainContainer, LoginForm, Title, MoreOptions,
  LoginBtn, FieldsContainer, LogoImage, TitleSpan,
  Group, Input, Label, Bar, Highlight, ButtonsContainer,
  RegisterBtn, Ticker, TickerAndLoginform, LogoAndFormContainer,
  FooterSection,
} from './StyledComponents'

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL
console.log(hostedUrl,"url")

// other service products logos default images data
const appsLogos = [
  { id: 1, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755034/p1ie4euqsi4zfbpgfpsp_tvbzwr.png' },
  { id: 2, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755006/kb5jiq8l9rwibpicsr2x_ltd8rf.png' },
  { id: 3, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755149/gcticyloynxw2h6nvhpb_ed47no.png' },
  { id: 4, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755041/qxzp6vd6ctltwxb5pcxx_wudpce.png' },
  { id: 5, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755051/spb0be6ew2jjdaqmskca_d2yly1.png' },
  { id: 6, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755049/reodyw7ugngt13czewca_fffdl0.png' }
]

// default data for the super-admin credentials
const SuperAdminUserData = {
  "id": 80001001,
  "username": "Kartheek92",
  "role_id": 2,
  "first_name": "Kartheek",
  "last_name": "M",
  "title": "Mr",
  "department": "Technical",
  "active": "true",
  "selected_layout": "1",
  "dashboard_layouts": [
    { "id": 1, "name": "New Dash", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0, "moved": false, "static": false }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 4, "moved": false, "static": false }, { "h": 9, "i": "b", "w": 12, "x": 0, "y": 9, "moved": false, "static": false }, { "h": 5, "i": "c", "w": 6, "x": 6, "y": 4, "moved": false, "static": false }, { "h": 11, "i": "d", "w": 8, "x": 0, "y": 18, "moved": false, "static": false }, { "h": 4, "i": "e", "w": 4, "x": 8, "y": 22, "moved": false, "static": false }, { "h": 4, "i": "f", "w": 4, "x": 8, "y": 18, "moved": false, "static": false }] },
    { "id": 2, "name": "dash 1", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 }, { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 }, { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 }, { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }] }, { "id": 3, "name": "dash 2", "layouts": [{ "h": 3, "i": "1", "w": 5, "x": 0, "y": 0, "moved": false, "static": false }, { "h": 6, "i": "a", "w": 5, "x": 0, "y": 3, "moved": false, "static": false }, { "h": 9, "i": "b", "w": 12, "x": 0, "y": 9, "moved": false, "static": false }, { "h": 5, "i": "c", "w": 6, "x": 5, "y": 0, "moved": false, "static": false }, { "h": 11, "i": "d", "w": 8, "x": 0, "y": 18, "moved": false, "static": false }, { "h": 4, "i": "e", "w": 4, "x": 8, "y": 18, "moved": false, "static": false }, { "h": 4, "i": "f", "w": 6, "x": 5, "y": 5, "moved": false, "static": false }] },
    { "id": 4, "name": "dhash 3", "layouts": [{ "h": 4, "i": "1", "w": 12, "x": 0, "y": 0 }, { "h": 5, "i": "a", "w": 6, "x": 0, "y": 1 }, { "h": 9, "i": "b", "w": 12, "x": 1, "y": 2 }, { "h": 5, "i": "c", "w": 6, "x": 1, "y": 1 }, { "h": 11, "i": "d", "w": 8, "x": 1, "y": 3 }, { "h": 4, "i": "e", "w": 4, "x": 1, "y": 4 }, { "h": 4, "i": "f", "w": 4, "x": 1, "y": 4 }] }
  ],
  "password": "NowitServices2023@",
  "reset_password": "false",
  "email": "kartheek.muppiri@nowitservices.com",
  "time_zone": "Asia/India",
  "phone_no": "5689421683",
  "location": null,
  "user_type": "admin"
}

// left side faded effect on the ticker
const CarouselFadeLeft = styled.div`
    position: absolute;
    top: 2%;
    bottom: 2%;
    width: 15%;
    height: 95%;
    pointer-events: none; /* Make sure the gradients don't interfere with interactions */
    z-index: 5;
    
    left: 0;
    background: ${({ ticker }) => ticker === true ?
    'linear-gradient(to right, #00A9FF, rgba(255, 255, 255, 0))' :
    'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'};
    border-radius: 10px 0px 0px 10px;
`

// right side faded effect on the ticker
const CarouselFadeRight = styled.div`
    position: absolute;
    top: 2%;
    bottom: 2%;
    right: 50%;
    width: 15%;
    height: 95%;
    pointer-events: none; /* Make sure the gradients don't interfere with interactions */
    z-index: 5;
    
    background:  ${({ ticker }) => ticker === true ?
    'linear-gradient(to left, #00A9FF, rgba(255, 255, 255, 0))' :
    'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'};
    border-radius: 0px 60px 60px 0px;
`

export default function LoginPage() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [usernameSubmitted, setUsernameSubmit] = useState(false)
  const [isUserForgotUsername, setUserForgotUsername] = useState(false)
  const [selectedLoginMethod, setSelectedLoginMethod] = useState('password')
  const token = Cookies.get('accessToken')
  const { addAlert } = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [])


  // function to respond on select Password method login
  const onselectPasswordLogin = () => {
    setSelectedLoginMethod('password')
  }

  // function to respond on select Email method login
  const onselectEmailLogin = () => {
    setSelectedLoginMethod('email')
  }

  // function to respond on select SMS method login
  const onselectPhoneNoLogin = () => {
    setSelectedLoginMethod('phoneNo')
  }

  // function to respond on select Key method login
  const onselectKeyLogin = () => {
    setSelectedLoginMethod('loginKey')
  }

  return (
    <WonContext.Consumer>
      {value => {
        const { setActiveUserData } = value

        {/* const user = userName !== '' ? (roles.filter(role => role.username === userName))[0] : null */ }

        const onSubmitUsername = async (e) => {
          e.preventDefault()
          try {
            const url = `${hostedUrl}/api/admin/login/find/username`
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: userName })
            }

            {/* console.log(userName) */ }
            const response = await fetch(url, options)
            const resdata = await response.json()
            console.log(response)
            if (!response.ok) {
              if (userName === 'Super_Admin_2') {
                return setUsernameSubmit(true)
              }

              return addAlert(
                'We are sorry to Inform you that "Database Connection is Lost at the moment".',
                'failure')
            }

            Cookies.set('activeUsername', resdata.name)
            Cookies.set('username', userName)

            if (resdata.userFound) {
              setUsernameSubmit(true)
            } else {
              addAlert('Username Not Found!', 'failure')
            }
          } catch (err) {
            console.error('error searching username:', err)
            addAlert(`Server Is Disconnected`, 'failure')
          }
        }

        const setFirstSategeVerification = (value) => {
          Cookies.set('loginStageOne', 'true')
          Cookies.set('firstStageVerifiedWith', value)
        }
        // const increaseLoginCount = async () => {
        //     try {
        //         const response = await updateTableData('users', userId, { login_count: 1 }, 'MFA', window.location.href)
        //         console.log(response)
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }

        const passwordLogin = async () => {
          try {
            const url = `${hostedUrl}/api/admin/login/`
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ username: userName, password: password })
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (!response.ok) {
              return addAlert("Password Doesn't Match", 'failure')
            } else {
              if (data.token) {
                Cookies.set('accessToken', data.token)
                Cookies.set('refreshToken', data.refreshToken)
                setFirstSategeVerification(selectedLoginMethod)
                localStorage.setItem('activeUserData', JSON.stringify({ ...data.user, mfa_types_verification: data?.user?.mfa_type?.map(type => ({ type: type, verified: false })) }))
                setActiveUserData(data.user)
                console.log(data.user)
                if (data.user.mfa_enabled === 'true') {
                  console.log('redirecting to user mfa...')
                  if (data.user.login_count === 0) {
                    navigate('/MFA', { replace: true })
                  } else {
                    // console.log(data.user.mfa_type)
                    sessionStorage.setItem('mfa-methods', JSON.stringify(data.user.mfa_type.map(type => ({ method: type, passed: false }))))
                    data?.user?.mfa_type?.length > 0 ?
                      navigate(`/${data.user.mfa_type[0]}-MFA`, { replace: true }) :
                      navigate('/Dashboard')
                  }
                }
                else {
                  const response = await IncreaseLoginCount()
                  if (response.success === true) {
                    console.log('user login success and incremented login count. Now redirecting to dashboard')
                    navigate('/dashboard')
                  } else {
                    console.log('removiing cookies...')
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                  }
                }
              } else {
                addAlert('Server Disconnected', 'failure')
              }
            }
          } catch (err) {
            console.log(err)
          }
        }

        const emailLogin = async () => { }

        const keyLogin = async () => { }

        const phoneLogin = async () => { }

        const loginToAdmin = async (e) => {
          e.preventDefault()

          switch (selectedLoginMethod) {
            case 'password':
              return await passwordLogin()
            case 'email':
              return emailLogin()
            case 'loginKey':
              return keyLogin()
            case 'sms':
              return phoneLogin()
            default:
              return null
          }

        }

        const RenderselectedLoginForm = () => {
          switch (selectedLoginMethod) {
            case 'password':
              return <PasswordLoginForm
                userName={userName}
                onselectEmailLogin={onselectEmailLogin}
                onselectPhoneNoLogin={onselectPhoneNoLogin}
                onselectKeyLogin={onselectKeyLogin}
                logintoadmin={loginToAdmin}
                password={password}
                setPassword={setPassword}
              />
            case 'email':
              return <EmailLogin
                userName={userName}
                onselectPhoneNoLogin={onselectPhoneNoLogin}
                logintoadmin={loginToAdmin}
                onselectKeyLogin={onselectKeyLogin}
                onselectPasswordLogin={onselectPasswordLogin}
              />
            case 'phoneNo':
              return <PhoneNumberLogin
                userName={userName}
                onselectEmailLogin={onselectEmailLogin}
                logintoadmin={loginToAdmin}
                onselectKeyLogin={onselectKeyLogin}
                onselectPasswordLogin={onselectPasswordLogin}
              />
            case 'loginKey':
              return <KeyLogin
                userName={userName}
                onselectEmailLogin={onselectEmailLogin}
                onselectPhoneNoLogin={onselectPhoneNoLogin}
                logintoadmin={loginToAdmin}
                onselectPasswordLogin={onselectPasswordLogin}
              />
            default:
              return null
          }
        }

        return (
          <MainContainer>
            <TickerAndLoginform>
              <Ticker>
                <ReactMultiCarousel direction={false} gap={1} isTicker={true} height={'100px'} slidesToShow={4} />
                <ReactMultiCarousel direction={true} gap={1} isTicker={true} height={'100px'} slidesToShow={4} />
                <ReactMultiCarousel direction={false} gap={1} isTicker={true} height={'100px'} slidesToShow={4} />
                <ReactMultiCarousel direction={true} gap={1} isTicker={true} height={'100px'} slidesToShow={4} />
                <CarouselFadeLeft
                  className="carousel-fade-left"
                  ticker={true}
                >
                </CarouselFadeLeft>
                <CarouselFadeRight
                  className="carousel-fade-right"
                  ticker={true}
                >
                </CarouselFadeRight>
              </Ticker>

              <LogoAndFormContainer>
                <LogoImage
                  onClick={() => navigate('/')}
                  src='https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755137/eurmlmdcs6exyfbtkh9o_ebq7uc.png'
                  alt='logo'
                />

                {isUserForgotUsername ?
                  <ForgotUsernameForm setUserForgotUsername={setUserForgotUsername} /> :
                  !usernameSubmitted ?
                    <LoginForm onSubmit={(e) => onSubmitUsername(e)}>
                      <Title>
                        Login
                        <TitleSpan>to Continue to WON Platform</TitleSpan>
                      </Title>

                      {usernameSubmitted ?
                        <FieldsContainer>
                          <Group>
                            <Input
                              type="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <Label>Password</Label>
                            <Bar />
                            <Highlight />
                          </Group>
                        </FieldsContainer> :

                        <FieldsContainer>
                          <Group>
                            <Input type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <Label>Username</Label>
                            <Bar />
                            <Highlight />
                          </Group>
                        </FieldsContainer>}

                      {usernameSubmitted ?
                        <MoreOptions >Forgot Password ?</MoreOptions> :
                        <MoreOptions onClick={() => setUserForgotUsername(true)}>
                          Forgot Username ?
                        </MoreOptions>
                      }
                      {/* <GLogin /> */}
                      <ButtonsContainer>
                        {!usernameSubmitted ?
                          <RegisterBtn type='button' onClick={() => navigate('/register')}>Register Now</RegisterBtn>
                          : null
                        }
                        {!usernameSubmitted ?
                          <LoginBtn type='submit'>Next <IoIosArrowForward /></LoginBtn> :
                          <LoginBtn type='submit'>Login </LoginBtn>
                        }
                      </ButtonsContainer>
                    </LoginForm>
                    :
                    RenderselectedLoginForm()
                }
              </LogoAndFormContainer>
            </TickerAndLoginform>

            <FooterSection>
              <h3>Other Service Products</h3>

              <div className='md:hidden w-full'>
                <ReactMultiCarousel direction={false} images={appsLogos} isTicker={false} height={'150px'} slidesToShow={2} />
              </div>
              <div className='hidden md:block w-full'>
                <ReactMultiCarousel direction={false} images={appsLogos} isTicker={false} height={'150px'} slidesToShow={6} />
              </div>
            </FooterSection>
          </MainContainer>
        )
      }}
    </WonContext.Consumer>
  )
}