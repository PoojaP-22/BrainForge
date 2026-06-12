export function EnrollmentsPage({
  enrollments,
  userFilterId,
  setUserFilterId,
  enrollmentForm,
  setEnrollmentForm,
  handleEnrollmentSubmit,
  handleDeleteEnrollment,
  loadEnrollmentsByUser,
}) {
  return (
    <section className="panel-grid two-column-grid">
      <Panel title="Enrollments" subtitle="Create and review enrollments">
        <form className="form-card" onSubmit={handleEnrollmentSubmit}>
          <h3>Create enrollment</h3>
          <input
            type="number"
            placeholder="User ID"
            value={enrollmentForm.userId}
            onChange={(event) => setEnrollmentForm({ ...enrollmentForm, userId: event.target.value })}
          />
          <input
            type="number"
            placeholder="Course ID"
            value={enrollmentForm.courseId}
            onChange={(event) => setEnrollmentForm({ ...enrollmentForm, courseId: event.target.value })}
          />
          <button type="submit">Enroll</button>
        </form>

        <div className="filter-row">
          <input
            type="number"
            placeholder="Filter by user ID"
            value={userFilterId}
            onChange={(event) => setUserFilterId(event.target.value)}
          />
          <button type="button" className="secondary-button" onClick={loadEnrollmentsByUser}>
            Search
          </button>
          <button type="button" className="ghost-button" onClick={() => { setUserFilterId(''); loadEnrollmentsByUser(); }}>
            Clear
          </button>
        </div>
      </Panel>

      <Panel title="Enrollment list" subtitle="Saved backend records">
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Course</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.enrollmentId}>
                  <td>{enrollment.enrollmentId}</td>
                  <td>{enrollment.userName} ({enrollment.userId})</td>
                  <td>{enrollment.courseTitle} ({enrollment.courseId})</td>
                  <td>{formatDate(enrollment.enrolledAt)}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDeleteEnrollment(enrollment.enrollmentId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </section>
  );
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function Panel({ title, subtitle, children }) {
  return (
    <article className="panel single-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">{subtitle}</p>
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </article>
  );
}

function TableWrap({ children }) {
  return <div className="table-wrap">{children}</div>;
}
