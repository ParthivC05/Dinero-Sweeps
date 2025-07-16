import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import banner from "../assets/banner.png";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonInput from "../components/CommonInput";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loginError, setLoginError] = useState("");
  const recaptchaRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://54.234.145.12:8004/api/v1';

  const LOGIN_ENDPOINT = `${API_BASE_URL}/user/login`; 

  const recaptchaSiteKey =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const validate = (values) => {
    const errs = {};
    if (!values.username) errs.username = "Username is required.";
    if (!values.password) errs.password = "Password is required.";
    else if (!/^(?=.*[A-Z])(?=.*\d).{8,20}$/.test(values.password))
      errs.password =
        "Password must be 8-20 characters with at least one number and one uppercase letter.";
    if (!captchaToken)
      errs.captcha = "Please complete the reCAPTCHA verification.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError("");
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: null }));
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
    setErrors((prev) => ({
      ...prev,
      captcha: "reCAPTCHA verification expired. Please try again.",
    }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!form.username) {
      setErrors((prev) => ({
        ...prev,
        username: "Please enter your username to reset your password.",
      }));
      return;
    }
    alert(`Password reset link sent for username: ${form.username} (Demo)`);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8004/api/v1/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:8004/api/v1/auth/facebook';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setLoginError(""); 

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);

      try {
        const requestPayload = {
          username: form.username,
          password: form.password,
          captchaToken: captchaToken,
        };

        console.log("Sending login request to:", LOGIN_ENDPOINT);
        console.log("Request payload:", requestPayload);

        const response = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          credentials: 'include', // Include cookies for CORS
          body: JSON.stringify(requestPayload),
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        let responseData = {};
        const text = await response.text();
        if (text) {
          try {
            responseData = JSON.parse(text);
          } catch (parseError) {
            console.error("Failed to parse response:", parseError);
            responseData = { message: "Invalid response format" };
          }
        }
        console.log("Response data:", responseData);

        setSubmitting(false);

        if (response.ok && responseData.data && responseData.data.user && responseData.data.accessToken) {
          
          localStorage.setItem("authToken", responseData.data.accessToken);
          localStorage.setItem("user", JSON.stringify(responseData.data.user));
          toast.success("Login successful!");
         
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
            setCaptchaToken(null);
          }
          
        } else {
          
          let errorMessage = "Login failed";
          
          if (responseData.errors && responseData.errors.length > 0) {
            errorMessage = responseData.errors[0].message || responseData.errors[0];
          } else if (responseData.message) {
            errorMessage = responseData.message;
          } else if (responseData.error) {
            errorMessage = responseData.error;
          } else if (responseData.detail) {
            errorMessage = responseData.detail;
          } else if (response.status === 401) {
            errorMessage = "Invalid username or password";
          } else if (response.status === 403) {
            errorMessage = "Access denied. Please check your credentials.";
          } else if (response.status === 400) {
            errorMessage = "Invalid request. Please check your input.";
          } else if (response.status === 0) {
            errorMessage = "Network error. Please check your connection.";
          } else {
            errorMessage = `Login failed (${response.status})`;
          }
          
          setLoginError(errorMessage);
          toast.error(errorMessage);
          
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
            setCaptchaToken(null);
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        setSubmitting(false);
        
        let errorMessage = "An unexpected error occurred. Please try again.";
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setLoginError(errorMessage);
        toast.error(errorMessage);
        
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
          setCaptchaToken(null);
        }
      }
    }
  };

  React.useEffect(() => {
    setErrors(validate(form));
    
  }, [form, captchaToken]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    form.username &&
    form.password &&
    captchaToken;

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div
        className="min-vh-100 d-flex flex-column bg-black overflow-x-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="d-flex flex-grow-1 align-items-center justify-content-center w-100 px-2"
          style={{ minHeight: 0, width: "100%" }}
        >
          <div
            className="card bg-black text-white shadow p-4 w-100 mt-3"
            style={{ maxWidth: 500 }}
          >
            <img
              src={banner}
              alt="Promo Banner"
              className="img-fluid rounded mb-3"
            />

            <form onSubmit={handleSubmit} noValidate>
              {loginError && (
                <div
                  className="alert alert-danger mb-3"
                  role="alert"
                  aria-live="polite"
                >
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {loginError}
                </div>
              )}

              <CommonInput
                label="Username"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="username"
                touched={touched.username}
                error={errors.username}
                valid={touched.username && !errors.username && form.username}
                autoFocus
              />

              <CommonInput
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="current-password"
                touched={touched.password}
                error={errors.password}
                valid={touched.password && !errors.password && form.password}
              />

              <div className="mb-3">
                <div className="form-label mb-2">
                  <i className="bi bi-shield-check me-2"></i>
                  Security Verification
                </div>
                <div className="d-flex flex-column align-items-center">
                  
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                    onChange={handleCaptchaChange}
                    onExpired={handleCaptchaExpired}
                    theme="light"
                    size="normal"
                    aria-label="Complete reCAPTCHA verification"
                  />
                  {errors.captcha && (
                    <div className="text-danger small mt-2" role="alert">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.captcha}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-warning text-dark fw-bold w-100 mb-3"
                disabled={!isFormValid || submitting}
                aria-disabled={!isFormValid || submitting}
                aria-describedby={!isFormValid ? "formErrors" : undefined}
              >
                {submitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {!isFormValid && (
                <div id="formErrors" className="sr-only" aria-live="polite">
                  Please fix the form errors above to continue.
                </div>
              )}

              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-link text-warning text-decoration-none p-0"
                  onClick={handleForgotPassword}
                  aria-describedby="forgotPasswordHelp"
                >
                  <i className="bi bi-question-circle me-1"></i>
                  Forgot your password?
                </button>
                <small
                  id="forgotPasswordHelp"
                  className="d-block text-muted mt-1"
                >
                  Enter your username above and click this link to reset your password.
                </small>
              </div>

              <hr className="border-secondary" />

              <p className="text-center text-white-50 mb-3">
                <i className="bi bi-arrow-down me-2"></i>
                Or sign in with
              </p>

              <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light d-flex align-items-center justify-content-center w-100"
                  onClick={handleGoogleLogin}
                  aria-label="Sign in with Google account"
                >
                  <img
                    src="https://img.icons8.com/color/24/000000/google-logo.png"
                    className="me-2"
                    alt="Google logo"
                    aria-hidden="true"
                  />
                  <span>Continue with Google</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center justify-content-center w-100"
                  onClick={handleFacebookLogin}
                  aria-label="Sign in with Facebook account"
                >
                  <img
                    src="https://img.icons8.com/color/24/000000/facebook-new.png"
                    className="me-2"
                    alt="Facebook logo"
                    aria-hidden="true"
                  />
                  <span>Continue with Facebook</span>
                </button>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-warning text-decoration-none">
                    Sign up here
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
