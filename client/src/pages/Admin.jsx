import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

const blank = {
  title: '',
  subtitle: '',
  description: '',
  highlights: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
  order: 0,
};

// Form uses plain strings; the API uses arrays for highlights/techStack.
const toForm = (p) => ({
  ...blank,
  ...p,
  highlights: (p.highlights || []).join('\n'),
  techStack: (p.techStack || []).join(', '),
});
const toPayload = (f) => ({
  title: f.title,
  subtitle: f.subtitle,
  description: f.description,
  githubUrl: f.githubUrl,
  liveUrl: f.liveUrl,
  imageUrl: f.imageUrl,
  featured: f.featured,
  order: Number(f.order) || 0,
  highlights: f.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
  techStack: f.techStack.split(',').map((s) => s.trim()).filter(Boolean),
});

function getSavedKey() {
  try {
    return sessionStorage.getItem('adminKey') || '';
  } catch {
    return '';
  }
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState(getSavedKey);
  const [keyInput, setKeyInput] = useState('');
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState({ type: '', text: '' });
  const [tab, setTab] = useState('projects');

  const load = async (key) => {
    // Loading messages doubles as a key check, since that route is admin-only.
    const [msgs, projs] = await Promise.all([api.getMessages(key), api.getProjects()]);
    setMessages(msgs);
    setProjects(projs);
    setAuthed(true);
  };

  useEffect(() => {
    if (adminKey) load(adminKey).catch(() => logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      await load(keyInput);
      setAdminKey(keyInput);
      try { sessionStorage.setItem('adminKey', keyInput); } catch { /* ignore */ }
      setNotice({ type: '', text: '' });
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  const logout = () => {
    try { sessionStorage.removeItem('adminKey'); } catch { /* ignore */ }
    setAdminKey('');
    setAuthed(false);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateProject(editingId, toPayload(form), adminKey);
        setNotice({ type: 'success', text: `Updated "${form.title}".` });
      } else {
        await api.createProject(toPayload(form), adminKey);
        setNotice({ type: 'success', text: `Added "${form.title}".` });
      }
      setForm(blank);
      setEditingId(null);
      setProjects(await api.getProjects());
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  const edit = (p) => {
    setEditingId(p._id);
    setForm(toForm(p));
    setNotice({ type: '', text: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await api.deleteProject(p._id, adminKey);
      setProjects(projects.filter((x) => x._id !== p._id));
      if (editingId === p._id) {
        setEditingId(null);
        setForm(blank);
      }
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  const removeMessage = async (m) => {
    try {
      await api.deleteMessage(m._id, adminKey);
      setMessages(messages.filter((x) => x._id !== m._id));
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  if (!authed) {
    return (
      <div className="center-screen">
        <form className="card admin-login" onSubmit={login}>
          <h2>Admin</h2>
          <p className="muted small">Enter the ADMIN_KEY from your server's .env file.</p>
          <input
            type="password"
            placeholder="Admin key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            required
          />
          <button className="btn btn-primary">Sign in</button>
          {notice.text && <p className={`form-status ${notice.type}`}>{notice.text}</p>}
          <Link to="/" className="muted small">← Back to portfolio</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="container admin">
      <div className="admin-top">
        <h1>Portfolio admin</h1>
        <div className="admin-top-actions">
          <Link to="/" className="btn btn-sm btn-outline">View site</Link>
          <button className="btn btn-sm btn-outline" onClick={logout}>Sign out</button>
        </div>
      </div>

      <div className="tabs">
        <button className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}>
          Projects ({projects.length})
        </button>
        <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}>
          Messages ({messages.length})
        </button>
      </div>

      {notice.text && <p className={`form-status ${notice.type}`}>{notice.text}</p>}

      {tab === 'projects' && (
        <div className="admin-grid">
          <form className="card admin-form" onSubmit={save}>
            <h2>{editingId ? 'Edit project' : 'Add a project'}</h2>
            <label>Title *<input name="title" value={form.title} onChange={onChange} required /></label>
            <label>Subtitle<input name="subtitle" value={form.subtitle} onChange={onChange} placeholder="e.g. Full-Stack Hostel Operations Platform" /></label>
            <label>Short description<textarea name="description" rows={3} value={form.description} onChange={onChange} /></label>
            <label>Highlights <span className="muted small">(one per line)</span>
              <textarea name="highlights" rows={5} value={form.highlights} onChange={onChange} />
            </label>
            <label>Tech stack <span className="muted small">(comma-separated)</span>
              <input name="techStack" value={form.techStack} onChange={onChange} placeholder="React, Node.js, MongoDB" />
            </label>
            <label>GitHub URL<input type="url" name="githubUrl" value={form.githubUrl} onChange={onChange} /></label>
            <label>Live demo URL<input type="url" name="liveUrl" value={form.liveUrl} onChange={onChange} /></label>
            <label>Screenshot image URL<input type="url" name="imageUrl" value={form.imageUrl} onChange={onChange} /></label>
            <div className="form-row">
              <label>Display order<input type="number" name="order" value={form.order} onChange={onChange} /></label>
              <label className="checkbox"><input type="checkbox" name="featured" checked={form.featured} onChange={onChange} /> Featured</label>
            </div>
            <div className="form-row">
              <button className="btn btn-primary">{editingId ? 'Save changes' : 'Add project'}</button>
              {editingId && (
                <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setForm(blank); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {projects.map((p) => (
              <div className="card admin-item" key={p._id}>
                <div>
                  <h3>{p.title}</h3>
                  <p className="muted small">{p.subtitle}</p>
                  <p className="mono small muted">{(p.techStack || []).join(' · ')}</p>
                </div>
                <div className="admin-item-actions">
                  <button className="btn btn-sm btn-outline" onClick={() => edit(p)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => remove(p)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'messages' && (
        <div className="admin-list">
          {messages.length === 0 && <p className="muted">No messages yet.</p>}
          {messages.map((m) => (
            <div className="card admin-item" key={m._id}>
              <div>
                <h3>{m.name} <a className="small" href={`mailto:${m.email}`}>{m.email}</a></h3>
                <p className="muted small mono">{new Date(m.createdAt).toLocaleString()}</p>
                <p className="message-body">{m.message}</p>
              </div>
              <div className="admin-item-actions">
                <button className="btn btn-sm btn-danger" onClick={() => removeMessage(m)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
