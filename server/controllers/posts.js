import Posts from '../models/posts.js'
import mongoose from 'mongoose'
export const addPost = async (req, res) => {
    const addPostData = req.body
    const addPost = new Posts(addPostData)
    try {
        await addPost.save()
        res.status(200).json({ message: "Post added successfully" })
    } catch (error) {
        res.status(409).json({ message: "Couldn't add a new Post" })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const postList = await Posts.find()
        res.status(200).json(postList)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    console.log("Works")
    const { id: _id } = req.params
    const { value, userId } = req.body
    try {
        const post = await Posts.findById(_id)
        console.log(post.noOfLikes)

        if (value == 'unlike') {
            post.usersLiked = post.usersLiked.filter(id => id !== String(userId))
            post.noOfLikes -= 1;
        }
        else if (value == 'like') {
            post.usersLiked.push(userId)
            post.noOfLikes += 1;
        }
        await Posts.findByIdAndUpdate(_id, post)
        res.status(200).json({ message: "Liked/Unliked succesffuly" })
    } catch (error) {
        res.status(404).json({ message: "Post not found" })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send("Post unavailable")
    }
    try {
        await Posts.findByIdAndDelete(_id)
        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}