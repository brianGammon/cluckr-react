import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { signUp } from '../actions';
import User from '../components/User';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (values.password) {
    if (values.password.length < 8 || !/.*[0-9].*/.test(values.password)) {
      errors.password = 'Password must be at least 8 characters with 1 number.';
    }
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Must match your password.';
    }
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
    formMode: 'signup',
  };
};

const SignupForm = reduxForm({
  form: 'signupForm',
  validate,
  onSubmit: (values, dispatch) => dispatch(signUp(values)),
})(User);

export default connect(mapStateToProps)(SignupForm);
