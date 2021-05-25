import React from 'react';
import Toast from './Toast';
import { useSelector } from 'react-redux';
import styles from './toastContainer.module.scss';
import { AnimatePresence } from 'framer-motion';

const ToastContainer = () => {
  const toasts = useSelector((state) => state.toasts);

  return (
    <ul className={styles.container}>
      <AnimatePresence>
        {toasts &&
          toasts.map((toast, idx) => <Toast toast={toast} key={idx} />)}
      </AnimatePresence>
    </ul>
  );
};

export default ToastContainer;
