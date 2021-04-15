import React from 'react';
import styles from './elevatedSection.module.scss';

const ElevatedSection = ({ children }) => {
  return <div className={`${styles.container} shadow `}>{children}</div>;
};

export default ElevatedSection;
