import React, { useState } from "react";
import banner from "../assets/banner.png";
import { Eye, EyeOff, AlertTriangle, CheckCircle, Calendar, User, Mail, Lock, ArrowDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonInput from "../components/CommonInput";
import { useNavigate } from "react-router-dom";

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api/v1';

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
  };

  const handleSubmit = async (e) => {
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
      try {
        const dob = `${form.dobYear}-${String(months.indexOf(form.dobMonth) + 1).padStart(2, '0')}-${String(form.dobDay).padStart(2, '0')}`;
        const payload = {
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          dateOfBirth: dob,
          referredBy: form.referredBy || undefined,
        };
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        setSubmitting(false);
        if (response.ok && data.success) {
          toast.success("Signup successful! You can now log in.");
          setForm(initialState);
          setTouched({});
          navigate("/login"); 
        } else {
          let errorMessage = "Signup failed";
          if (data.errors && data.errors.length > 0) {
            errorMessage = data.errors[0].message || data.errors[0];
          } else if (data.message) {
            errorMessage = data.message;
          } else if (data.error) {
            errorMessage = data.error;
          }
          toast.error(errorMessage);
        }
      } catch (error) {
        setSubmitting(false);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (error.message) errorMessage = error.message;
        toast.error(errorMessage);
      }
    }
  };

  React.useEffect(() => {
    setErrors(validate(form));
  }, [form, usernameAvailable]);

  const isFormValid = Object.keys(errors).length === 0 && form.username && form.firstName && form.lastName && form.email && form.password && form.dobMonth && form.dobDay && form.dobYear && form.ageCheck && usernameAvailable !== false && calculateAge(form.dobYear, form.dobMonth, form.dobDay) >= 18;

  const handleGoogleSignup = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleFacebookSignup = () => {
    window.location.href = `${API_BASE_URL}/auth/facebook`;
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
        <div className="flex-1 flex items-center justify-center w-full px-4 py-8">
          <div className="w-full max-w-2xl p-6 bg-gray-900 rounded-2xl shadow-lg animate-fade-in">
            <img src={banner} alt="Promo Banner" className="w-full rounded-lg mb-6" />
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <CommonInput
                label="Username"
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="username"
                touched={touched.username}
                error={errors.username}
                valid={touched.username && !errors.username && form.username && usernameAvailable}
              />
              <CommonInput
                label="Email Address"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="email"
                touched={touched.email}
                error={errors.email}
                valid={touched.email && !errors.email && form.email}
              />
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <CommonInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="new-password"
                    touched={touched.password}
                    error={errors.password}
                    valid={touched.password && !errors.password && form.password}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    id="dobMonth"
                    name="dobMonth"
                    value={form.dobMonth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`input-field ${touched.dobMonth && errors.dobMonth ? "border-danger-500 focus:ring-danger-500" : ""}`}
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <CommonInput
                    type="text"
                    id="dobDay"
                    name="dobDay"
                    placeholder="Day"
                    value={form.dobDay}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    touched={touched.dobDay}
                    error={errors.dobDay}
                    valid={touched.dobDay && !errors.dobDay && form.dobDay}
                  />
                  <select
                    id="dobYear"
                    name="dobYear"
                    value={form.dobYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`input-field ${touched.dobYear && errors.dobYear ? "border-danger-500 focus:ring-danger-500" : ""}`}
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                {(touched.dobMonth && errors.dobMonth) || (touched.dobDay && errors.dobDay) || (touched.dobYear && errors.dobYear) ? (
                  <p className="text-danger-400 text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.dobMonth || errors.dobDay || errors.dobYear}
                  </p>
                ) : null}
              </div>
              <CommonInput
                label="Referred by (optional)"
                type="text"
                id="referredBy"
                name="referredBy"
                placeholder="Enter referral code"
                value={form.referredBy}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                touched={touched.referredBy}
                error={errors.referredBy}
                valid={touched.referredBy && !errors.referredBy && form.referredBy}
              />
              <div className="space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="ageCheck"
                    name="ageCheck"
                    checked={form.ageCheck}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-600 rounded bg-secondary-800"
                  />
                  <label htmlFor="ageCheck" className="ml-3 text-sm text-white">
                    I am at least 18 years old and agree to the{" "}
                    <a href="#" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                      Terms of Service
                    </a>
                  </label>
                </div>
                {touched.ageCheck && errors.ageCheck && (
                  <p className="text-danger-400 text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.ageCheck}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow hover:from-pink-600 hover:to-yellow-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting || !isFormValid}
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3 inline-block align-middle"></div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <div className="border-t border-secondary-700"></div>
              <div className="space-y-4">
                <p className="text-center text-secondary-400 text-sm flex items-center justify-center">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Or Register with
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    aria-label="Sign up with Google"
                  >
                    <img
                      src="https://img.icons8.com/color/24/000000/google-logo.png"
                      className="w-5 h-5 mr-3"
                      alt="Google"
                    />
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebookSignup}
                    className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    aria-label="Sign up with Facebook"
                  >
                    <img
                      src="https://img.icons8.com/color/24/000000/facebook-new.png"
                      className="w-5 h-5 mr-3"
                      alt="Facebook"
                    />
                    Facebook
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center text-secondary-400 text-sm mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
