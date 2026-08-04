export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password =
      "Password must be at least 8 characters";
  }

  return errors;
}

export function validateRegister(formData) {
  const errors = {};

  const fullName = formData.fullName.trim();
  const email = formData.email.trim();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

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