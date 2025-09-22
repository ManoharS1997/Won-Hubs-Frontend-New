import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import SingleOption from "./SingleOption";
import { OptionsList } from "./StyledRoutesList";
import { BurgerButton } from "../pages/StyledComponents";
import { IoIosArrowForward } from 'react-icons/io';
import { GiHamburgerMenu } from "react-icons/gi";
import renderIcons from '../../../../shared/functions/renderIcons';

const GeneralOptions = [
  { id: uuid(), option: 'Dashboard', icon: 'TbLayoutDashboardFilled' },
  { id: uuid(), option: 'My Items', icon: 'BsPersonRolodex' },
  { id: uuid(), option: 'Admin', icon: 'FaUserShield' },
  { id: uuid(), option: 'Apps', icon: 'GrAppsRounded' },
  { id: uuid(), option: 'Calender', icon: 'ImCalendar' },
  { id: uuid(), option: 'Settings', icon: 'TbSettingsCog' },
  { id: uuid(), option: 'Super Admin', icon: 'MdOutlineDomainAdd' }
];

const MobileViewOptions =[
  { id: uuid(), option: 'Help', icon: 'Help' },
]

export default function NavOptions({ open, setOpen, setNavItem, activeOption }) {
  const [showSlider, setShowSlider] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleOpen = () => {
    setShowSlider(true);
    setTimeout(() => setIsMounted(true), 10); // Delay ensures animation applies
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsMounted(false);
    setTimeout(() => {
      setShowSlider(false);
      setIsClosing(false);
    }, 300); // Duration matches Tailwind transition
  };

  const onClickVoid = (e) => {
    e.target.id !== 'non-void' && handleClose()
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        className="absolute w-fit h-fit top-[2vh] left-2 z-10 p-1 rounded-full md:hidden bg-transparent text-white"
        onClick={handleOpen}
      >
        <GiHamburgerMenu size={20} className="flex md:hidden" />
      </button>

      {/* Desktop Sidebar */}
      <OptionsList show={open} className="!hidden md:!flex">
        <BurgerButton show={open} type="button" onClick={() => setOpen(prev => !prev)}>
          <IoIosArrowForward
            size={20}
            className="w-[1.5rem] h-[1.5rem] text-black bg-white z-10 p-1 -translate-x-2 rounded-full shadow-[0_0_5px_1px_black] md:flex hidden"
          />
        </BurgerButton>
        <ul className={`p-0 w-full h-fit flex flex-col ${open ? 'gap-[0.5rem]' : 'gap-[1rem] mt-4'}`}>
          {GeneralOptions.map(option => (
            <SingleOption
              show={open}
              key={option.id}
              setNavItem={setNavItem}
              setOpen={setOpen}
              activeOption={activeOption}
              option={option}
            />
          ))}
        </ul>
      </OptionsList>

      {/* Mobile Slider Nav */}
      {showSlider && (
        <div
          onClick={onClickVoid}
          className="fixed top-0 left-0 z-50 flex w-screen h-screen bg-black/60 
          transition-opacity duration-300"
        >
          <ul
            id='non-void'
            className={`
              m-0 py-2 px-4 min-w-[250px] w-fit h-full bg-[var(--primary-color)]
              flex flex-col justify-start gap-3
              transform transition-transform duration-300 ease-in-out
              ${isMounted ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <button
              type="button"
              className="w-fit h-fit p-1 flex !rounded-full md:hidden bg-transparent text-white !ml-auto"
              onClick={handleClose}
            >
              {renderIcons("IoIosClose", 20, 'white')}
            </button>

            {GeneralOptions.map(option => (
              <SingleOption
                show={true}
                key={option.id}
                setNavItem={setNavItem}
                setClose={handleClose}
                activeOption={activeOption}
                option={option}
                hideIcon={true}
                classNames="m-0 px-4 py-[5px] !rounded-full"
              />
            ))}

            {MobileViewOptions.map(option => (
              <SingleOption
                show={true}
                key={option.id}
                setNavItem={setNavItem}
                setClose={handleClose}
                activeOption={activeOption}
                option={option}
                hideIcon={true}
                classNames="m-0 px-4 py-[5px] !rounded-full"
              />
            ))}

          </ul>
        </div>
      )}
    </>
  );
}
