import DeepDiff from 'deep-diff';

// New Post Data requirements
// 1. Everything from formik form
// 2. 5 fields must be parsed to number data type
//    (numberCohab, securityDep, rentMonthly, totalMovein, otherFees)
// 3. featureImage must be an object with public_id and url from cloudinary
export const transformNewPostData = (formValues, cloudinaryImage) => {
  // change data types for Post model
  formValues.numberOfCohabitants = parseInt(formValues.numberOfCohabitants);
  formValues.rentMonthly = parseInt(formValues.rentMonthly);
  formValues.securityDeposit = parseInt(formValues.securityDeposit);
  formValues.totalMoveInCost = parseInt(formValues.totalMoveInCost);
  formValues.otherFeesMonthly = parseInt(formValues.otherFeesMonthly);
  formValues.featureImage = {
    public_id: cloudinaryImage.public_id,
    url: cloudinaryImage.url,
  };
  return {
    ...formValues,
  };
};

// Edit Post Data Requirements:
// 1. Post Id (from mongo)
// 2. User Id (of original posting user), so that backend can compare
//    Posting user with logged in user
// 3. Any other data that has changed in the edit form
export const constructEditObject = (initialValues, formikValues) => {
  const differences = DeepDiff(initialValues, formikValues);
  console.log(initialValues);
  console.log(formikValues);
  let edits = {};
  // no differences, exit
  // handle in submit method
  if (typeof differences === 'undefined') {
    return null;
  }
  differences.forEach(({ lhs, rhs, path }) => {
    // lhs = initial values
    // rhs = formik values
    // values from formik will be used for post edit only
    // object depth will never be greater than 1 nested object
    // in other woreds... path array length of 2
    if (path.length === 2) {
      const outerKey = path[0];
      const innerKey = path[1];
      // construct the nested object
      edits[outerKey] = { [innerKey]: rhs };
    } else {
      // otherwise, just use the single path array item as the key
      edits[path[0]] = rhs;
    }
    // add the post ID & user Data (even though it doesn't change)
    edits['_id'] = formikValues._id;
    edits['_user'] = formikValues._user;
  });
  return edits;
};
