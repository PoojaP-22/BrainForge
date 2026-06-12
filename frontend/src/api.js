const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('course-token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === 'string' ? data : data?.message || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export const api = {
  getCourses: () => request('/courses'),
  createCourse: (payload) => request('/courses', { method: 'POST', body: JSON.stringify(payload) }),
  updateCourse: (id, payload) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),

  getUsers: () => request('/users'),
  createUser: (payload) => request('/users', { method: 'POST', body: JSON.stringify(payload) }),
  updateUser: (id, payload) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),

  getEnrollments: () => request('/enrollments'),
  getEnrollmentsByUser: (userId) => request(`/enrollments/user/${userId}`),
  createEnrollment: (payload) => request('/enrollments', { method: 'POST', body: JSON.stringify(payload) }),
  deleteEnrollment: (id) => request(`/enrollments/${id}`, { method: 'DELETE' }),

  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
};
