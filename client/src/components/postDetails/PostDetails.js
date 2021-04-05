import React from 'react';
import styles from './postDetails.module.scss';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
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
      geographicCoordinates,
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
    isLoading,
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
    center: geographicCoordinates,
    radius: 400,
    options: {
      strokeColor: '#ff0000',
    },
  };

  if (isLoading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '50vh', width: '100%' }}
      >
        <Spinner animation='border' variant='dark' />
      </div>
    );
  } else {
    return (
      <div>
        <h3>{title}</h3>
        <div className={styles.headerDetails}>
          <small className='mr-3 text-muted'>
            {`${moment(datePosted).fromNow()}, by ${postingUser?.username}`}
          </small>
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
            zoom={14}
            center={mapCircle.center}
            radius={mapCircle.radius}
            options={mapCircle.options}
          />
        </DetailSection>

        <DetailSection title='Next Steps'>
          <p>
            Interested and Looking to take the next steps? Contact the Poster
            using one of the methods below to get started
          </p>
          <Button>Message Author</Button>
        </DetailSection>
      </div>
    );
  }
};

export default PostDetails;
