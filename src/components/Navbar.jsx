import React, { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/style.css";
import logo from "../../public/images/lightLogo.png";
import Button from "../components/Button"; 
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const sections = useMemo(() => [
    { id: "home", label: "Home" },
    { id: "student-admission", label: "Admission" },
    { id: "faculty-section", label: "Faculty" },
    { id: "vision", label: "Vision" },
    { id: "contact", label: "Contact" },
  ], []);

  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 130;
      setScrolled(window.scrollY > 50);

      for (let sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActive(sec.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const offset = section.offsetTop - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header id="mainHeader" className={scrolled ? "scrolled" : ""}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-lg">
          <a className="navbar-brand d-flex align-items-center" href="#home">
            <img src={logo} alt="Logo" className="me-2" /> GSG </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav me-3 text-center">
              {sections.map(({ id, label }) => (
                <li className="nav-item" key={id}>
                  <a href={`#${id}`} onClick={(e) => handleSmoothScroll(e, id)} className={`nav-link ${active === id ? "active" : ""}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
              <div className="d-flex justify-content-center justify-content-lg-start mt-3 mt-lg-0">
                <Button label="Logout" onClick={handleLogout} bg="#fff" color="var(--primary-color)" hoverBg="var(--secondary-color)"/></div>
          </div>
        </div>
      </nav>
    </header>
  );
}
