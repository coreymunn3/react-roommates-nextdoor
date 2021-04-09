import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaUser, FaLock, FaEnvelope, FaEdit } from 'react-icons/fa';
import FullHeightContainer from '../../layout/fullHeightContainer/FullHeightContainer';
import ProfileGridItem from '../../profileGridItem/ProfileGridItem';
import UpdateProfileModal from '../../updateProfileModal/UpdateProfileModal';

// redux
import { useSelector } from 'react-redux';
// styles
import styles from './myProfile.module.scss';

const MyProfile = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const handleOpen = (text) => {
    setOpen(true);
    setModalTitle(text);
  };
  const handleClose = () => setOpen(false);
  const iconSize = '1.5rem';
  const profileTableData = [
    {
      property: 'Username',
      value: user?.user?.username,
      icon: <FaUser size={iconSize} />,
      editable: false,
    },
    {
      property: 'Password',
      value: '************',
      icon: <FaLock size={iconSize} />,
      editable: true,
    },
    {
      property: 'Email',
      value: user?.user?.email,
      icon: <FaEnvelope size={iconSize} />,
      editable: true,
    },
  ];
  return (
    <FullHeightContainer>
      <div className={styles.profileTable}>
        <p className='text-center'>Username cannot be updated.</p>
        {profileTableData.map((data, idx) => (
          <Row key={idx} className={`${styles.profileTableRow} bottomDivider`}>
            <Col xs={10}>
              <ProfileGridItem profileDataItem={data} isLoading={isLoading} />
            </Col>
            <Col xs={2}>
              {data.editable && (
                <FaEdit
                  size={iconSize}
                  onClick={() => handleOpen(data.property)}
                />
              )}
            </Col>
          </Row>
        ))}
      </div>

      <div className={styles.profileControl}>
        <Button as={Link} to='/myposts' variant='secondary' block>
          View My Posts
        </Button>
      </div>
      <UpdateProfileModal
        open={open}
        handleClose={handleClose}
        title={modalTitle}
      />
    </FullHeightContainer>
  );
};

export default MyProfile;
