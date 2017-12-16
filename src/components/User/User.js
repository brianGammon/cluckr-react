import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { C } from '../../config/constants';
import UserBase from '../../components/User/UserBase';
import FormField from '../Common/FormField';

class UserForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authStatus === C.LOGGED_IN) {
      // logged in, let's show redirect if any, or show home
      try {
        const { from } = this.props.location.state || {
          from: { pathname: '/' },
        };
        nextProps.history.replace(from);
      } catch (err) {
        nextProps.history.replace('/');
      }
    }
  }

  render() {
    const {
      error,
      formMode,
      location,
      handleSubmit,
      submitting,
    } = this.props;
    let errorMessage;
    if (error) {
      errorMessage = error.message ? error.message : 'Sign in failed, An error has occurred';
    }
    return (
      <UserBase showTabs location={location} errorMessage={errorMessage}>
        <form onSubmit={handleSubmit}>
          <Field component={FormField} name="email" type="text" label="Email" autoComplete="username" />
          <Field
            component={FormField}
            name="password"
            type="password"
            label="Password"
            autoComplete={formMode === 'signup' ? 'new-password' : 'current-password'}
          />
          {formMode === 'signup' &&
            <Field
              component={FormField}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
            />
          }

          <button type="submit" className="button is-primary" disabled={submitting}>Submit</button>
          <Link className="is-pulled-right" to="/reset-password">Forgot Password?</Link>

        </form>
      </UserBase>
    );
  }
}

export default UserForm;
