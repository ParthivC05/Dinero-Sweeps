import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import banner from "../assets/banner.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, Shield, AlertTriangle, ArrowDown } from "lucide-react";
import CommonInput from "../components/CommonInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const validate = (values) => {
    const errs = {};
    if (!values.username) errs.username = "Username is required.";
    if (!values.password) errs.password = "Password is required.";
    else if (!/^(?=.*[A-Z])(?=.*\d).{8,20}$/.test(values.password))
      errs.password = "Password must be 8-20 characters with at least one number and one uppercase letter.";
    if (!captchaToken) errs.captcha = "Please complete the reCAPTCHA verification.";
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
    toast.info(`Password reset link sent for username: ${form.username} (Demo)`);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/facebook`;
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
        const response = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(requestPayload),
        });
        let responseData = {};
        const text = await response.text();
        if (text) {
          try {
            responseData = JSON.parse(text);
          } catch (parseError) {
            responseData = { message: "Invalid response format" };
          }
        }
        setSubmitting(false);
        if (response.ok && responseData.data && responseData.data.user && responseData.data.accessToken) {
          localStorage.setItem("authToken", responseData.data.accessToken);
          localStorage.setItem("user", JSON.stringify(responseData.data.user));
          toast.success("Login successful!");
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
            setCaptchaToken(null);
          }
          navigate("/"); 
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
      <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
        <div className="flex-1 flex items-center justify-center w-full px-4 py-8">
          <div className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-lg animate-fade-in">
            <img
              src={banner}
              alt="Promo Banner"
              className="w-full rounded-lg mb-6"
            />
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {loginError && (
                <div
                  className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{loginError}</span>
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
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <CommonInput
                    type={showPassword ? "text" : "password"}
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
              <div className="space-y-3">
                <div className="flex items-center text-sm font-medium text-white">
                  <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                  Security Verification
                </div>
                <div className="flex flex-col items-center">
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
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.captcha}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow hover:from-pink-600 hover:to-yellow-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting || !isFormValid}
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3 inline-block align-middle"></div>
                ) : (
                  "Login"
                )}
              </button>
              {!isFormValid && (
                <div id="formErrors" className="sr-only" aria-live="polite">
                  Please fix the form errors above to continue.
                </div>
              )}
              <div className="text-center">
                <button
                  type="button"
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  onClick={handleForgotPassword}
                  aria-describedby="forgotPasswordHelp"
                >
                  Forgot your password?
                </button>
                <p
                  id="forgotPasswordHelp"
                  className="text-secondary-400 text-xs mt-1"
                >
                  Enter your username above and click this link to reset your password.
                </p>
              </div>
              <div className="border-t border-secondary-700"></div>
              <div className="space-y-4">
                <p className="text-center text-secondary-400 text-sm flex items-center justify-center">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Or sign in with
                </p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    aria-label="Sign in with Google account"
                  >
                    <img
                      src="https://img.icons8.com/color/24/000000/google-logo.png"
                      className="w-5 h-5 mr-3"
                      alt="Google logo"
                      aria-hidden="true"
                    />
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebookLogin}
                    className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    aria-label="Sign in with Facebook account"
                  >
                    <img
                      src="https://img.icons8.com/color/24/000000/facebook-new.png"
                      className="w-5 h-5 mr-3"
                      alt="Facebook logo"
                      aria-hidden="true"
                    />
                    Continue with Facebook
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-secondary-400 text-sm">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                    Sign up here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
