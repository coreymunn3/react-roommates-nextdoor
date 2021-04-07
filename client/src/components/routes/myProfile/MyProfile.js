import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ProfileGridItem from '../../profileGridItem/ProfileGridItem';
// redux
import { useSelector } from 'react-redux';
// styles
import styles from './myProfile.module.scss';

const MyProfile = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  const iconSize = '1.5rem';
  const profileTableData = [
    {
      property: 'Username',
      value: user?.user?.username,
      icon: <FaUser size={iconSize} />,
    },
    {
      property: 'Password',
      value: '************',
      icon: <FaLock size={iconSize} />,
    },
    {
      property: 'Email Account',
      value: user?.user?.email,
      icon: <FaEnvelope size={iconSize} />,
    },
    {
      property: 'Current Location',
      value: `${user?.user?._location?.city}, ${user?.user?._location?.state}`,
      icon: <FaMapMarkerAlt size={iconSize} />,
    },
  ];
  return (
    <div className={styles.fullHeightContainer}>
      <div className={styles.profileTable}>
        {profileTableData.map((data, idx) => (
          <ProfileGridItem
            profileDataItem={data}
            isLoading={isLoading}
            key={idx}
          />
        ))}
      </div>
      <div className={styles.profileControl}>
        <Button block>Update Profile</Button>
        <Button variant='secondary' block>
          View My Posts
        </Button>
      </div>
    </div>
  );
};

export default MyProfile;
