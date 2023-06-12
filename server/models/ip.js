import mongoose from "mongoose";

const IPModel = mongoose.Schema({
    ip_address: { type: String, required: true },
    city: { type: String, required: true }
})

export default mongoose.model("IP", IPModel)