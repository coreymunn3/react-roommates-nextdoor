import React from 'react';
import styles from './postDetails.module.scss';
import Image from 'react-bootstrap/Image';
import DetailSection from '../layout/detailSection/DetailSection';
import SplitColumnSection from '../layout/splitColumnSection/SplitColumnSection';
import Map from '../map/Map';
import moment from 'moment';
import transformAmenities from '../../utils/transformAmenities';
// icons
import {
  FaHome,
  FaLock,
  FaUnlock,
  FaUsers,
  FaCalendarCheck,
  FaDollarSign,
} from 'react-icons/fa';
// redux
import { useSelector } from 'react-redux';

const PostDetails = () => {
  const {
    currentPost: {
      title,
      body,
      datePosted,
      likeCount,
      featureImage,
      housingType,
      roomPrivacy,
      numberOfCohabitants,
      moveInDate,
      rentMonthly,
      securityDeposit,
      totalMoveInCost,
      otherFeesMonthly,
      _user: postingUser,
      _location,
      ...otherDetails
    },
  } = useSelector((state) => state.post);

  const iconSize = '1.5rem';
  const descriptionList = [
    {
      title: housingType,
      icon: <FaHome size={iconSize} />,
    },
    {
      title: roomPrivacy,
      icon:
        roomPrivacy === 'Room Private' ? (
          <FaLock size={iconSize} />
        ) : (
          <FaUnlock size={iconSize} />
        ),
    },
    {
      title: `${numberOfCohabitants} Other Person (${
        numberOfCohabitants + 1
      } Total Residents)`,
      icon: <FaUsers size={iconSize} />,
    },
    {
      title: `Move In ${new Date(moveInDate).toLocaleDateString()}, ${moment(
        moveInDate
      ).fromNow()}`,
      icon: <FaCalendarCheck size={iconSize} />,
    },
  ];
  const amenityList = transformAmenities(otherDetails, iconSize);
  const costList = [
    {
      title: `Total Move In Cost $${totalMoveInCost}`,
      icon: <FaDollarSign size={iconSize} />,
    },
    {
      title: `Monthly Rent $${rentMonthly}`,
      icon: <FaDollarSign size={iconSize} />,
    },
    {
      title: `Security Deposit $${securityDeposit}`,
      icon: <FaDollarSign size={iconSize} />,
    },
    {
      title: `Other Monthly Expenses (approx) $${otherFeesMonthly}`,
      icon: <FaDollarSign size={iconSize} />,
    },
  ];

  const mapCircle = {
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    radius: 3000,
    options: {
      strokeColor: '#ff0000',
    },
  };

  return (
    <div>
      <h3>{title}</h3>
      <div className={styles.headerDetails}>
        <small className='mr-3 text-muted'>{`${moment(
          datePosted
        ).fromNow()}, by ${postingUser?.username}`}</small>
        <small className='mr-3 text-muted'>{`${likeCount} likes`}</small>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.featureImage} src={featureImage}></Image>
      </div>
      <DetailSection title='Room Description'>
        <p>{body}</p>
        <SplitColumnSection items={descriptionList} />
      </DetailSection>

      <DetailSection title='Other Features & Amenities'>
        <SplitColumnSection items={amenityList} />
      </DetailSection>

      <DetailSection title='Costs & Expenses'>
        <SplitColumnSection items={costList} />
      </DetailSection>

      <DetailSection title='Location'>
        <Map
          zoom={11}
          center={mapCircle.center}
          radius={mapCircle.radius}
          options={mapCircle.options}
        />
      </DetailSection>
    </div>
  );
};

export default PostDetails;
