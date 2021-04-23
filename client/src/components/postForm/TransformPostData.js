import DeepDiff from 'deep-diff';
import { imageAPI } from '../../api';

// New Post Data requirements
// 1. Everything from formik form
// 2. 5 fields must be parsed to number data type
//    (numberCohab, securityDep, rentMonthly, totalMovein, otherFees)
// 3. featureImage must be an object with public_id and url from cloudinary
export const transformNewPostData = async (formValues) => {
  const transformedValues = { ...formValues };
  // upload the image
  const cloudinaryImageData = await uploadImageToCloudinary(
    formValues.featureImage.url
  );
  // change data types for Post model
  transformedValues.numberOfCohabitants = parseInt(
    formValues.numberOfCohabitants
  );
  transformedValues.rentMonthly = parseInt(formValues.rentMonthly);
  transformedValues.securityDeposit = parseInt(formValues.securityDeposit);
  transformedValues.totalMoveInCost = parseInt(formValues.totalMoveInCost);
  transformedValues.otherFeesMonthly = parseInt(formValues.otherFeesMonthly);
  transformedValues.featureImage = {
    public_id: cloudinaryImageData.public_id,
    url: cloudinaryImageData.url,
  };
  return transformedValues;
};

// Edit Post Data Requirements:
// 1. Post Id (from mongo)
// 2. User Id (of original posting user), so that backend can compare
//    Posting user with logged in user
// 3. Any other data that has changed in the edit form
export const constructEditObject = async (initialValues, formikValues) => {
  const differences = DeepDiff(initialValues, formikValues);
  let editObj = {};
  // no differences, exit
  // handle in submit method
  if (typeof differences === 'undefined') {
    return null;
  }
  // lhs = initial values
  // rhs = formik values
  // values from formik will be used for final postEditData
  differences.forEach(({ lhs, rhs, path }) => {
    // object depth will never be greater than 1 nested object
    // in other words... path array length of 2 is the most possible
    if (path.length === 2) {
      const outerKey = path[0];
      const innerKey = path[1];
      // construct the nested object
      editObj[outerKey] = { [innerKey]: rhs };
    } else {
      // otherwise, just use the single path array item as the key
      editObj[path[0]] = rhs;
    }
    // add the post ID & user Data (even though it doesn't change)
    editObj['_id'] = formikValues._id;
    editObj['_user'] = formikValues._user;
  });
  // if there's a new image, upload that one
  if (editObj.featureImage) {
    const cloudinaryImageData = await uploadImageToCloudinary(
      editObj.featureImage.url
    );
    editObj.featureImage = {
      public_id: cloudinaryImageData.public_id,
      url: cloudinaryImageData.url,
    };
  }
  return editObj;
};

const uploadImageToCloudinary = async (featureImageUrl) => {
  // featureImageUrl is as base64 encoded image
  const { data: cloudinaryImage } = await imageAPI.upload({
    type: 'post',
    base64Image: featureImageUrl,
  });
  return cloudinaryImage;
};
