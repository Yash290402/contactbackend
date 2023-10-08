const asynchandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//description for get all contacts
//route GET /api/contacts
//access public

const getAllContacts = asynchandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(Contact);
});

//description for get new contacts
//route post /api/contacts
//access public

const createContact = asynchandler(async (req, res) => {
    console.log("req body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are required")
    }

    const contacts = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contacts);
});

//description for delete contacts
//route delete /api/contacts/:id
//use id to delete
//access public

const deleteContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});

//description for get contacts by id
//route get /api/contacts/:id
//use id to get contacts
//access public

const getContactbyid = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//description for update contacts by id
//route update /api/contacts/:id
//use id to get contacts
//access public

const updateContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(contact);
});


module.exports = {
    getAllContacts,
    createContact,
    deleteContact,
    getContactbyid,
    updateContact
};