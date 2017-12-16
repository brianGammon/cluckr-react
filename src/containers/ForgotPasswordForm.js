import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { resetPassword } from '../actions';
import ForgotPassword from '../components/User/ForgotPassword';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

const ForgotPasswordForm = reduxForm({
  form: 'forgotPasswordForm',
  validate,
  onSubmit: (values, dispatch) => dispatch(resetPassword(values)),
})(ForgotPassword);

export default connect(mapStateToProps)(ForgotPasswordForm);
