import React from 'react';
import '../styles/Contact.css';
import Links from '../components/Links'; 

function Contact() {
  return (
    <div id="contact" className='page contact-container main-shadow'>
      <div className='name'>Contact</div>
      <div className="white-box contact-body">
        <p>Located in <br></br>Newark, DE</p>
        <a href="/assets/Edelman_Resume_F25.pdf" download="Edelman Resume.pdf">
            Download Resume
        </a>
        
      </div>
      <Links size="64"></Links>
    </div>
      
  );
}

export default Contact; 