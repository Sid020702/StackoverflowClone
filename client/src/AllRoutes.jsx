import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home.component'
import Auth from './pages/auth/auth.component'
import AskQuestion from './pages/ask-question/ask-question.component'
import Questions from './components/home-mainbar/questions.component'
import DisplayQuestion from './pages/questions/display-question.component'
import Tags from './pages/tags/tags.component'
import Users from './pages/users/users.component'
import UserProfile from './pages/user-profile/user-profile.component'
import Subscribe from './pages/subscribe/subscribe.component'
import Posts from './pages/posts/posts.component'
import AddPost from './pages/add-post/add-post.component'
import Friends from './pages/friends/friends.component'
const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Auth" element={<Auth />} />
            <Route exact path="/Questions" element={<Questions />} />
            <Route exact path="/AskQuestion" element={<AskQuestion />} />
            <Route exact path="/AddPost" element={<AddPost />} />
            <Route exact path="/Questions/:id" element={<DisplayQuestion />} />
            <Route exact path="/Tags" element={<Tags />} />
            <Route exact path="/Users" element={<Users />} />
            <Route exact path="/User/:id" element={<UserProfile />} />
            <Route exact path="/Subscribe" element={<Subscribe />} />
            <Route exact path="/Posts" element={<Posts />} />
            <Route exact path="/Friends" element={<Friends />} />
        </Routes>
    )
}

export default AllRoutes