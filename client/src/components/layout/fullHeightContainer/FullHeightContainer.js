import React from 'react';

import styles from './fullHeightContainer.module.scss';

const FullHeightContainer = ({ children }) => {
  return <div className={styles.fullHeightContainer}>{children}</div>;
};

export default FullHeightContainer;
