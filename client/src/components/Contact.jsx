import { useState } from 'react';
import { api } from '../api.js';
import { MailIcon, PhoneIcon, LinkedinIcon } from './Icons.jsx';

const empty = { name: '', email: '', message: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      const res = await api.sendMessage(form);
      setStatus({ type: 'success', text: res.message });
      setForm(empty);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-grid">
      <div>
        <p className="lead">
          I'm looking for internship and full-time software engineering roles. Have an
          opportunity, a question, or just want to say hi? My inbox is open.
        </p>
        <ul className="contact-list">
          {profile.email && (
            <li>
              <MailIcon /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          )}
          {profile.phone && (
            <li>
              <PhoneIcon /> <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </li>
          )}
          {profile.linkedin && (
            <li>
              <LinkedinIcon />{' '}
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedin.replace(/^https?:\/\//, '')}
              </a>
            </li>
          )}
        </ul>
      </div>

      <form className="card contact-form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} required maxLength={100} />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Message
          <textarea name="message" rows={5} value={form.message} onChange={onChange} required maxLength={2000} />
        </label>
        <button className="btn btn-primary" disabled={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </button>
        {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
      </form>
    </div>
  );
}
