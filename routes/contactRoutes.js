const express = require('express');
const router = express.Router();
const { getAllContacts,
    createContact,
    deleteContact,
    getContactbyid,
    updateContact } = require("../controllers/contactController");
const validateToken = require('../middleware/validateToken');

router.use(validateToken);

router.route("/").get(getAllContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContactbyid);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;