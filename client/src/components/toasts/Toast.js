import React, { useEffect } from 'react';
import styles from './toast.module.scss';
import { FaTimes } from 'react-icons/fa';
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
      className={`${styles.toast} ${
        status ? styles.toastSuccess : styles.toastFail
      }`}
    >
      <p className={styles.toastContent}>{message}</p>
      <button className={styles.dismiss} onClick={handleDismiss}>
        <FaTimes fontSize='1.5rem' className='clickable' />
      </button>
    </motion.li>
  );
};

export default Toast;
