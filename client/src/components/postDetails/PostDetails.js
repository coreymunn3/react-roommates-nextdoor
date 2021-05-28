import React, { useState } from 'react';
import styles from './postDetails.module.scss';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import DetailSection from '../layout/detailSection/DetailSection';
import SplitColumnSection from '../layout/splitColumnSection/SplitColumnSection';
import Map from '../map/Map';
import FullHeightContainer from '../layout/fullHeightContainer/FullHeightContainer';
import { Image, Placeholder } from 'cloudinary-react';
import moment from 'moment';
import transformAmenities from '../../utils/transformAmenities';
import CaptchaModal from '../captchaModal/CaptchaModal';
import useWindowDimensions from '../../hooks/WindowDimensions';
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
  const [captchaOpen, setCapthcaOpen] = useState(false);
  const { currentPost, isLoading } = useSelector((state) => state.post);
  const { width } = useWindowDimensions();

  const iconSize = '1.5rem';
  const descriptionList = [
    {
      title: currentPost.housingType,
      icon: <FaHome size={iconSize} />,
    },
    {
      title: currentPost.roomPrivacy,
      icon:
        currentPost.roomPrivacy === 'Room Private' ? (
          <FaLock size={iconSize} />
        ) : (
          <FaUnlock size={iconSize} />
        ),
    },
    {
      title: `${currentPost.numberOfCohabitants} Other Person(s) (${
        currentPost.numberOfCohabitants + 1
      } Total Residents)`,
      icon: <FaUsers size={iconSize} />,
    },
    {
      title: `Move In ${new Date(
        currentPost.moveInDate
      ).toLocaleDateString()}, ${moment(currentPost.moveInDate).fromNow()}`,
      icon: <FaCalendarCheck size={iconSize} />,
    },
  ];
  const amenityList = transformAmenities(currentPost, iconSize);
  const costList = [
    {
      title: `Total Move In Cost $${currentPost.totalMoveInCost}`,
      icon: <FaDollarSign size={iconSize} />,
    },
    {
      title: `Monthly Rent $${currentPost.rentMonthly}`,
      icon: <FaDollarSign size={iconSize} />,
    },
    {
      title: `Security Deposit $${currentPost.securityDeposit}`,
      icon: <FaDollarSign size={iconSize} />,
    },
    {
      title: `Other Monthly Expenses (approx) $${currentPost.otherFeesMonthly}`,
      icon: <FaDollarSign size={iconSize} />,
    },
  ];

  const mapCircle = {
    center: currentPost.geographicCoordinates,
    radius: 400,
    options: {
      strokeColor: '#ff0000',
    },
  };

  if (isLoading) {
    return (
      <FullHeightContainer>
        <Spinner animation='border' variant='dark' />
      </FullHeightContainer>
    );
  } else {
    return (
      <div>
        <h3>{currentPost.title}</h3>
        <div className={styles.headerDetails}>
          <small className='mr-3 text-muted'>
            {`${moment(currentPost.datePosted).fromNow()}, by ${
              currentPost.postingUser?.username
            }`}
          </small>
          <small className='mr-3 text-muted'>{`${currentPost.likeCount} likes`}</small>
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.featureImage}
            publicId={currentPost.featureImage?.public_id}
            width={Math.round(width / 100) * 100}
            crop='scale'
          >
            <Placeholder type='blur' />
          </Image>
        </div>

        <DetailSection title='Room Description'>
          <p>{currentPost.body}</p>
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
            Interested and Looking to take the next steps? Contact the poster
            below to get started
          </p>
          <Button onClick={() => setCapthcaOpen(true)}>Message Author</Button>
        </DetailSection>

        <CaptchaModal
          open={captchaOpen}
          title='Contact Post Owner'
          handleClose={() => setCapthcaOpen(false)}
          userInfo={currentPost._user}
        />
      </div>
    );
  }
};

export default PostDetails;
