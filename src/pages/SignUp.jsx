import React, { useState } from "react";
import banner from "../assets/banner.png";
import Navbar from "../components/Navbar";
import CommonInput from "../components/CommonInput";

const initialState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dobMonth: "",
  dobDay: "",
  dobYear: "",
  referredBy: "",
  ageCheck: false,
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const calculateAge = (year, month, day) => {
    if (!year || !month || !day) return 0;
    const monthIndex = months.indexOf(month);
    const dob = new Date(year, monthIndex, day);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // // Username uniqueness check
  // const checkUsernameUnique = async (username) => {
  //   if (!username) return;
  //   setCheckingUsername(true);
  //   setUsernameAvailable(null);
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/user/check-username?username=${encodeURIComponent(username)}`);
  //     const data = await res.json();
  //     setUsernameAvailable(data.available);
  //     setErrors((prev) => ({ ...prev, username: data.available ? undefined : "Username is already taken." }));
  //   } catch (e) {
  //     setUsernameAvailable(null);
  //     setErrors((prev) => ({ ...prev, username: "Could not check username. Try again." }));
  //   } finally {
  //     setCheckingUsername(false);
  //   }
  // };

  // Validation logic
  const validate = (values) => {
    const errs = {};
    if (!values.username) errs.username = "Username is required.";
    else if (usernameAvailable === false) errs.username = "Username is already taken.";
    if (!values.firstName.trim()) errs.firstName = "First name is required.";
    if (!values.lastName.trim()) errs.lastName = "Last name is required.";
    if (!values.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errs.email = "Invalid email format.";
    if (!values.password) errs.password = "Password is required.";
    else if (!/^(?=.*[A-Z])(?=.*\d).{8,20}$/.test(values.password)) errs.password = "8–20 chars, 1 number, 1 uppercase. Special characters allowed.";
    if (!values.dobMonth) errs.dobMonth = "Month required.";
    if (!values.dobDay) errs.dobDay = "Day required.";
    else if (!/^\d{1,2}$/.test(values.dobDay) || +values.dobDay < 1 || +values.dobDay > 31) errs.dobDay = "Invalid day.";
    if (!values.dobYear) errs.dobYear = "Year required.";
    else if (!/^\d{4}$/.test(values.dobYear) || +values.dobYear < currentYear - 100 || +values.dobYear > currentYear) errs.dobYear = "Invalid year.";
    const age = calculateAge(values.dobYear, values.dobMonth, values.dobDay);
    if (values.dobYear && values.dobMonth && values.dobDay && age < 18) errs.dobYear = "You must be at least 18 years old.";
    if (!values.ageCheck) errs.ageCheck = "You must confirm you are 18+.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name === "username") {
      setUsernameAvailable(null);
    }
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    if (e.target.name === "username" && form.username) {
      // checkUsernameUnique(form.username); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      dobMonth: true,
      dobDay: true,
      dobYear: true,
      ageCheck: true,
    });
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        alert("Signup successful! (Demo)");
      }, 1000);
    }
  };

  React.useEffect(() => {
    setErrors(validate(form));
  }, [form, usernameAvailable]);

  const isFormValid = Object.keys(errors).length === 0 && form.username && form.firstName && form.lastName && form.email && form.password && form.dobMonth && form.dobDay && form.dobYear && form.ageCheck && usernameAvailable !== false && calculateAge(form.dobYear, form.dobMonth, form.dobDay) >= 18;

  const handleGoogleSignup = () => {
    window.location.href = 'http://54.234.145.12:8004/api/v1/auth/google';
  };

  const handleFacebookSignup = () => {
    window.location.href = 'http://54.234.145.12:8004/api/v1/auth/facebook';
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-black overflow-x-hidden" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100" style={{ minHeight: 0, width: '100%' }}>
        <div className="card bg-black text-white shadow p-4 w-100 mt-3" style={{ maxWidth: 500 }}>
          <img src={banner} alt="Promo Banner" className="img-fluid rounded mb-3" />
          <form onSubmit={handleSubmit} noValidate>
            <CommonInput
              label="Username"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="username"
              touched={touched.username}
              error={errors.username}
              valid={touched.username && !errors.username && form.username && usernameAvailable}
            />
            {checkingUsername && <div className="text-info small">Checking username...</div>}
            {touched.username && usernameAvailable && !errors.username && <div className="valid-feedback d-block">Username is available!</div>}

            <CommonInput
              label="Email Address"
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="email"
              touched={touched.email}
              error={errors.email}
              valid={touched.email && !errors.email && form.email}
            />

            <CommonInput
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="new-password"
              touched={touched.password}
              error={errors.password}
              valid={touched.password && !errors.password && form.password}
            />

            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <CommonInput
                  label="First Name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="given-name"
                  touched={touched.firstName}
                  error={errors.firstName}
                  valid={touched.firstName && !errors.firstName && form.firstName}
                />
              </div>
              <div className="col-12 col-md-6">
                <CommonInput
                  label="Last Name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="family-name"
                  touched={touched.lastName}
                  error={errors.lastName}
                  valid={touched.lastName && !errors.lastName && form.lastName}
                />
              </div>
            </div>

            <label className="form-label">Date of Birth</label>
            <div className="row mb-3">
              <div className="col-4">
                <label htmlFor="dobMonth" className="visually-hidden">Month</label>
                <select
                  className={`form-select${touched.dobMonth && errors.dobMonth ? " is-invalid" : ""}`}
                  id="dobMonth"
                  name="dobMonth"
                  value={form.dobMonth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.dobMonth && errors.dobMonth)}
                  required
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {touched.dobMonth && errors.dobMonth && <div className="invalid-feedback">{errors.dobMonth}</div>}
              </div>
              <div className="col-4">
                <label htmlFor="dobDay" className="visually-hidden">Day</label>
                <input
                  type="text"
                  className={`form-control${touched.dobDay && errors.dobDay ? " is-invalid" : ""}`}
                  id="dobDay"
                  name="dobDay"
                  placeholder="Day"
                  value={form.dobDay}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.dobDay && errors.dobDay)}
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {touched.dobDay && errors.dobDay && <div className="invalid-feedback">{errors.dobDay}</div>}
              </div>
              <div className="col-4">
                <label htmlFor="dobYear" className="visually-hidden">Year</label>
                <select
                  className={`form-select${touched.dobYear && errors.dobYear ? " is-invalid" : ""}`}
                  id="dobYear"
                  name="dobYear"
                  value={form.dobYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.dobYear && errors.dobYear)}
                  required
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {touched.dobYear && errors.dobYear && <div className="invalid-feedback">{errors.dobYear}</div>}
              </div>
            </div>

            <CommonInput
              label="Referred by (optional)"
              type="text"
              id="referredBy"
              name="referredBy"
              placeholder="Referred by (optional)"
              value={form.referredBy}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              touched={touched.referredBy}
              error={errors.referredBy}
              valid={touched.referredBy && !errors.referredBy && form.referredBy}
            />

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className={`form-check-input${touched.ageCheck && errors.ageCheck ? " is-invalid" : ""}`}
                id="ageCheck"
                name="ageCheck"
                checked={form.ageCheck}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.ageCheck && errors.ageCheck)}
                required
              />
              <label className="form-check-label" htmlFor="ageCheck">
                I am at least 18 years old and agree to the
                <a href="#" className="text-warning text-decoration-none"> Terms of Service</a>
              </label>
              {touched.ageCheck && errors.ageCheck && <div className="invalid-feedback d-block">{errors.ageCheck}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-warning text-dark fw-bold w-100 mb-3"
              disabled={!isFormValid || submitting}
              aria-disabled={!isFormValid || submitting}
            >
              {submitting ? "Signing Up..." : "Play Now"}
            </button>

            <hr className="border-secondary" />

            <p className="text-center text-white-50">Or Register with</p>
            <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center w-100"
                onClick={handleGoogleSignup}
                aria-label="Sign up with Google"
              >
                <img src="https://img.icons8.com/color/24/000000/google-logo.png" className="me-2" alt="Google" />
                Google
              </button>
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center w-100"
                onClick={handleFacebookSignup}
                aria-label="Sign up with Facebook"
              >
                <img src="https://img.icons8.com/color/24/000000/facebook-new.png" className="me-2" alt="Facebook" />
                Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
