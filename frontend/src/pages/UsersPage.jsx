export function UsersPage({
  users,
  userForm,
  setUserForm,
  selectedUserId,
  handleUserSubmit,
  clearUserForm,
  editUser,
  handleDeleteUser,
}) {
  return (
    <section className="panel-grid">
      <Panel title="Users" subtitle="Saved backend records">
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="actions-cell">
                    <button type="button" className="secondary-button" onClick={() => editUser(user)}>
                      Edit
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDeleteUser(user.id)}>
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
