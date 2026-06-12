export function HomePage({ stats, message, error }) {
  return (
    <>
      <section className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      {(message || error) && (
        <section className="notice-row">
          {message && <div className="notice success">{message}</div>}
          {error && <div className="notice error">{error}</div>}
        </section>
      )}

      <section className="panel single-panel">
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">Start here</p>
            <h2>Backend is connected</h2>
          </div>
        </div>
        <p className="section-copy">
          Use the navigation above to move between auth, users, courses, and enrollments.
          Each page talks directly to the Spring Boot backend.
        </p>
      </section>
    </>
  );
}
