import React from 'react';
import '../styles/About.css';
import '../styles/App.css';
import picture from '../images/profile.png';

function About() {
  return (
    <div id="about" className="page about-container">
      <div className="left main-shadow">
        <h1>Paul Edelman</h1>
        <h3>Programmer | Data Scientist | Beach Lifeguard</h3>
        <p className='white-box intro'>
          &emsp;I am a Computer Science and Applied Mathematics student at the University of Delaware. 
          Going into my sophomore year, I am excited for the new opportunities that will come my way. I've always loved computers, 
          and for the past 3 years programming has been my outlet. With school, personal projects, Leetcode, and a research position 
          at Delaware State University, I’ve immersed myself in the world of computer science. The heart of my professional 
          interests involve seeing real outcomes from my programming, whether that be in machinery or a fine-tuned neural network.
        </p>
      </div>
      <div className="right main-shadow" style={{borderRadius: '20px'}}>
        <img style={{borderRadius: '20px'}} src={picture} alt="Paul Edelman"/>
      </div>
    </div>
  );
}

export default About; 