const mongoose =
    require("mongoose");

const certificateSchema =
    new mongoose.Schema(

        {

            certificateId: {

                type: String,

                required: true,

                unique: true,

                trim: true

            },

            recipientName: {

                type: String,

                required: true,

                trim: true

            },

            courseName: {

                type: String,

                required: true,

                trim: true

            },

            issueDate: {

                type: String,

                required: true

            },

            template: {

                type: String,

                required: true,

                enum: [

                    "modern",

                    "classic",

                    "premium"

                ]

            }

        },

        {

            timestamps: true

        }

    );

module.exports =
    mongoose.model(
        "Certificate",
        certificateSchema
    );