import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Projects from './pages/Projects';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';

function App() {
  return (
    <div className='app'>
      <Navbar></Navbar>
      <div className='content'>
        <About></About>
        <Projects></Projects>
        <Experiences></Experiences>
        <Contact></Contact>
      </div>
    </div>
  );
}

export default App;