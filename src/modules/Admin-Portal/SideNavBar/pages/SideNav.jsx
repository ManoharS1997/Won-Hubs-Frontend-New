
import { useRef, useState, useEffect, useContext } from 'react';
import WonContext from '../../../../context/WonContext';
import NavOptions from '../components/RoutesList';

// STYLES IMPORTS

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const SideNavRef = useRef(null)
  const { sideNavScrollPosition, setSideNavScrollPosition } = useContext(WonContext);

  useEffect(() => {
    // After the component mounts, set the initial scroll position of the sidebar
    if (SideNavRef.current && sideNavScrollPosition) {
      SideNavRef.current.scrollTop = sideNavScrollPosition;
    }
  }, []);

  return (
    <WonContext.Consumer>
      {value => {
        const {
          activeOption, activeAdminOption, showAdminOptions,
          openInbox, setOpenInbox, OnSetActiveAdminOption,
          changeActivetab, toggleAdminOptions
        } = value

        if (SideNavRef.current && sideNavScrollPosition) {
          SideNavRef.current.scrollTop = sideNavScrollPosition;
        }

        const setNavItem = (event) => {
          console.log(event.target.id)
          changeActivetab(event.target.id)
          handleNavOptionSelect(event.target.id)
        }
        const setScrollPosition = (scrollPosition) => {
          if (SideNavRef.current) {
            SideNavRef.current.scrollTop = scrollPosition;
            setSideNavScrollPosition(SideNavRef.current.scrollTop);
            setSideNavScrollPosition(scrollPosition)
          }
        };
        const handleNavOptionSelect = (NavOption) => {
          const selectedNavOption = document.getElementById(NavOption);
          if (selectedNavOption && SideNavRef.current.contains(selectedNavOption)) {
            const newScrollPosition = selectedNavOption.offsetTop - SideNavRef.current.offsetTop;
            if (newScrollPosition !== sideNavScrollPosition) {
              setScrollPosition(newScrollPosition);
            }
          }
        };

        return (
          <NavOptions
            open={open}
            setOpen={setOpen}
            setNavItem={setNavItem}
            activeOption={activeOption}
          />
        )
      }}
    </WonContext.Consumer>
  )
}