export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};