import React from "react";

export default function Heading({ title, subtitle, align = "center", color = "var(--primary-color)" }) {
  return (
    <div style={{ textAlign: align, color }}>
      <h2 style={{ fontWeight: "700", marginBottom: "0.5rem"}}>{title}</h2>
      {subtitle && <p style={{ fontSize: "1rem", opacity: "0.8" }}>{subtitle}</p>}
    </div>
  );
}
