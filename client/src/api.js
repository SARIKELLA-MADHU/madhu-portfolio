const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, { method = 'GET', body, adminKey } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminKey) headers['x-admin-key'] = adminKey;

  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const api = {
  getProfile: () => request('/profile'),
  getProjects: () => request('/projects'),
  sendMessage: (body) => request('/messages', { method: 'POST', body }),

  // Admin
  createProject: (body, adminKey) => request('/projects', { method: 'POST', body, adminKey }),
  updateProject: (id, body, adminKey) =>
    request(`/projects/${id}`, { method: 'PUT', body, adminKey }),
  deleteProject: (id, adminKey) => request(`/projects/${id}`, { method: 'DELETE', adminKey }),
  getMessages: (adminKey) => request('/messages', { adminKey }),
  deleteMessage: (id, adminKey) => request(`/messages/${id}`, { method: 'DELETE', adminKey }),
};
