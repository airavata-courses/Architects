const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  skills: {
    type: String
  },
  email: {
    type: String
  },
  contactNumber: {
    type: String
  },
  userType: {
    type: String
  }, 
});

module.exports = Users = mongoose.model("user", UsersSchema);