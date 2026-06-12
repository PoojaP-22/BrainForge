export function CoursesPage({
  courses,
  courseForm,
  setCourseForm,
  selectedCourseId,
  handleCourseSubmit,
  clearCourseForm,
  editCourse,
  handleDeleteCourse,
}) {
  return (
    <section className="panel-grid two-column-grid">
      <Panel title="Courses" subtitle="Manage course listings">
        <form className="form-card" onSubmit={handleCourseSubmit}>
          <div className="form-header">
            <h3>{selectedCourseId ? `Edit course #${selectedCourseId}` : 'Create course'}</h3>
            {selectedCourseId && (
              <button type="button" className="ghost-button" onClick={clearCourseForm}>
                Cancel
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Title"
            value={courseForm.title}
            onChange={(event) => setCourseForm({ ...courseForm, title: event.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={courseForm.description}
            onChange={(event) => setCourseForm({ ...courseForm, description: event.target.value })}
          />
          <input
            type="text"
            placeholder="Instructor"
            value={courseForm.instructor}
            onChange={(event) => setCourseForm({ ...courseForm, instructor: event.target.value })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={courseForm.price}
            onChange={(event) => setCourseForm({ ...courseForm, price: event.target.value })}
          />
          <button type="submit">{selectedCourseId ? 'Update course' : 'Add course'}</button>
        </form>
      </Panel>

      <Panel title="Course list" subtitle="Saved backend records">
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.instructor}</td>
                  <td>{course.price}</td>
                  <td className="actions-cell">
                    <button type="button" className="secondary-button" onClick={() => editCourse(course)}>
                      Edit
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDeleteCourse(course.id)}>
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
