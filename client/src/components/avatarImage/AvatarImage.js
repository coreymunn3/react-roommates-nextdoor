import React from 'react';
import { Image } from 'cloudinary-react';
import styles from './avatarImage.module.scss';

const AvatarImage = ({ avatar, width, height, children }) => {
  return (
    <div className={styles.avatarContainer}>
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
        publicId={avatar?.public_id}
        className={styles.avatar}
        style={{ width: width, height: height }}
      />
      {children}
    </div>
  );
};

export default AvatarImage;
