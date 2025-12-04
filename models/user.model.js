import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
    },

    lastName:{
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

     phoneNo: {
        type: String, // FIXED
        required: [true, "Phone-number is required"],
        unique: true,
        trim: true,
        minlength: [10, "Phone-number must be at least 10 characters"],
        maxlength: [15, "Phone-number must not exceed 15 characters"],
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    },

   password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [10, "Password must be at least 10 characters"],
  match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{10,}$/,
    "Password must contain uppercase, lowercase, digit, and special character."
  ],
},
},
{
    timestamps: true,
});

 
const user = mongoose.model("User", userSchema);

export default user;