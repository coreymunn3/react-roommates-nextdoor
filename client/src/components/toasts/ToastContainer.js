import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setToast, clearToast } from '../../redux/toastSlice';
import styles from './toastContainer.module.scss';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  console.log(toast);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearToast());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  return (
    <ul className={styles.container}>
      {toast && <li className={styles.toast}>{toast}</li>}
    </ul>
  );
};

export default ToastContainer;
