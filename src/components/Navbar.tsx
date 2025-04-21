import React from 'react';
import '../styles/Navbar.css';
import Links from './Links';
import useSectionObserver from '../components/useSectionObserver';

const sectionIds = ['about', 'projects', 'experiences', 'contact'];

const Navbar: React.FC = () => {
  const activeSection = useSectionObserver(sectionIds);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-name">Paul Edelman</div>
      <div className="navbar-links">
        {sectionIds.map((id) => (
          <div
            key={id}
            onClick={() => scrollToSection(id)}
            className={`navbar-link ${activeSection === id ? 'active-link' : ''}`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </div>
        ))}
      </div>
      <Links size="60" />
    </nav>
  );
};

export default Navbar;
