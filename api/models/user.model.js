import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/imgres?q=profile%20image%20pixabey&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&tbnid=IFTclT_pNlD0eM&vet=12ahUKEwiA4Kiv37aNAxXoUaQEHbvIKUcQM3oECB4QAA..i&w=720&h=720&hcb=2&ved=2ahUKEwiA4Kiv37aNAxXoUaQEHbvIKUcQM3oECB4QAA"
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;