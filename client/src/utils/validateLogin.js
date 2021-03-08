const validateLogin = ({
  // destructuring the newUser object
  username,
  password,
}) => {
  if (!username || !password) {
    return "Please Fill Out All Fields";
  }
};

export default validateLogin;
