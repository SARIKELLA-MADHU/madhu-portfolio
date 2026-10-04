import { useEffect, useState } from 'react';
import { api } from '../api.js';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getProfile(), api.getProjects()])
      .then(([p, pr]) => {
        setProfile(p);
        setProjects(pr);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="center-screen">
        <p className="error-text">Couldn't load the portfolio: {error}</p>
        <p className="muted">Make sure the API server is running and the database is seeded.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="center-screen">
        <div className="loader" aria-label="Loading" />
      </div>
    );
  }

  return (
    <>
      <Navbar resumeUrl={profile.resumeUrl} />
      <main>
        <Hero profile={profile} />

        <Section id="about" index={1} title="About me">
          <div className="about-grid">
            <p className="lead">{profile.about}</p>
            <div className="card about-card">
              <p><span className="muted">Based in</span><br />{profile.location}</p>
              <p><span className="muted">Studying</span><br />{profile.education?.[0]?.degree}</p>
              <p><span className="muted">Graduating</span><br />2027</p>
            </div>
          </div>
        </Section>

        <Section id="skills" index={2} title="Skills">
          <div className="skills-grid">
            {profile.skills.map((g) => (
              <div className="card skill-group" key={g.category}>
                <h3>{g.category}</h3>
                <div className="tags">
                  {g.items.map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" index={3} title="Projects">
          {projects.length === 0 ? (
            <p className="muted">Projects coming soon.</p>
          ) : (
            <div className="projects-grid">
              {projects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          )}
        </Section>

        <Section id="education" index={4} title="Education">
          <ol className="timeline">
            {profile.education.map((e) => (
              <li key={e.institution}>
                <span className="timeline-dot" />
                <div className="timeline-body">
                  <p className="mono muted small">{e.period}</p>
                  <h3>{e.institution}</h3>
                  <p>{e.degree}</p>
                  {e.score && <span className="tag accent-tag">{e.score}</span>}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="achievements" index={5} title="Achievements & leadership">
          <div className="ach-grid">
            <div className="card">
              <h3>Certifications</h3>
              <ul className="check-list">
                {profile.certifications.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div className="card">
              <h3>Achievements</h3>
              <ul className="check-list">
                {profile.achievements.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div className="card">
              <h3>Leadership</h3>
              <ul className="check-list">
                {profile.leadership.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="contact" index={6} title="Get in touch">
          <Contact profile={profile} />
        </Section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="muted small">
            © {new Date().getFullYear()} {profile.name} · Built with MongoDB, Express, React &amp; Node.js
          </p>
        </div>
      </footer>
    </>
  );
}
