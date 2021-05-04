import React, { useEffect, useState } from 'react';
import CustomModal from '../customModal/CustomModal';
import Recaptcha from 'react-recaptcha';
import { Form } from 'react-bootstrap';

const CaptchaModal = ({ userInfo, ...props }) => {
  const [isVerified, setIsVerified] = useState(false);
  const onloadCallback = () => {
    console.log('recaptcha has been loaded');
  };
  const verifyCallback = (response) => {
    if (response) setIsVerified(true);
  };
  return (
    <CustomModal {...props}>
      <p>Please verify that you are a human by clicking the box below</p>
      <Recaptcha
        sitekey='6LdH_sUaAAAAABLdhZBhJWmg3WdyEDRp_3o9PZ9D'
        render='explicit'
        onloadCallback={onloadCallback}
        verifyCallback={verifyCallback}
      />
      {isVerified && <p>{userInfo.email}</p>}
    </CustomModal>
  );
};

export default CaptchaModal;
