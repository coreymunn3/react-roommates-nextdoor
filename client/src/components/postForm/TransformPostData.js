const transformPostData = (formValues, cloudinaryImage) => {
  // change data types for Post model
  formValues.numberOfCohabitants = parseInt(formValues.numberOfCohabitants);
  formValues.rentMonthly = parseInt(formValues.rentMonthly);
  formValues.securityDeposit = parseInt(formValues.securityDeposit);
  formValues.totalMoveInCost = parseInt(formValues.totalMoveInCost);
  formValues.otherFeesMonthly = parseInt(formValues.otherFeesMonthly);
  // formValues.moveInDate = parseDate(formValues.moveInDate);
  formValues.featureImage = {
    public_id: cloudinaryImage.public_id,
    url: cloudinaryImage.url,
  };
  return {
    ...formValues,
  };
};

const parseDate = (dateString) => {
  const [yyyy, mm, dd] = dateString.split('-');
  const formattedDate = new Date(yyyy, mm - 1, dd);
  console.log(formattedDate);
  return formattedDate;
};

export default transformPostData;
