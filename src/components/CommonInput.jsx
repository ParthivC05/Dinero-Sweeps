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
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  ...rest
}, ref) => {
  const inputId = id || name;
  const hasError = touched && error;
  const isValid = touched && valid && !error;

  return (
    <div className="w-full mb-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${inputId}Error` : undefined}
          disabled={disabled}
          className={`
            input-field
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${hasError ? 'border-danger-500 focus:ring-danger-500' : ''}
            ${isValid ? 'border-success-500 focus:ring-success-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          {...rest}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {hasError && (
        <div id={`${inputId}Error`} className="text-danger-400 text-xs mt-1 flex items-center" role="alert">
          {error}
        </div>
      )}
      {isValid && !hasError && (
        <div className="text-success-400 text-xs mt-1 flex items-center">Looks good!</div>
      )}
    </div>
  );
});

export default CommonInput; 