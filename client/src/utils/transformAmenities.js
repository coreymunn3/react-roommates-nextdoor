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
const transformAmenities = (details, iconSize) => {
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
      icon: <FaBath size={iconSize} />,
    },
    {
      title: 'Furnished Bedroom',
      value: hasFurnishedRoom,
      icon: <FaCouch size={iconSize} />,
    },
    {
      title: 'Parking On Premises',
      value: hasParkingIncluded,
      icon: <FaParking size={iconSize} />,
    },
    {
      title: 'Washer/Dryer In Unit',
      value: hasWasherDryerInUnit,
      icon: <MdLocalLaundryService size={iconSize} />,
    },
    {
      title: 'Pets Allowed',
      value: hasPetsAllowed,
      icon: <FaPaw size={iconSize} />,
    },
    { title: 'Wifi', value: hasWifi, icon: <FaWifi size={iconSize} /> },
    {
      title: 'Cable TV',
      value: hasCableTelevision,
      icon: <FaTv size={iconSize} />,
    },
    {
      title: 'Full Kitchen Access',
      value: hasKitchenAccess,
      icon: <MdKitchen size={iconSize} />,
    },
    {
      title: 'Swimming Pool',
      value: hasPoolAccess,
      icon: <FaSwimmer size={iconSize} />,
    },
    {
      title: '420 Friendly',
      value: hasDrugTolerantCohabitants,
      icon: <FaCannabis size={iconSize} />,
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
