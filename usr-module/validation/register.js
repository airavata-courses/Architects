const isEmpty = require("./is_empty");
const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "firstName must be between 3 and 30 characters";
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "lastName must be between 3 and 30 characters";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "contactNumber is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password too short";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
