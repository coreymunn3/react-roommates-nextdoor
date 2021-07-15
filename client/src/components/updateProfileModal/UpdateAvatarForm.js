import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import InputFile from '../inputFile/InputFile';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/userSlice';
import { imageAPI } from '../../api';

import styles from './updateProfileModal.module.scss';

const UpdateAvatarForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const validationSchema = yup.object({
    avatar: yup.string().required('Required'),
  });
  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    setSubmitting,
    resetForm,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      avatar: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      // upload image to cloudinary & get back public URL
      const { data: cloudinaryImage } = await imageAPI.upload({
        type: 'avatar',
        base64Image: values.avatar,
      });
      console.log(cloudinaryImage);
      // construct avatar object
      const newAvatar = {
        avatar: {
          public_id: cloudinaryImage.public_id,
          url: cloudinaryImage.url,
        },
      };
      dispatch(updateProfile(newAvatar));
      setSubmitting(false);
      handleClose();
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <InputFile
            name='avatar'
            value={values.avatar}
            error={errors.avatar}
            touched={touched.avatar}
            onBlur={handleBlur}
            multiple={false}
            onDone={({ base64 }) => {
              setFieldValue('avatar', base64);
            }}
          />
        </Form.Group>
      </Form.Row>

      {/* Here is Where the Thumbnail Preview will go... */}

      <Button
        type='submit'
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <Spinner className='mx-2' as='span' size='sm' animation='border' />
        )}
        {isSubmitting ? (
          <span>{'Updating Your Profile...'}</span>
        ) : (
          <span>{'Submit'}</span>
        )}
      </Button>
    </Form>
  );
};

export default UpdateAvatarForm;
