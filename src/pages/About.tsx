import React from 'react';
import '../styles/About.css';
import '../styles/App.css';
import picture from '../images/profile.png';

function About() {
  return (
    <div id="about" className="page about-container">
      <div className="left main-shadow">
        <div className="about-header">
          <h1>Paul Edelman</h1>
          <img className="mobile-profile-pic" src={picture} alt="Paul Edelman"/>
        </div>
        <h3>Software Engineer | Distributed Systems | Beach Lifeguard</h3>
        <p className='intro'>
          &emsp;I am a Computer Science and Applied Mathematics student at the University of Delaware, graduating May 2027.
          I gravitate toward the parts of a system most people don't have to think about: consensus protocols, container
          internals, the layer under the framework. Between coursework, 300+ LeetCode problems, and internships at
          DELJIS and AirGreen, I've built everything from fault-tolerant distributed systems to real-time data pipelines.
          The heart of my professional interests involve seeing real outcomes from my programming, whether that be a
          system staying available under failure or a fine-tuned neural network.
        </p>
      </div>
      <div className="right main-shadow" style={{borderRadius: '8px'}}>
        <img style={{borderRadius: '8px'}} src={picture} alt="Paul Edelman"/>
      </div>
    </div>
  );
}

export default About; 