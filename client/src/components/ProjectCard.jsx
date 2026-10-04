import { useState } from 'react';
import { GithubIcon, ExternalIcon } from './Icons.jsx';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const highlights = project.highlights || [];
  const shown = expanded ? highlights : highlights.slice(0, 3);

  return (
    <article className="card project-card">
      {project.imageUrl && (
        <img className="project-img" src={project.imageUrl} alt={`${project.title} screenshot`} />
      )}

      <div className="project-head">
        <div>
          <h3>{project.title}</h3>
          {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
        </div>
        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="Source code on GitHub">
              <GithubIcon />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo">
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      {project.description && <p className="project-desc">{project.description}</p>}

      {shown.length > 0 && (
        <ul className="project-highlights">
          {shown.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
      {highlights.length > 3 && (
        <button className="link-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : `+ ${highlights.length - 3} more`}
        </button>
      )}

      <div className="tags">
        {(project.techStack || []).map((t) => (
          <span className="tag mono" key={t}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
