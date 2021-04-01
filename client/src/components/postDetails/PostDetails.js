import React from 'react';
import styles from './postDetails.module.scss';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailSection from '../layout/detailSection/DetailSection';
import FeatureItem from '../layout/featureItem/FeatureItem';
import SplitColumnSection from '../layout/splitColumnSection/SplitColumnSection';
import moment from 'moment';
// icons
import {
  FaHome,
  FaLock,
  FaUnlock,
  FaUsers,
  FaCalendarCheck,
  FaBath,
  FaCouch,
  FaParking,
  FaPaw,
  FaWifi,
  FaTv,
  FaSwimmer,
  FaCannabis,
} from 'react-icons/fa';
import { MdLocalLaundryService, MdKitchen } from 'react-icons/md';
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
      hasPrivateBath,
      hasFurnishedRoom,
      hasParkingIncluded,
      hasWasherDryerInUnit,
      hasPetsAllowed,
      hasWifi,
      hasCableTelevision,
      hasKitchenAccess,
      hasPoolAccess,
      hasDrugTolerantCohabitants,
    },
  } = useSelector((state) => state.post);
  // create list of amenities where value is only true
  const amenityList = [
    {
      title: 'Private Bathroom',
      value: hasPrivateBath,
      icon: <FaBath size='2rem' />,
    },
    {
      title: 'Furnished Bedroom',
      value: hasFurnishedRoom,
      icon: <FaCouch size='2rem' />,
    },
    {
      title: 'Parking On Premises',
      value: hasParkingIncluded,
      icon: <FaParking size='2rem' />,
    },
    {
      title: 'Washer/Dryer In Unit',
      value: hasWasherDryerInUnit,
      icon: <MdLocalLaundryService size='2rem' />,
    },
    {
      title: 'Pets Allowed',
      value: hasPetsAllowed,
      icon: <FaPaw size='2rem' />,
    },
    { title: 'Wifi', value: hasWifi, icon: <FaWifi size='2rem' /> },
    {
      title: 'Cable TV',
      value: hasCableTelevision,
      icon: <FaTv size='2rem' />,
    },
    {
      title: 'Full Kitchen Access',
      value: hasKitchenAccess,
      icon: <MdKitchen size='2rem' />,
    },
    {
      title: 'Swimming Pool',
      value: hasPoolAccess,
      icon: <FaSwimmer size='2rem' />,
    },
    {
      title: '420 Friendly',
      value: hasDrugTolerantCohabitants,
      icon: <FaCannabis size='2rem' />,
    },
  ].reduce((result, amenity) => {
    if (amenity.value) {
      result.push(amenity);
    }
    return result;
  }, []);

  return (
    <div>
      <h3>{title}</h3>
      <div className={styles.headerDetails}>
        <small className='mr-3 text-muted'>
          {moment(datePosted).fromNow()}
        </small>
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
              featureIcon={<FaHome size='2rem' />}
              featureContent={housingType}
            />
            <FeatureItem
              featureIcon={
                roomPrivacy ? <FaLock size='2rem' /> : <FaUnlock size='2rem' />
              }
              featureContent={roomPrivacy}
            />
          </Col>
          <Col sm={6}>
            <FeatureItem
              featureIcon={<FaUsers size='2rem' />}
              featureContent={`${
                numberOfCohabitants + 1
              } Total Inhabitants (Including You)`}
            />
            <FeatureItem
              featureIcon={<FaCalendarCheck size='2rem' />}
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
    </div>
  );
};

export default PostDetails;
