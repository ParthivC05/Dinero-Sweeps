import React, { forwardRef } from "react";

const CommonInput = forwardRef(({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  name,
  id,
  placeholder,
  required = false,
  autoComplete,
  error,
  touched,
  valid,
  className = "",
  ...rest
}, ref) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`form-control${touched && error ? " is-invalid" : ""}${touched && valid ? " is-valid" : ""} ${className}`}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!(touched && error)}
        aria-describedby={error ? `${id || name}Error` : undefined}
        {...rest}
      />
      {touched && error && (
        <div id={`${id || name}Error`} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
      {touched && valid && !error && (
        <div className="valid-feedback d-block">Looks good!</div>
      )}
    </div>
  );
});

export default CommonInput; 