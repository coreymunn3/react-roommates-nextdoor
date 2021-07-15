import React from 'react';
import styles from './detailSection.module.scss';

const DetailSection = ({ children, title }) => {
  return (
    <div className={`${styles.detailSection} shadow`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
};

export default DetailSection;
