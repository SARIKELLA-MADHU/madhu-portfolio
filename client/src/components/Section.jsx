export default function Section({ id, index, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="mono accent">{String(index).padStart(2, '0')}.</span> {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
