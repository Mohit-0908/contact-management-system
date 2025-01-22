const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    mail: {
      type: String,
      required: [true, "Please add user mail"],
      unique: [true, "Email address already taken"], //unique is for not to repeat the mail
    },
    password: {
      type: String,
      required: [true, "Please enter the user password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserSchema", userSchema);

module.exports = User;
