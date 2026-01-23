import React, { useState } from 'react';
import '../styles/Navbar.css';
import Links from './Links';
import useSectionObserver from '../components/useSectionObserver';
import { FaBars, FaTimes } from 'react-icons/fa';

const sectionIds = ['about', 'projects', 'experiences', 'contact'];

const Navbar: React.FC = () => {
  const activeSection = useSectionObserver(sectionIds);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-name" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Paul Edelman
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? (
            // @ts-ignore
            <FaTimes />
          ) : (
            // @ts-ignore
            <FaBars />
          )}
        </div>

        <div className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {sectionIds.map((id) => (
            <div
              key={id}
              onClick={() => scrollToSection(id)}
              className={`nav-link ${activeSection === id ? 'active' : ''}`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
          ))}
          <div className="mobile-links">
            <Links size="50" />
          </div>
        </div>
        
        <div className="desktop-links">
          <Links size="55" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
