import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    phone:{
        type: Number,
        required : true

    },
    email:{
        type: String,
        required : true
    },
    remarks:{
        type: String,
        required : true
    }
})

export default mongoose.model("contactusform",userSchema);