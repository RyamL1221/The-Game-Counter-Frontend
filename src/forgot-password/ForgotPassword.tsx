import React, { useState } from 'react';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState<string|null>(null);
  const [questionError, setQuestionError] = useState<string|null>(null);
  const [questionLoading, setQuestionLoading] = useState(false);

  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  // 1) Fetch security question
  const fetchSecurityQuestion = async () => {
    setQuestionError(null);
    setQuestionLoading(true);
    setSecurityQuestion(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/get-security-question`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to load security question');
      }
      setSecurityQuestion(payload.security_question);
    } catch (err: any) {
      setQuestionError(err.message);
    } finally {
      setQuestionLoading(false);
    }
  };

  // 2) Submit new password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!securityQuestion) {
      setError('Please load your security question first.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            security_answer: securityAnswer,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to reset password');
      }

      setSuccess('Password changed successfully.');
      // clear form
      setEmail('');
      setSecurityQuestion(null);
      setSecurityAnswer('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <h2>Reset Your Password</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <button
        type="button"
        onClick={fetchSecurityQuestion}
        className="get-question-btn"
        disabled={questionLoading || !email}
      >
        {questionLoading ? 'Loading…' : 'Get Security Question'}
      </button>

      {questionError && <div className="error">{questionError}</div>}
      {securityQuestion && (
        <div className="security-question">
          {securityQuestion}
        </div>
      )}

      {securityQuestion && (
        <>
          <label>
            Your Answer
            <input
              type="text"
              value={securityAnswer}
              onChange={e => setSecurityAnswer(e.target.value)}
              required
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Reset Password'}
          </button>
        </>
      )}
    </form>
  );
}
