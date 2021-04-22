import DeepDiff from 'deep-diff';

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

export const constructEditObject = (initialValues, formikValues) => {
  const differences = DeepDiff(initialValues, formikValues);
  let edits = {};
  // no differences, exit
  // handle in submit method
  if (typeof differences === 'undefined') {
    return null;
  }
  differences.forEach(({ lhs, rhs, path }) => {
    const fullPath = buildFullObjectPath(path);
    edits[fullPath] = rhs;
  });
  return edits;
};

const buildFullObjectPath = (pathArr) => {
  let fullPath = '';
  pathArr.forEach((item) => {
    fullPath = fullPath + '.' + item;
  });
  return fullPath.substring(1);
};
