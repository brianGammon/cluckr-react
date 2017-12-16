import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import UserBase from './UserBase';
import FormField from '../Common/FormField';

const ForgotPassword = ({ error, submitSucceeded, handleSubmit, submitting }) => {
  let errorMessage;
  if (error) {
    errorMessage = error.message ? error.message : 'Reset password failed, An error has occurred';
  }
  return (
    <UserBase showTabs={false} errorMessage={errorMessage}>
      <form onSubmit={handleSubmit}>
        {error && !submitSucceeded &&
          <div className="info-message">
            To reset your password, please type in your email address and click Submit.
          </div>
        }
        {submitSucceeded &&
          <div ngIf="success" className="notification is-success">
            <div>Please check your inbox for an email with instructions for resetting your password.</div>
            <Link to="/login">Return to Login</Link>
          </div>
        }
        <Field component={FormField} name="email" type="text" label="Email Address" />

        <button type="submit" className="button is-primary" disabled={submitting}>Submit</button>
        <Link className="is-pulled-right" to="/login">Return to Login</Link>
      </form>
    </UserBase>
  );
};

export default ForgotPassword;
