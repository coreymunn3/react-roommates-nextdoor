import React, { useEffect } from 'react';
import styles from './toast.module.scss';
import {
  IoCloseOutline,
  IoCheckmarkCircleSharp,
  IoWarningOutline,
} from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { clearToast } from '../../redux/toastSlice';
import { motion } from 'framer-motion';

const Toast = ({ toast }) => {
  const dispatch = useDispatch();
  const { status, message, id } = toast;

  const handleDismiss = () => {
    dispatch(clearToast(id));
  };

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      dispatch(clearToast(id));
    }, 5000);

    return () => {
      clearTimeout(toastTimer);
    };
  }, []);

  const toastVariants = {
    hidden: {
      opacity: 0,
      x: 300,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: 300,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.li
      variants={toastVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={` shadow ${styles.toast} ${
        status ? styles.toastSuccess : styles.toastFail
      }`}
    >
      <div>
        {status ? (
          <IoCheckmarkCircleSharp fontSize='1.5rem' className='text-success' />
        ) : (
          <IoWarningOutline fontSize='1.5rem' className='text-danger' />
        )}
      </div>
      <p className={styles.toastContent}>{message}</p>
      <button className={styles.dismiss} onClick={handleDismiss}>
        <IoCloseOutline fontSize='1.5rem' className='clickable' />
      </button>
    </motion.li>
  );
};

export default Toast;
