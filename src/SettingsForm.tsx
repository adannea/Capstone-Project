import { useState } from 'react';

export interface SettingsFormValues {
  displayName: string;
  username: string;
  email: string;
  newPassword?: string;
}

interface SettingsFormProps {
  onSave: (values: SettingsFormValues) => void;
}

interface Errors {
  displayName?: string;
  username?: string;
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const USERNAME_PATTERN = /^[A-Za-z0-9_-]{3,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function validate(values: {
  displayName: string;
  username: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}): Errors {
  const errors: Errors = {};

  if (values.displayName.length > 50) {
    errors.displayName = 'Display name must be 50 characters or fewer.';
  }

  if (!values.username) {
    errors.username = 'Username is required.';
  } else if (!USERNAME_PATTERN.test(values.username)) {
    errors.username = 'Username must be 3–30 characters (letters, numbers, _ or -).';
  }

  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.newPassword) {
    if (!PASSWORD_PATTERN.test(values.newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters and include upper, lower, number, and special character.';
    }
    if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
  }

  return errors;
}

function SettingsForm({ onSave }: SettingsFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [liveMessage, setLiveMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate({
      displayName,
      username,
      email,
      newPassword,
      confirmPassword,
    });
    setErrors(validationErrors);

    const errorCount = Object.keys(validationErrors).length;
    if (errorCount > 0) {
      setLiveMessage(`${errorCount} field${errorCount > 1 ? 's' : ''} need attention.`);
      return;
    }

    setLiveMessage('Settings saved.');
    onSave({
      displayName,
      username,
      email,
      ...(newPassword ? { newPassword } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="displayName">Display Name</label>
        <input
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          aria-describedby={errors.displayName ? 'displayName-error' : undefined}
          aria-invalid={Boolean(errors.displayName)}
        />
        {errors.displayName && (
          <p id="displayName-error" role="alert">
            {errors.displayName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-describedby={errors.username ? 'username-error' : undefined}
          aria-invalid={Boolean(errors.username)}
        />
        {errors.username && (
          <p id="username-error" role="alert">
            {errors.username}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
          aria-invalid={Boolean(errors.newPassword)}
        />
        {errors.newPassword && (
          <p id="newPassword-error" role="alert">
            {errors.newPassword}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          aria-invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" role="alert">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button type="submit">Save</button>

      <div aria-live="polite">{liveMessage}</div>
    </form>
  );
}

export default SettingsForm;