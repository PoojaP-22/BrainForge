import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { UsersPage } from './pages/UsersPage';
import { CoursesPage } from './pages/CoursesPage';
import { EnrollmentsPage } from './pages/EnrollmentsPage';
import { useCoursePlatform } from './useCoursePlatform';

function App() {
  const platform = useCoursePlatform();

  return (
    <BrowserRouter>
      <Layout token={platform.token} loading={platform.loading} onRefresh={platform.loadAll}>
        <Routes>
          <Route
            path="/"
            element={<HomePage stats={platform.stats} message={platform.message} error={platform.error} />}
          />
          <Route
            path="/auth"
            element={
              <AuthPage
                token={platform.token}
                loginForm={platform.loginForm}
                setLoginForm={platform.setLoginForm}
                registerForm={platform.registerForm}
                setRegisterForm={platform.setRegisterForm}
                handleLoginSubmit={platform.handleLoginSubmit}
                handleRegisterSubmit={platform.handleRegisterSubmit}
              />
            }
          />
          <Route
            path="/users"
            element={
              <UsersPage
                users={platform.users}
                userForm={platform.userForm}
                setUserForm={platform.setUserForm}
                selectedUserId={platform.selectedUserId}
                handleUserSubmit={platform.handleUserSubmit}
                clearUserForm={platform.clearUserForm}
                editUser={platform.editUser}
                handleDeleteUser={platform.handleDeleteUser}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <CoursesPage
                courses={platform.courses}
                courseForm={platform.courseForm}
                setCourseForm={platform.setCourseForm}
                selectedCourseId={platform.selectedCourseId}
                handleCourseSubmit={platform.handleCourseSubmit}
                clearCourseForm={platform.clearCourseForm}
                editCourse={platform.editCourse}
                handleDeleteCourse={platform.handleDeleteCourse}
              />
            }
          />
          <Route
            path="/enrollments"
            element={
              <EnrollmentsPage
                enrollments={platform.enrollments}
                userFilterId={platform.userFilterId}
                setUserFilterId={platform.setUserFilterId}
                enrollmentForm={platform.enrollmentForm}
                setEnrollmentForm={platform.setEnrollmentForm}
                handleEnrollmentSubmit={platform.handleEnrollmentSubmit}
                handleDeleteEnrollment={platform.handleDeleteEnrollment}
                loadEnrollmentsByUser={platform.loadEnrollmentsByUser}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
