import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
    },

    LastName:{
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: [5, "Email must be at least 5 characters"],
        match: [/\S+@\S+\.\S+/, ], 
    },

    mobileNo:{
        type: Number,
        unique: true,
        trim: true,
        maxlength: [10, "Phone-number must be at least 10 characters"],
        match: [/^\+?[1-9]\d{1,14}$/],
        required:[ true, "Phone-number is required"]
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minLength: [8, "Password must be at least 5 characters" ],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{10,}$/
        , "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."],
    },
},
{
    timestamps: true,
});
 
const user = mongoose.model("User", userSchema);

export default user;