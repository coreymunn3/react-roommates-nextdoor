import React from 'react';
import styles from './featureItem.module.scss';

const FeatureItem = ({ featureIcon, featureContent }) => {
  return (
    <div className={styles.featureItem}>
      <div className='mr-3'>{featureIcon}</div>
      <div>{featureContent}</div>
    </div>
  );
};

export default FeatureItem;
