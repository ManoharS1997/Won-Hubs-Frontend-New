import React from 'react';
import { useAlert } from '../hooks/alertHook';
import { MdCloudDone } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import { MdOutlineWarning } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import PortalWrapper from './AlertPortal';

import { AlertWrapper, Alert, AlertIcon, CloseBtn, CriticalContentCon } from './StyledAlertPortal';

const AlertList = () => {
  const { alerts, removeAlert } = useAlert();

  // Compute if any alert is critical
  const isCriticalAlert = alerts.some((alert) => alert.type === 'critical');

  const renderAlertTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <MdCloudDone size={25} />;
      case 'failure':
        return <BiSolidError size={25} />;
      case 'critical':
        return <MdOutlineWarning size={25} />;
      default:
        return null;
    }
  };

  return (
    <PortalWrapper>
      {alerts?.length > 0 &&
        <AlertWrapper>
          {alerts.map((alert) => (
            <Alert key={alert.id} duration={5000} type={alert.type} critical={isCriticalAlert}>
              {alert.type !== 'critical' ?
                <>
                  <AlertIcon>{renderAlertTypeIcon(alert.type)}</AlertIcon>
                  {alert.message}
                  <CloseBtn type='button' onClick={() => removeAlert(alert.id)} >
                    <IoIosClose size={20} />
                  </CloseBtn>
                </> :
                <CriticalContentCon>
                  <AlertIcon>{renderAlertTypeIcon(alert.type)}</AlertIcon>
                  <h2>Attention Required!</h2>
                  {alert.message}
                  {/* <CloseBtn type='button' onClick={() => removeAlert(alert.id)} >
                                    <IoIosClose size={20} />
                                </CloseBtn> */}
                </CriticalContentCon>}
            </Alert>
          ))}
        </AlertWrapper>}
    </PortalWrapper>
  )
}

export default AlertList;
