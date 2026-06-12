import { useEffect, useMemo, useState } from 'react';
import { api } from './api';

const emptyUserForm = {
  name: '',
  email: '',
  password: '',
};

const emptyRegisterForm = {
  name: '',
  email: '',
  password: '',
  role: 'STUDENT',
};

const emptyCourseForm = {
  title: '',
  description: '',
  instructor: '',
  price: '',
};

const emptyEnrollmentForm = {
  userId: '',
  courseId: '',
};

const emptyLoginForm = {
  email: '',
  password: '',
};

export function useCoursePlatform() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [userFilterId, setUserFilterId] = useState('');
  const [token, setToken] = useState(localStorage.getItem('course-token') || '');

  const [userForm, setUserForm] = useState(emptyUserForm);
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [courseForm, setCourseForm] = useState(emptyCourseForm);
  const [enrollmentForm, setEnrollmentForm] = useState(emptyEnrollmentForm);
  const [loginForm, setLoginForm] = useState(emptyLoginForm);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const stats = useMemo(() => ([
    { label: 'Users', value: users.length },
    { label: 'Courses', value: courses.length },
    { label: 'Enrollments', value: enrollments.length },
  ]), [users.length, courses.length, enrollments.length]);

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('course-token', token);
    } else {
      localStorage.removeItem('course-token');
    }
  }, [token]);

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [usersData, coursesData, enrollmentsData] = await Promise.all([
        api.getUsers(),
        api.getCourses(),
        api.getEnrollments(),
      ]);
      setUsers(usersData);
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
      setMessage('Loaded data from the backend.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadEnrollmentsByUser() {
    if (!userFilterId.trim()) {
      await loadAll();
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await api.getEnrollmentsByUser(userFilterId.trim());
      setEnrollments(data);
      setMessage(`Showing enrollments for user ${userFilterId.trim()}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await api.login(loginForm);
      setToken(data.token || '');
      setMessage('Login successful. Token saved in the browser.');
      setLoginForm(emptyLoginForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const payload = {
        ...registerForm,
        role: registerForm.role || 'STUDENT',
      };
      const response = await api.register(payload);
      setMessage(response || 'Registration successful.');
      setRegisterForm(emptyRegisterForm);
      await loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (selectedUserId) {
        await api.updateUser(selectedUserId, userForm);
        setMessage('User updated successfully.');
      } else {
        await api.createUser(userForm);
        setMessage('User created successfully.');
      }
      setUserForm(emptyUserForm);
      setSelectedUserId(null);
      await loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCourseSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const payload = {
        ...courseForm,
        price: Number(courseForm.price),
      };
      if (selectedCourseId) {
        await api.updateCourse(selectedCourseId, payload);
        setMessage('Course updated successfully.');
      } else {
        await api.createCourse(payload);
        setMessage('Course created successfully.');
      }
      setCourseForm(emptyCourseForm);
      setSelectedCourseId(null);
      await loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEnrollmentSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.createEnrollment({
        userId: Number(enrollmentForm.userId),
        courseId: Number(enrollmentForm.courseId),
      });
      setMessage('Enrollment created successfully.');
      setEnrollmentForm(emptyEnrollmentForm);
      await loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUser(id) {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.deleteUser(id);
      await loadAll();
      setMessage('User deleted.');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteCourse(id) {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.deleteCourse(id);
      await loadAll();
      setMessage('Course deleted.');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteEnrollment(id) {
    if (!window.confirm('Delete this enrollment?')) return;
    try {
      await api.deleteEnrollment(id);
      await loadAll();
      setMessage('Enrollment deleted.');
    } catch (err) {
      setError(err.message);
    }
  }

  function editUser(user) {
    setSelectedUserId(user.id);
    setUserForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
    });
    setMessage('Editing user. Enter a new password before saving.');
  }

  function editCourse(course) {
    setSelectedCourseId(course.id);
    setCourseForm({
      title: course.title || '',
      description: course.description || '',
      instructor: course.instructor || '',
      price: course.price ?? '',
    });
    setMessage('Editing course.');
  }

  function clearUserForm() {
    setSelectedUserId(null);
    setUserForm(emptyUserForm);
  }

  function clearCourseForm() {
    setSelectedCourseId(null);
    setCourseForm(emptyCourseForm);
  }

  function resetNotice() {
    setMessage('');
    setError('');
  }

  return {
    users,
    courses,
    enrollments,
    selectedUserId,
    selectedCourseId,
    userFilterId,
    setUserFilterId,
    token,
    setToken,
    userForm,
    setUserForm,
    registerForm,
    setRegisterForm,
    courseForm,
    setCourseForm,
    enrollmentForm,
    setEnrollmentForm,
    loginForm,
    setLoginForm,
    loading,
    message,
    error,
    stats,
    loadAll,
    loadEnrollmentsByUser,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleUserSubmit,
    handleCourseSubmit,
    handleEnrollmentSubmit,
    handleDeleteUser,
    handleDeleteCourse,
    handleDeleteEnrollment,
    editUser,
    editCourse,
    clearUserForm,
    clearCourseForm,
    resetNotice,
  };
}
