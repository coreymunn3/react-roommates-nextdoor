import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
// components
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ElevatedSection from '../layout/elevatedSection/ElevatedSection';
import InputField from '../inputField/InputField';
import InputFieldSelect from '../inputFieldSelect/InputFieldSelect';
import FileBase64 from 'react-file-base64';
// mappable arrays for form options
import { housingOptions, amenities } from './formOptions';
import styles from './postForm.module.scss';

const PostForm = () => {
  const [featureImage, setFeatureImage] = useState('');
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isValid,
    errors,
  } = useFormik({
    initialValues: {
      title: '',
      streetAddress: '',
      zipCode: '',
      body: '',
      rentMonthly: '',
      securityDeposit: '',
      totalMoveInCost: '',
      otherFeesMonthly: '',
      housingType: '',
      moveInDate: '',
      numberOfCohabitants: '',
      hasPrivateBath: false,
      hasFurnishedRoom: false,
      hasParkingIncluded: false,
      hasWasherDryerInUnit: false,
      hasPetsAllowed: false,
      hasWifi: false,
      hasCableTelevision: false,
      hasKitchenAccess: false,
      hasPoolAccess: false,
      hasDrugTolerantCohabitants: false,
    },
    validationSchema: yup.object({
      title: yup.string().min(5, 'Min 5 Chars').required('Required'),
      streetAddress: yup.string().required('Required'),
      zipCode: yup.string().min(5, '5 Digit Zip').required('Required'),
      rentMonthly: yup
        .number()
        .min(0, 'Cannot Be Negative')
        .required('Required'),
      securityDeposit: yup
        .number()
        .min(0, 'Cannot Be Negative')
        .required('Required'),
      totalMoveInCost: yup
        .number()
        .min(0, 'Cannot Be Negative')
        .required('Required'),
      otherFeesMonthly: yup
        .number()
        .min(0, 'Cannot Be Negative')
        .required('Required'),
      body: yup.string().min(10, 'Min 10 Chars').required('Required'),
      housingType: yup.string().required('Required'),
      moveInDate: yup.date().required('Required'),
      numberOfCohabitants: yup
        .number()
        .min(0, 'Cannot Be Negative')
        .required('Required'),
      hasPrivateBath: yup.boolean(),
      hasFurnishedRoom: yup.boolean(),
      hasParkingIncluded: yup.boolean(),
      hasWasherDryerInUnit: yup.boolean(),
      hasPetsAllowed: yup.boolean(),
      hasWifi: yup.boolean(),
      hasCableTelevision: yup.boolean(),
      hasKitchenAccess: yup.boolean(),
      hasPoolAccess: yup.boolean(),
      hasDrugTolerantCohabitants: yup.boolean(),
    }),
    onSubmit: (values) => {
      console.log(values);
      console.log(featureImage);
    },
  });
  return (
    <ElevatedSection>
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
              value={values.streetAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.streetAddress && errors.streetAddress}
              error={errors.streetAddress}
              length={values.streetAddress.length}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} controlId='formGridZipCode'>
            <InputField
              label='Zip Code'
              type='text'
              name='zipCode'
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.zipCode && errors.zipCode}
              error={errors.zipCode}
              length={values.zipCode.length}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={6} md={3}>
            <InputField
              label='Monthly Rent'
              type='text'
              name='rentMonthly'
              values={values.rentMonthly}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.rentMonthly && errors.rentMonthly}
              error={errors.rentMonthly}
            />
          </Form.Group>
          <Form.Group as={Col} sm={6} md={3}>
            <InputField
              label='Security Deposit'
              type='text'
              name='securityDeposit'
              values={values.securityDeposit}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.securityDeposit && errors.securityDeposit}
              error={errors.securityDeposit}
            />
          </Form.Group>
          <Form.Group as={Col} sm={6} md={3}>
            <InputField
              label='Total Move In'
              type='text'
              name='totalMoveInCost'
              values={values.totalMoveInCost}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.totalMoveInCost && errors.totalMoveInCost}
              error={errors.totalMoveInCost}
            />
          </Form.Group>
          <Form.Group as={Col} sm={6} md={3}>
            <InputField
              label='Other Monthly Fees'
              type='text'
              name='otherFeesMonthly'
              values={values.otherFeesMonthly}
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
          <Form.Group as={Col} md={6} controlId='formGridNumberCohabitants'>
            <InputField
              label='Number of Cohabitants/Housemates'
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
          <Form.Group as={Col} controlId='formGridMoveInDate'>
            <InputField
              label='Move In Date'
              type='date'
              name='moveInDate'
              value={values.moveInDate}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.moveInDate && errors.moveInDate}
              error={errors.moveInDate}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridAmenities'>
            <Form.Label>What Amenities Does The Space Offer?</Form.Label>
            <div className={styles.checkboxContainer}>
              {amenities.map((amenity, idx) => (
                <Form.Check
                  key={idx}
                  label={amenity.label}
                  name={amenity.name}
                  onChange={handleChange}
                  value={values[amenity.name]}
                />
              ))}
            </div>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Choose A Feature Image</Form.Label>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFeatureImage(base64)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <p>
              **Please Note, when you submit this post, others will have a
              change to contact you via your email listed under your user
              profile.
            </p>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Button type='submit' block>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </ElevatedSection>
  );
};

export default PostForm;
