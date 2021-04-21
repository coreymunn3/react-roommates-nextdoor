import * as yup from 'yup';

// reference for yup
// https://github.com/jquense/yup/issues/47#issuecomment-215588412
// +formik docs yup section

const postValidationSchema = yup.object({
  title: yup.string().min(5, 'Min 5 Chars').required('Required'),
  streetAddress: yup.string().required('Required'),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/, 'Must be Exactly 5 Numeric Digits')
    .required('Required'),
  rentMonthly: yup
    .number()
    .typeError('Must Be a Number')
    .min(0, 'Cannot Be Negative')
    .required('Required'),
  securityDeposit: yup
    .number()
    .typeError('Must Be a Number')
    .min(0, 'Cannot Be Negative')
    .required('Required'),
  totalMoveInCost: yup
    .number()
    .typeError('Must Be a Number')
    .min(0, 'Cannot Be Negative')
    .required('Required'),
  otherFeesMonthly: yup
    .number()
    .typeError('Must Be a Number')
    .min(0, 'Cannot Be Negative')
    .required('Required'),
  body: yup.string().min(10, 'Min 10 Chars').required('Required'),
  housingType: yup.string().required('Required'),
  roomPrivacy: yup.string().required('Required'),
  moveInDate: yup.date().required('Required'),
  numberOfCohabitants: yup
    .number()
    .typeError('Must Be a Number')
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
  featureImageUrl: yup.string().required(),
});

export default postValidationSchema;
