import React from 'react';
import styles from './postDetails.module.scss';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailSection from '../layout/detailSection/DetailSection';
import FeatureItem from '../layout/featureItem/FeatureItem';
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
        <Row>
          <Col sm={6}>
            <FeatureItem
              featureIcon={<FaHome size={iconSize} />}
              featureContent={housingType}
            />
            <FeatureItem
              featureIcon={
                roomPrivacy ? (
                  <FaLock size={iconSize} />
                ) : (
                  <FaUnlock size={iconSize} />
                )
              }
              featureContent={roomPrivacy}
            />
          </Col>
          <Col sm={6}>
            <FeatureItem
              featureIcon={<FaUsers size={iconSize} />}
              featureContent={`${
                numberOfCohabitants + 1
              } Total Inhabitants (Including You)`}
            />
            <FeatureItem
              featureIcon={<FaCalendarCheck size={iconSize} />}
              featureContent={`Move In on ${new Date(
                moveInDate
              ).toLocaleDateString()} `}
            />
          </Col>
        </Row>
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
