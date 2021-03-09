const validateSignup = ({
  // destructuring the newUser object
  username,
  password,
  confirmPassword,
  city,
  state,
}) => {
  if (!username || !password || !confirmPassword || !city || !state) {
    return 'Please Fill Out All Fields';
  }
  if (password !== confirmPassword) {
    return 'Passwords Do Not Match';
  }
};

export default validateSignup;
