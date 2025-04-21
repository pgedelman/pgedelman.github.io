import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; 
import '../styles/Links.css';

function Links({size}: {size: string}) {
  return (
    <div className="link-container">
        <a
            className="link-button"
            href="https://www.linkedin.com/in/paul-edelman/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            >
              {
              // @ts-ignore
            <FaLinkedin size={size} color={"#0072b1"} />
              }
        </a>
        <a
            className="link-button"
            href="https://github.com/pgedelman"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            >
            {
              // @ts-ignore
              <FaGithub size={size} color={"#000000"} />
            }
        </a>
        <a
            className="link-button"
            href="https://www.instagram.com/pedelman2/#"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            >
            {
              // @ts-ignore
              <FaInstagram size={size} color={"#5b51d8"} /> 
            }
        </a>
    </div>
  );
}

export default Links;
