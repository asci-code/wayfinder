export default function HomePage() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Wayfinder</h1>
      <p>
        Wayfinder is a decision engine that aggregates multi-source travel data,
        normalizes signals, and scores destinations.
      </p>
      <p>
        Use the <code>/api/recommendations</code> endpoint to request ranked
        recommendations.
      </p>
    </main>
  );
}
