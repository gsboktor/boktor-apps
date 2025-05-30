import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';

// Zod Schemas
const emailSchema = z.string().min(1, 'Email is required').email('Please enter a valid email address');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number, and special character',
  );

const authFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Types
type AuthFormData = z.infer<typeof authFormSchema>;

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface FieldValidation {
  isValid: boolean;
  error?: string;
}

// Validator Functions using Zod
const validateEmail = (email: string): FieldValidation => {
  const result = emailSchema.safeParse(email);
  return {
    isValid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
};

const validatePassword = (password: string): FieldValidation => {
  const result = passwordSchema.safeParse(password);
  return {
    isValid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
};

const validateConfirmPassword = (password: string, confirmPassword: string): FieldValidation => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
};

const validateForm = (formData: AuthFormData): { isValid: boolean; errors: ValidationErrors } => {
  const result = authFormSchema.safeParse(formData);

  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors: ValidationErrors = {};

  result.error.errors.forEach((error) => {
    const field = error.path[0] as keyof ValidationErrors;
    if (field && !errors[field]) {
      errors[field] = error.message;
    }
  });

  return { isValid: false, errors };
};

// Custom Hooks
const useAuthForm = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const updateField = useCallback(
    (field: keyof AuthFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const markFieldAsTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback(
    (field: keyof AuthFormData) => {
      let validation: FieldValidation;

      switch (field) {
        case 'email':
          validation = validateEmail(formData.email);
          break;
        case 'password':
          validation = validatePassword(formData.password);
          break;
        case 'confirmPassword':
          validation = validateConfirmPassword(formData.password, formData.confirmPassword);
          break;
        default:
          return;
      }

      if (!validation.isValid) {
        setErrors((prev) => ({ ...prev, [field]: validation.error }));
      }
    },
    [formData],
  );

  const isFormValid = useMemo(() => {
    const validation = validateForm(formData);
    return validation.isValid;
  }, [formData]);

  const handleSubmit = useCallback(
    (onSubmit: (data: AuthFormData) => void) => {
      const validation = validateForm(formData);

      if (validation.isValid) {
        onSubmit(formData);
      } else {
        setErrors(validation.errors);
        // Mark all fields as touched to show errors
        setTouched({
          email: true,
          password: true,
          confirmPassword: true,
        });
      }
    },
    [formData],
  );

  return {
    formData,
    errors,
    touched,
    isFormValid,
    updateField,
    markFieldAsTouched,
    validateField,
    handleSubmit,
  };
};

// Input Components
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

const InputField = ({ id, label, type, value, onChange, onBlur, error, placeholder, className = '' }: InputFieldProps) => {
  return (
    <div id={`${id}-field-container`} className={`mb-4 ${className}`}>
      <label htmlFor={id} id={`${id}-label`} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

interface SubmitButtonProps {
  isEnabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ isEnabled, onClick, children, className = '' }: SubmitButtonProps) => {
  return (
    <button
      id="auth-submit-button"
      type="button"
      onClick={onClick}
      disabled={!isEnabled}
      aria-describedby="auth-submit-button-description"
      className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
        isEnabled ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      } ${className}`}
    >
      {children}
    </button>
  );
};

// Google Sign-In Component
const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
    // Handle Google OAuth integration here
    alert('Google sign-in would be implemented here');
  };

  return (
    <motion.button
      id="google-signin-button"
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg id="google-icon" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Sign in with Google
    </motion.button>
  );
};

// Form Divider Component
const FormDivider = () => {
  return (
    <div id="auth-form-divider" className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">or</span>
      </div>
    </div>
  );
};

// Form Components
const AuthForm = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { formData, errors, touched, isFormValid, updateField, markFieldAsTouched, validateField, handleSubmit } = useAuthForm();

  const onSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Form submitted successfully!');
  };

  const handleCreateAccountClick = () => {
    setShowCreateForm(true);
  };

  const handleBackToOptions = () => {
    setShowCreateForm(false);
    // Reset form data when going back
    // You could add a reset function to the useAuthForm hook if needed
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      id="auth-form-container"
      layout
      transition={{
        layout: {
          duration: 0.4,
          ease: 'easeInOut',
        },
      }}
    >
      <AnimatePresence mode="wait">
        {!showCreateForm ? (
          // Initial view with two buttons
          <motion.div
            key="buttons-view"
            id="auth-options"
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <motion.button
              id="create-account-option-button"
              type="button"
              onClick={handleCreateAccountClick}
              className="w-full py-3 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              Create Account
            </motion.button>

            <motion.div variants={itemVariants} layout>
              <FormDivider />
            </motion.div>

            <motion.div variants={itemVariants} layout>
              <GoogleSignInButton />
            </motion.div>
          </motion.div>
        ) : (
          // Create account form view
          <motion.div
            key="form-view"
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            {/* Back button - positioned in top left */}
            <motion.button
              id="back-to-options-button"
              type="button"
              onClick={handleBackToOptions}
              className="absolute -top-2 -left-2 flex items-center text-sm text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md p-2 transition-colors duration-200 z-10"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </motion.button>

            {/* Email/Password Form */}
            <motion.form
              id="auth-form"
              className="space-y-4 pt-8"
              onSubmit={(e) => e.preventDefault()}
              variants={containerVariants}
              layout
            >
              <motion.div variants={itemVariants} layout>
                <InputField
                  id="auth-email-input"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => updateField('email', value)}
                  onBlur={() => {
                    markFieldAsTouched('email');
                    validateField('email');
                  }}
                  error={touched.email ? errors.email : undefined}
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div variants={itemVariants} layout>
                <InputField
                  id="auth-password-input"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(value) => updateField('password', value)}
                  onBlur={() => {
                    markFieldAsTouched('password');
                    validateField('password');
                    // Also validate confirm password if it has been touched
                    if (touched.confirmPassword) {
                      validateField('confirmPassword');
                    }
                  }}
                  error={touched.password ? errors.password : undefined}
                  placeholder="Enter your password"
                />
              </motion.div>

              <motion.div variants={itemVariants} layout>
                <InputField
                  id="auth-confirm-password-input"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(value) => updateField('confirmPassword', value)}
                  onBlur={() => {
                    markFieldAsTouched('confirmPassword');
                    validateField('confirmPassword');
                  }}
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                  placeholder="Re-enter your password"
                />
              </motion.div>

              <div id="auth-submit-button-description" className="sr-only">
                Submit button is {isFormValid ? 'enabled' : 'disabled'}.
                {!isFormValid && 'Please fill in all required fields correctly to enable submission.'}
              </div>

              <motion.div variants={itemVariants} layout>
                <SubmitButton isEnabled={isFormValid} onClick={() => handleSubmit(onSubmit)}>
                  Create Account
                </SubmitButton>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AuthHeader = () => {
  return (
    <div id="auth-header" className="text-center mb-8">
      <h1 id="auth-page-title" className="text-3xl font-bold text-gray-900 mb-2">
        Create Your Account
      </h1>
      <p id="auth-page-subtitle" className="text-gray-600">
        Please fill in your information to get started
      </p>
    </div>
  );
};

// Main AuthPage Component
export function AuthPage() {
  return (
    <div id="auth-page-container" className="flex items-center justify-center max-h-full">
      <div id="auth-page-content" className="max-w-md w-96 space-y-8">
        <div id="auth-page-card" className="bg-white rounded-lg shadow-md p-8">
          <AuthHeader />
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
