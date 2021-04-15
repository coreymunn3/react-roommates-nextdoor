import React from 'react';
import styles from './elevatedSection.module.scss';

const ElevatedSection = ({ children, ...props }) => {
  return (
    <div className={`${styles.container} shadow `} {...props}>
      {children}
    </div>
  );
};

export default ElevatedSection;
