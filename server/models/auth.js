import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String },
    tags: { type: [String] },
    plan: { type: String, default: "none" },
    asks: { type: Number, default: 1 },
    askedOn: { type: Date, default: Date.now },
    unlimited: { type: Boolean, default: false },
    joinedOn: { type: Date, default: Date.now },
    friends: { type: Object, default: {} },
    requests: { type: [Object] }

})

export default mongoose.model("User", userSchema)