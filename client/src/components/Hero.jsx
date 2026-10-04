import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from './Icons.jsx';

export default function Hero({ profile }) {
  const firstName = profile.name.split(' ').slice(-1)[0];

  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow mono">Hi, I'm {firstName} 👋</p>
          <h1>
            {profile.name}
            <span className="hero-role">{profile.title}</span>
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View my projects
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn btn-outline" download>
                <DownloadIcon /> Download resume
              </a>
            )}
          </div>

          <div className="social">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <MailIcon />
              </a>
            )}
          </div>
        </div>

        {profile.stats?.length > 0 && (
          <div className="hero-stats">
            {profile.stats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
