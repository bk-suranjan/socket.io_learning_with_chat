import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password must be at least 6 characters"]
    },

    // ✔️ Friend list (not single friend)
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    // ✔️ Friend Requests
    friendRequest: [
        {
            to: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            from: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            status: {
                type: String,
                enum: [
                    "friend",
                    "friendRequestSend",
                    "pending",
                    "friendRequestAccepted"
                ],
                default: "pending"
            }
        }
    ]
}, { timestamps: true });


// ✔️ Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    try {
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password)
    // return next()
    } catch (error) {
        next(error);
    }
});


// ✔️ Compare Password
userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
    }
};


// ✔️ Generate Token
userSchema.methods.genToken = function () {
    try {
        return jwt.sign(
            { userName: this.userName, email: this.email, id: this._id },
            "This_is_secret",
            { expiresIn: "7d" }
        );
    } catch (error) {
        console.log(error);
    }
};


const User = mongoose.model("User", userSchema);
export default User;
