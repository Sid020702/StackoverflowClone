import React from 'react';
import './App.css';
import AllRoutes from './AllRoutes'
import Navbar from './components/navbar/navbar.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import Chatbot from './components/chatbot/chatbot.component';
import { fetchAllPosts } from './actions/posts';
function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUserReducer)
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPosts())
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
        {
          <Chatbot user={user} />

        }
      </Router>
    </div>
  );
}

export default App;
