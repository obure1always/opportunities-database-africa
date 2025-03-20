export interface ValidationError {
  field: string
  message: string
}

export const validateSignIn = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' })
  }

  return errors
}

export const validateSignUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  userType: string,
  agreeToTerms: boolean
): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!firstName) {
    errors.push({ field: 'firstName', message: 'First name is required' })
  }

  if (!lastName) {
    errors.push({ field: 'lastName', message: 'Last name is required' })
  }

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  if (!userType) {
    errors.push({ field: 'userType', message: 'Please select a user type' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' })
  }

  if (!confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Please confirm your password' })
  } else if (password !== confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' })
  }

  if (!agreeToTerms) {
    errors.push({ field: 'agreeToTerms', message: 'You must agree to the terms and conditions' })
  }

  return errors
} 