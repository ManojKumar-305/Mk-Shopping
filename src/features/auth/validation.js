export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value) {
  return String(value ?? "").trim();
}

export function validateLogin({ email, password }) {
  const errors = {};
  const normalizedEmail = sanitizeText(email).toLowerCase();
  const normalizedPassword = sanitizeText(password);

  if (!normalizedEmail) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(normalizedEmail)) {
    errors.email = "Enter a valid email";
  }

  if (!normalizedPassword) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateRegister(formData) {
  const errors = {};

  const fullName = sanitizeText(formData.fullName);
  const email = sanitizeText(formData.email).toLowerCase();
  const password = sanitizeText(formData.password);
  const confirmPassword = sanitizeText(formData.confirmPassword);

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else {
    if (password.length < 8) {
      errors.password =
        "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password =
        "Password must contain at least one number.";
    }
  }

  if (!confirmPassword) {
    errors.confirmPassword =
      "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms =
      "You must accept the Terms & Conditions.";
  }

  return errors;
}