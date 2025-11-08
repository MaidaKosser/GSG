import React from "react";
import "../styles/style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../public/images/lightLogo.png'
export default function Footer() {
  return (
<section id="contact" className="vision-section">
    <footer className="bg-maroon text-white pt-5">
      <div className="container">
        <div className="row">
          {/* Logo & Description */}
          <div className="col-md-3 mb-4 text-center text-md-start">
            <div className="d-flex align-items-center mb-4 justify-content-center justify-content-md-start">
              <a href="#home" className="me-2">
                <img
                  src={logo}
                  alt="GSG Logo"
                  className="img-fluid"
                  style={{ maxWidth: "50px" }}
                />
              </a>
              <h5 className="fw-bold text-light mb-0">Government School for Girls</h5>
            </div>
            <p className="small text-light">
              Providing quality education for girls, empowering every student to grow academically and personally.
            </p>
          </div>

          {/* Portals */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-light">Portals</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#faculty" className="text-white text-decoration-none footer-link">
                  Faculty
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none footer-link">
                  Faculty Portal (On Campus)
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none footer-link">
                  Student Portal (Online)
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none footer-link">
                  Student Portal (On Campus)
                </a>
              </li>
            </ul>
          </div>

          {/* Media & News */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-light">Media & News</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none footer-link">
                  Admission
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none footer-link">
                  Events & Announcements
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none footer-link">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#subjects" className="text-white text-decoration-none footer-link">
                  Subjects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-light">Contact</h5>
            <ul className="list-unstyled small">
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>
                School Street # 2, Gujranwala, Pakistan
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>
                +92 300 8994567
              </li>
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                info@gsg.edu.pk
              </li>
            </ul>

            {/* Social Media */}
            <div className="d-flex gap-2 mt-2 flex-wrap">
             <span>Follow us on social media for updates:</span><br />
              <a href="#" className="text-white fs-5 footer-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white fs-5 footer-link">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white fs-5 footer-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white fs-5 footer-link">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center py-3">
          <small>Government School for Girls 2025 &copy; Gujranwala - All Rights Reserved.</small>
        </div>
      </div>
    </footer>
</section>
  );
}
