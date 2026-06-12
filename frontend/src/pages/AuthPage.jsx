export function AuthPage({
  token,
  loginForm,
  setLoginForm,
  registerForm,
  setRegisterForm,
  handleLoginSubmit,
  handleRegisterSubmit,
}) {
  return (
    <section className="panel-grid two-column-grid">
      <Panel title="Auth" subtitle="Login and register users">
        <div className="split-grid">
          <form className="form-card" onSubmit={handleLoginSubmit}>
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
            />
            <button type="submit">Login</button>
          </form>

          <form className="form-card" onSubmit={handleRegisterSubmit}>
            <h3>Register</h3>
            <input
              type="text"
              placeholder="Name"
              value={registerForm.name}
              onChange={(event) => setRegisterForm({ ...registerForm, name: event.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
            />
            <select
              value={registerForm.role}
              onChange={(event) => setRegisterForm({ ...registerForm, role: event.target.value })}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button type="submit">Register</button>
          </form>
        </div>
        {token && (
          <p className="token-box">
            Saved token: <span>{token}</span>
          </p>
        )}
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
