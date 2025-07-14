import React, { useState } from "react";
import banner from "../assets/banner.png";
import Navbar from "../components/Navbar";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const validate = (values) => {
    const errs = {};
    if (!values.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errs.email = "Invalid email format.";
    if (!values.password) errs.password = "Password is required.";
    if (!captchaChecked) errs.captcha = "Please complete the CAPTCHA.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        alert("Login successful! (Demo)");
      }, 1000);
    }
  };

  React.useEffect(() => {
    setErrors(validate(form));
  }, [form, captchaChecked]);

  const isFormValid = Object.keys(errors).length === 0 && form.email && form.password && captchaChecked;

  return (
    <div className="min-vh-100 d-flex flex-column bg-black overflow-x-hidden" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100" style={{ minHeight: 0, width: '100%' }}>
        <div className="card bg-black text-white shadow p-4 w-100 mt-3" style={{ maxWidth: 500 }}>
          <img src={banner} alt="Promo Banner" className="img-fluid rounded mb-3" />
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control${touched.email && errors.email ? " is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.email && errors.email)}
                required
                autoComplete="email"
              />
              {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control${touched.password && errors.password ? " is-invalid" : ""}`}
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.password && errors.password)}
                required
                autoComplete="current-password"
              />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <div className="form-label mb-2">As a protection against automated spam, you will need to complete the CAPTCHA below:</div>
              <div className="d-flex flex-column align-items-center">
                <div className="bg-light rounded p-3 mb-2" style={{ minWidth: 280, minHeight: 70, maxWidth: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <input
                    type="checkbox"
                    id="captchaCheck"
                    checked={captchaChecked}
                    onChange={e => setCaptchaChecked(e.target.checked)}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <label htmlFor="captchaCheck" className="mb-0 text-dark" style={{ fontWeight: 500 }}>
                    I am not a Robot
                  </label>
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" style={{ height: 32, marginLeft: 12 }} />
                </div>
                {errors.captcha && <div className="text-danger small">{errors.captcha}</div>}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-warning text-dark fw-bold w-100 mb-3"
              disabled={!isFormValid || submitting}
              aria-disabled={!isFormValid || submitting}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
            <div className="text-center mb-3">
              <a href="#" className="text-warning text-decoration-none">Forgot your password?</a>
            </div>
            <hr className="border-secondary" />
            <p className="text-center text-white-50">Or Register with</p>
            <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center w-100"
                onClick={() => alert("Google login (demo)")}
                aria-label="Login with Google"
              >
                <img src="https://img.icons8.com/color/24/000000/google-logo.png" className="me-2" alt="Google" />
                Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 