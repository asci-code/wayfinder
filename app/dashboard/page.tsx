const sampleResults = [
  {
    destination: "Lisbon",
    overallScore: 0.82,
    totalTripCost: 480,
    travelTimeHours: 7.5,
    weatherScore: 0.78,
    safetyScore: 0.82,
    visaFrictionScore: 1,
    seasonalityScore: 0.62,
    explanation:
      "Strong weather and safety signals with easy visa requirements."
  },
  {
    destination: "San Juan",
    overallScore: 0.79,
    totalTripCost: 360,
    travelTimeHours: 4.2,
    weatherScore: 0.74,
    safetyScore: 0.72,
    visaFrictionScore: 0.9,
    seasonalityScore: 0.58,
    explanation: "Affordable flights with warm weather; moderate crowding."
  },
  {
    destination: "Vancouver",
    overallScore: 0.73,
    totalTripCost: 420,
    travelTimeHours: 5.1,
    weatherScore: 0.66,
    safetyScore: 0.84,
    visaFrictionScore: 0.75,
    seasonalityScore: 0.56,
    explanation: "High safety with balanced costs; cooler weather trend."
  }
];

export default function DashboardPage() {
  return (
    <main
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "2.5rem",
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          marginBottom: "2rem"
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.12em", fontSize: "0.75rem" }}>
            WAYFINDER DASHBOARD
          </p>
          <h1 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>
            Live Recommendation Monitor
          </h1>
          <p style={{ maxWidth: "520px", color: "#4b5563" }}>
            Track destination rankings, scoring factors, and cache freshness to
            validate Wayfinder's decision engine in real-time.
          </p>
        </div>
        <div
          style={{
            background: "#111827",
            color: "#f9fafb",
            padding: "1rem 1.5rem",
            borderRadius: "1rem",
            minWidth: "240px"
          }}
        >
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#9ca3af" }}>
            Cache Status
          </p>
          <h2 style={{ margin: "0.35rem 0 0", fontSize: "1.4rem" }}>Hit</h2>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#9ca3af" }}>
            Last refreshed 4m ago
          </p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)"
          }}
        >
          <h3 style={{ marginTop: 0 }}>Search Intent</h3>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <label style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              Origin
              <input
                defaultValue="NYC"
                style={{
                  marginTop: "0.35rem",
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  width: "100%"
                }}
              />
            </label>
            <label style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              Budget (USD)
              <input
                defaultValue="600"
                style={{
                  marginTop: "0.35rem",
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  width: "100%"
                }}
              />
            </label>
            <label style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              Date Range
              <input
                defaultValue="2024-07-05 to 2024-07-07"
                style={{
                  marginTop: "0.35rem",
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  width: "100%"
                }}
              />
            </label>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <h4 style={{ marginBottom: "0.5rem" }}>Preferences</h4>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[
                "Warm weather",
                "Safe",
                "Cheap",
                "Short flight",
                "Low crowding"
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.35rem 0.6rem",
                    background: "#eef2ff",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    color: "#3730a3"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            style={{
              marginTop: "1.5rem",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Run Recommendation
          </button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)"
          }}
        >
          <h3 style={{ marginTop: 0 }}>Ranking Snapshot</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            {sampleResults.map((result, index) => (
              <div
                key={result.destination}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  padding: "1rem"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        color: "#9ca3af"
                      }}
                    >
                      Rank #{index + 1}
                    </p>
                    <h4 style={{ margin: "0.2rem 0" }}>{result.destination}</h4>
                  </div>
                  <div
                    style={{
                      background: "#ecfeff",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "999px",
                      color: "#0e7490",
                      fontWeight: 600
                    }}
                  >
                    {Math.round(result.overallScore * 100)}
                  </div>
                </div>
                <p style={{ margin: "0.5rem 0", color: "#4b5563" }}>
                  {result.explanation}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "0.5rem",
                    fontSize: "0.8rem",
                    color: "#6b7280"
                  }}
                >
                  <span>Cost: ${result.totalTripCost}</span>
                  <span>Travel: {result.travelTimeHours}h</span>
                  <span>Weather score: {result.weatherScore}</span>
                  <span>Safety score: {result.safetyScore}</span>
                  <span>Visa score: {result.visaFrictionScore}</span>
                  <span>Seasonality: {result.seasonalityScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem"
        }}
      >
        {[
          {
            title: "Provider Health",
            detail: "5/5 providers responding",
            note: "Weather API last sync 2m ago"
          },
          {
            title: "Queue Backlog",
            detail: "2 refresh jobs pending",
            note: "Avg processing 12s"
          },
          {
            title: "Budget Fit",
            detail: "84% of options under $600",
            note: "Cheapest trip $280"
          }
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "1.2rem",
              boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)"
            }}
          >
            <h4 style={{ marginTop: 0 }}>{card.title}</h4>
            <p style={{ fontSize: "1.1rem", margin: "0.3rem 0" }}>
              {card.detail}
            </p>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "0.85rem" }}>
              {card.note}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
