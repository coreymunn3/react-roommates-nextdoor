const submitPostData = (formValues, featureImage) => {
  formValues.numberOfCohabitants = parseInt(formValues.numberOfCohabitants);
  const postData = {
    ...formValues,
    featureImage,
  };

  console.log(postData);
};

export default submitPostData;
