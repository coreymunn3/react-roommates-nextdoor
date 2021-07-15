import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import styles from './avatarImage.module.scss';

const AvatarImage = ({ avatar, width = '50', height = '50', children }) => {
  return (
    <div className={styles.avatarContainer}>
      <Image
        cloudName={'dcmstbvwq'}
        publicId={avatar?.public_id}
        className={styles.avatar}
        style={{ width: width, height: height }}
      >
        <Transformation width={width} height={height} crop='thumb' />
      </Image>
      {children}
    </div>
  );
};

export default AvatarImage;
