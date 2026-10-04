import { useState } from 'react';

const links = ['about', 'skills', 'projects', 'education', 'achievements', 'contact'];

export default function Navbar({ resumeUrl }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="logo" aria-label="Home">
          <span className="logo-mark">SM</span>
          <span className="logo-text">Sarikella Madhu</span>
        </a>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          {resumeUrl && (
            <a className="btn btn-sm btn-outline" href={resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
