import React, { useEffect, useState } from 'react';
import CustomModal from '../customModal/CustomModal';
import Recaptcha from 'react-recaptcha';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import styles from './captchaModal.module.scss';

const CaptchaModal = ({ userInfo, ...props }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [copy, setCopy] = useState('');
  const onloadCallback = () => {
    console.log('recaptcha has been loaded');
  };
  const verifyCallback = (response) => {
    if (response) setIsVerified(true);
  };
  const expiredCallback = () => {
    setIsVerified(false);
  };
  const handleCopy = () => {
    setCopy(userInfo.email);
    navigator.clipboard.writeText(userInfo.email);
  };
  return (
    <CustomModal {...props}>
      <p>Please verify that you are a human by clicking the box below</p>
      <Recaptcha
        sitekey='6LdH_sUaAAAAABLdhZBhJWmg3WdyEDRp_3o9PZ9D'
        render='explicit'
        onloadCallback={onloadCallback}
        verifyCallback={verifyCallback}
        expiredCallback={expiredCallback}
      />
      {isVerified && (
        <div className='my-2'>
          <p>{'Copy & Paste the owners email address by clicking it.'}</p>
          <div
            className={`${styles.copyable} ${copy && styles.copied}`}
            onClick={handleCopy}
          >
            {userInfo.email} <FaRegCopy /> {copy && <FaCheck />}
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default CaptchaModal;
