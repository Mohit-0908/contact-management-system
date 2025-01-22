const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add your contact name"],
    },
    mail: {
      type: String,
      required: [true, "Please add your contact mail"],
    },
    mobile: {
      type: String,
      required: [true, "Please add your mobile no"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);
