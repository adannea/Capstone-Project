import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  it('shows an error and blocks save when username is too short', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText('Username'), 'ab');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText(/Username must be 3–30 characters/)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('shows an error and blocks save when email format is invalid', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText('Username'), 'validuser');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText(/Enter a valid email address/)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('shows an error and blocks save when passwords do not match', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText('Username'), 'validuser');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('New Password'), 'Abcd123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'different');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave with the correct payload when all input is valid', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText('Display Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Username'), 'jane_doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      displayName: 'Jane Doe',
      username: 'jane_doe',
      email: 'jane@example.com',
    });
  });
});