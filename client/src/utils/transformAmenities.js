// solution similar to
// https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map/51059280

import {
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
const transformAmenities = (details) => {
  const {
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
  } = details;

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
  ];
  return amenityList.reduce((result, amenity) => {
    if (amenity.value) {
      result.push(amenity);
    }
    return result;
  }, []);
};

export default transformAmenities;
