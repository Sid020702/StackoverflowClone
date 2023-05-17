import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    postTitle: { type: String, required: "Question must have a title" },
    postUrl: { type: String, required: "Post must have a URL" },
    postContent: { type: String, required: "Question must have a body" },
    postTags: { type: [String], required: "Question must have tag" },
    noOfLikes: { type: Number, default: 0 },
    userPosted: { type: String, required: "Question must have an author" },
    usersLiked: { type: [String], default: [] },
    userId: { type: String },
    type: { type: String },
    postedOn: { type: Date, default: Date.now }
})

export default mongoose.model('Post', PostSchema)