import * as yup from 'yup';

const postValidationSchema = yup.object({
  title: yup.string().min(5, 'Min 5 Chars').required('Required'),
  streetAddress: yup.string().required('Required'),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/, 'Must be exactly 5 Digits')
    .required('Required'),
  rentMonthly: yup.number().min(0, 'Cannot Be Negative').required('Required'),
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
});

export default postValidationSchema;
