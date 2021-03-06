import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
// formik stuff, submission helpers
import { useFormik } from 'formik';
import postValidationSchema from './validationSchema';
import initialEmptyValues from './initialEmptyValues';
import { transformNewPostData, constructEditObject } from './TransformPostData';
// components
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import InputField from '../inputField/InputField';
import InputFieldSelect from '../inputFieldSelect/InputFieldSelect';
import InputFile from '../inputFile/InputFile';
// mappable arrays for form options
import {
  housingOptions,
  privacyOptions,
  amenitiesOptions,
} from './formOptions';
import styles from './postForm.module.scss';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createPost, editPost } from '../../redux/postSlice';

const PostForm = ({ edit, initialValues }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, isError, newPost, errorMessage } = useSelector(
    (state) => state.post
  );
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    isSubmitting,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: edit ? initialValues : initialEmptyValues,
    validationSchema: postValidationSchema,
    onSubmit: async (values, actions) => {
      if (edit) {
        // determine what values if any have changed, using DeepDiff comparison
        const editPostData = await constructEditObject(initialValues, values);
        // submit the data
        dispatch(editPost(editPostData));
        // clear values
        actions.resetForm();
        actions.setSubmitting(false);
      }
      // else, create a new post
      else {
        // transform data and upload image to cloudinary
        const newPostData = await transformNewPostData(values);
        // submit the data
        dispatch(createPost(newPostData));
        actions.setSubmitting(false);
      }
    },
  });

  // effect to control the results of the submission and subsequent post state change
  useEffect(() => {
    if (isError) {
      alert(errorMessage);
    }
    if (!isError && newPost) {
      resetForm();
      history.push('/feed');
    }
  }, [isLoading, newPost]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId='formGridTitle'>
          <InputField
            label='Title'
            type='text'
            name='title'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.title && errors.title}
            error={errors.title}
            length={values.title.length}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md={6} controlId='formGridStreetAddress'>
          <InputField
            label='Street Address'
            type='text'
            name='streetAddress'
            disabled={edit}
            value={values.streetAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.streetAddress && errors.streetAddress}
            error={errors.streetAddress}
            length={values.streetAddress.length}
          />
          {edit && <Form.Text muted>post location cannot be changed</Form.Text>}
        </Form.Group>
        <Form.Group as={Col} md={6} controlId='formGridZipCode'>
          <InputField
            label='Zip Code'
            type='text'
            name='zipCode'
            disabled={edit}
            value={values.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.zipCode && errors.zipCode}
            error={errors.zipCode}
            length={values.zipCode.length}
          />
          {edit && <Form.Text muted>post location cannot be changed</Form.Text>}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={6} md={3}>
          <InputField
            label='Monthly Rent'
            type='number'
            name='rentMonthly'
            value={values.rentMonthly}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.rentMonthly && errors.rentMonthly}
            error={errors.rentMonthly}
          />
        </Form.Group>
        <Form.Group as={Col} sm={6} md={3}>
          <InputField
            label='Security Deposit'
            type='number'
            name='securityDeposit'
            value={values.securityDeposit}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.securityDeposit && errors.securityDeposit}
            error={errors.securityDeposit}
          />
        </Form.Group>
        <Form.Group as={Col} sm={6} md={3}>
          <InputField
            label='Total Move In'
            type='number'
            name='totalMoveInCost'
            value={values.totalMoveInCost}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.totalMoveInCost && errors.totalMoveInCost}
            error={errors.totalMoveInCost}
          />
        </Form.Group>
        <Form.Group as={Col} sm={6} md={3}>
          <InputField
            label='Other Monthly Costs'
            type='number'
            name='otherFeesMonthly'
            value={values.otherFeesMonthly}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.otherFeesMonthly && errors.otherFeesMonthly}
            error={errors.otherFeesMonthly}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId='formGridBody'>
          <InputField
            label='Description'
            as='textarea'
            name='body'
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Get people interested!'
            rows={4}
            isInvalid={touched.body && errors.body}
            error={errors.body}
            length={values.body.length}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md={6} controlId='formGridHousingType'>
          <InputFieldSelect
            label='Housing Type'
            as='select'
            name='housingType'
            value={values.housingType}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.housingType && errors.housingType}
            error={errors.housingType}
            length={values.housingType.length}
            options={housingOptions}
          />
        </Form.Group>
        <Form.Group as={Col} md={6} controlId='formGridRoomPrivacy'>
          <InputFieldSelect
            label='Is the Room Private?'
            as='select'
            name='roomPrivacy'
            value={values.roomPrivacy}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.roomPrivacy && errors.roomPrivacy}
            error={errors.roomPrivacy}
            options={privacyOptions}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId='formGridMoveInDate'>
          <InputField
            label='Move In Date'
            type='date'
            name='moveInDate'
            value={edit ? values.moveInDate.split('T')[0] : values.moveInDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.moveInDate && errors.moveInDate}
            error={errors.moveInDate}
          />
        </Form.Group>
        <Form.Group as={Col} md={6} controlId='formGridNumberCohabitants'>
          <InputField
            label='Number of Cohabitants/Housemates'
            type='number'
            name='numberOfCohabitants'
            value={values.numberOfCohabitants}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={
              touched.numberOfCohabitants && errors.numberOfCohabitants
            }
            error={errors.numberOfCohabitants}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId='formGridAmenities'>
          <Form.Label>What Amenities Does The Space Offer?</Form.Label>
          <div className={styles.checkboxContainer}>
            {amenitiesOptions.map((amenity, idx) => (
              <Form.Check
                key={idx}
                label={amenity.label}
                name={amenity.name}
                onChange={handleChange}
                value={values[amenity.name]}
                checked={values[amenity.name]}
              />
            ))}
          </div>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <InputFile
            label='Choose a Feature Image'
            name='featureImageUrl'
            value={values.featureImage?.url}
            onBlur={handleBlur}
            error={errors.featureImage?.url}
            touched={touched.featureImage?.url}
            multiple={false}
            onDone={({ base64 }) => {
              setFieldValue('featureImage.url', base64);
            }}
          />
        </Form.Group>
      </Form.Row>

      {/* TODO: create a thumbnail component for this. */}
      {values.featureImage?.url && (
        <img src={values.featureImage?.url} style={{ height: '100px' }} />
      )}

      <Form.Row>
        <Form.Group as={Col}>
          <p>
            **Please Note, when you submit this post, others will have a chance
            to contact you via your email listed under your user profile.
          </p>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Button
            type='submit'
            className={styles.submitButton}
            disabled={isSubmitting}
            block
          >
            {isSubmitting && <Spinner as='span' size='sm' animation='border' />}
            {isSubmitting ? (
              <span>{'Submitting Your Post...'}</span>
            ) : (
              <span>{'Submit'}</span>
            )}
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default PostForm;
