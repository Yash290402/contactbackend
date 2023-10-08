const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    {
        user_id:{
            type :mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User",
        },
    name: {
        type: 'string',
        required: [true, "please add the contact name"],
    },

    email: {
        type: 'string',
        required: [true, "please add the contact email address"],
    },

    phone: {
        type: 'string',
        required: [true, "please add the contact phone number"],
    },
}, 
{
    timetamps:true,
});

module.exports =mongoose.model("Contact",contactSchema);
