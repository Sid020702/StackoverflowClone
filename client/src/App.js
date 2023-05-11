import React from 'react';
import './App.css';
import AllRoutes from './AllRoutes'
import Navbar from './components/navbar/navbar.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import Chatbot from './components/chatbot/chatbot.component';
function App() {
  const dispatch = useDispatch()
  const widget = document.getElementById('launcher-svg-container')
  widget?.addEventListener('click', () => { console.log('Clicked') })
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
        {/* <Chatbot /> */}
      </Router>
    </div>
  );
}

export default App;
