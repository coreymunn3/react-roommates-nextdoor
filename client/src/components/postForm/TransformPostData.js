const submitPostData = (formValues, featureImage) => {
  // change data types for Post model
  formValues.numberOfCohabitants = parseInt(formValues.numberOfCohabitants);
  formValues.rentMonthly = parseInt(formValues.rentMonthly);
  formValues.securityDeposit = parseInt(formValues.securityDeposit);
  formValues.totalMoveInCost = parseInt(formValues.totalMoveInCost);
  formValues.otherFeesMonthly = parseInt(formValues.otherFeesMonthly);
  formValues.moveInDate = parseDate(formValues.moveInDate);
  const postFormData = {
    ...formValues,
    featureImage,
  };
  return postFormData;
};

const parseDate = (dateString) => {
  const [yyyy, mm, dd] = dateString.split('-');
  return new Date(yyyy, mm - 1, dd);
};

export default submitPostData;
