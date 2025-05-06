import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/Login'
import NavBar from './components/Navbar';
import SignUp from './components/Signup';
import Home from './components/Home';
import React,{useState} from 'react';

function App() {
  const [darkMode,setDarkMode]=useState(false);

    const toggle = () => {
       
        setDarkMode(!darkMode);

    }

  return (
    <Router>
      <NavBar toggleMode={toggle} darkMode={darkMode}/>
      <Routes>
        <Route path="/" element={<LogIn Mode={darkMode}/>} />
        <Route path="/register" element={<SignUp Mode={darkMode}/>} />
        <Route path='/home' element={<Home Mode={darkMode}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
