"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error — Kindervale Preschool</title>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          background: "#f8fafc"
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#2e5a75", margin: "0 0 0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#64748b", margin: "0 0 1.5rem" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              background: "#f6b41e",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
