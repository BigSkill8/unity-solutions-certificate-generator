const bcrypt =
    require("bcryptjs");

const mongoose =
    require("mongoose");

const dotenv =
    require("dotenv");

const Admin =
    require("./models/Admin");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI
);

async function createAdmin() {

    const hashedPassword =
        await bcrypt.hash(
            "Admin123",
            10
        );

    const admin =
        new Admin({

            email:
                "admin@unitysolutions.com",

            password:
                hashedPassword

        });

    await admin.save();

    console.log(
        "Admin Created"
    );

    process.exit();

}

createAdmin();