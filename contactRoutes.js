const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validatetokenHandler");

const router = express.Router();

router.use(validateToken);
// router.route("/").get((req, res) => {
//     res.status(200).json({ message: "Get all contacts" });
//   }); so this was in routes then in controllers we take data from req,res and it will look like below.
router.route("/").get(getContacts).post(createContact);
// making coommon together so it will save the linnes
//? router.route("/").post(createContact);
//!get individual contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
// short version above single line
// router.route("/:id").get(getContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

module.exports = router;
