import React, { useState } from "react";

export default function Button({
  label,
  onClick,
  href,
  type = "button",
  bg = "var(--primary-color, #6b1414e6)",
  color = "#fff",
  hoverBg = "#8b1a1aea", 
  shadow = true,
}) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    backgroundColor: hovered ? hoverBg : bg,
    color: color,
    padding: "0.75rem 1.6rem",
    borderRadius: "30px",
    fontWeight: 600,
    border: "none", 
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "inline-block",
    boxShadow: shadow ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
  };

  const handleHover = (state) => setHovered(state);

  if (href) {
    return (
      <a
        href={href}
        style={baseStyle}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {label}
    </button>
  );
}
