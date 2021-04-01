import React from 'react';
import styles from './postDetails.module.scss';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailSection from '../layout/detailSection/DetailSection';
import FeatureItem from '../layout/featureItem/FeatureItem';
import SplitColumnSection from '../layout/splitColumnSection/SplitColumnSection';
import moment from 'moment';
import transformAmenities from '../../utils/transformAmenities';
// icons
import {
  FaHome,
  FaLock,
  FaUnlock,
  FaUsers,
  FaCalendarCheck,
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
      ...otherDetails
    },
  } = useSelector((state) => state.post);

  const amenityList = transformAmenities(otherDetails);

  return (
    <div>
      <h3>{title}</h3>
      <div className={styles.headerDetails}>
        <small className='mr-3 text-muted'>{`${moment(
          datePosted
        ).fromNow()}, by user ...`}</small>
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
