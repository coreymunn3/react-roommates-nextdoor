import React from 'react';
import styles from './elevatedSection.module.scss';

const ElevatedSection = ({ children }) => {
  return <div className={`${styles.container} shadow-sm `}>{children}</div>;
};

export default ElevatedSection;
