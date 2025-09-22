import Modal from 'react-modal';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import renderIcons from '../../../../shared/functions/renderIcons';
import Swal from 'sweetalert2';

import { IoClose } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

import WonContext from '../../../../context/WonContext';

import {
  AdminPopupContent, AdminHeader, AdminProfileContainer, CloseBtn, GreetingMsg,
  LogOutBtn, ManageAccountBtn, ProfileInitialCon, ProfileInitialEditBtn,
  ProfileInitialLabel, UseId,
} from './StyledComponents'
import { SwitchUserBtn } from '../../../Header/pages/StyledComponents';
// import zIndex from '@mui/material/styles/zIndex';

export default function Admin({ adminOpen, onRequestClose, }) {
  const history = useNavigate()
  const userName = Cookies.get('activeUsername')
  // console.log(user)
  
  const customStyles = {
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: '1'
    },
    content: {
      top: '7%',
      left: '',
      right: '1%',
      borderRadius: '5px',
      display: 'flex',
      padding: '0px',
      zIndex: '10',
      width: '300px',
      height: 'fit-content',
      // alignSelf: 'flex-end'

      // padding: '15px'
    },
  };

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure want to Logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#05bb14",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        localStorage.clear()
        sessionStorage.clear()
        const allCookies = Cookies.get();

        // Remove each cookie
        Object.keys(allCookies).forEach(cookie => {
          Cookies.remove(cookie, { path: "/" }); // Ensure correct path
        });
        Swal.fire({
          title: "Loged Out Successfully!",
          text: "",
          icon: "success"
        });
        history('/')
      }
    });
  }

  return (
    <WonContext.Consumer>
      {value => {
        const { updateUserType } = value

        const changeUser = () => updateUserType()

        return (
          <Modal
            isOpen={adminOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <AdminPopupContent className="admin-popup p-0 gap-0">
              <AdminHeader className="py-1">
                <UseId>
                  {userName}
                </UseId>
                <CloseBtn className="" onClick={onRequestClose}>
                  <IoClose size={15} />
                </CloseBtn>
              </AdminHeader>

              <AdminProfileContainer className="gap-2 p-0">
                <ProfileInitialCon>
                  <ProfileInitialLabel>{userName.slice(0,1)}</ProfileInitialLabel>
                  <ProfileInitialEditBtn>
                    <MdOutlineModeEdit />
                  </ProfileInitialEditBtn>
                </ProfileInitialCon>
                <GreetingMsg>Hi, {userName}</GreetingMsg>
                <ManageAccountBtn
                  type='button'
                  onClick={() => {
                    onRequestClose()
                    history('/admin/profile')
                  }}
                >Manage Your Account</ManageAccountBtn>
              </AdminProfileContainer>

              {/* <Link to="/user/home">
                <SwitchUserBtn
                  type="button"
                  onClick={changeUser}
                  className='mt-2'
                >
                  <RiAdminFill size={18} />
                </SwitchUserBtn>
              </Link> */}

              <LogOutBtn
                type="button"
                onClick={onLogout}
                className="bg-transparent !text-red-500 font-semibold rounded !w-fit m-2 mb-3 flex !items-center !gap-2"
              >
                Sign out {renderIcons("IoExitOutline", 17, 'inherit')}
              </LogOutBtn>
            </AdminPopupContent>
          </Modal>
        );
      }}
    </WonContext.Consumer>

  )
}