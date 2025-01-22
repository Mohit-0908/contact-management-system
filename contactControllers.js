const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//!@desc GET ALL CONTACTS
//? @ route GET/api/contacts
// @access PRIVATE
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//!@desc CREATE CONTACTS
//? @ route POST/api/contacts
// @access PRIVATE
const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is", req.body);
  const { name, mail, mobile } = req.body;
  if (!name || !mail || !mobile) {
    res.status(400);
    // console.log("All fields are mandatory");
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    mail,
    mobile,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//!@desc GET A CONTACT
// ?@ route GET/api/contacts/:id
// @access PRIVATE
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  res.status(200).json(contact);
});

//!@desc UPDATE CONTACTS
//? @ route PUT/api/contacts/:id
// @access PRIVATE
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.send(403);
    throw new Error("User dont have permission to update another user contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//!@desc DELETE CONTACTS
// ?@ route DELETE/api/contacts/:id
// @access PRIVATE
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.send(403);
    throw new Error("User dont have permission to delete another user contact");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
