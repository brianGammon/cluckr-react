import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { signIn } from '../actions';
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

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
    formMode: 'login',
  };
};

const LoginForm = reduxForm({
  form: 'loginForm',
  validate,
  onSubmit: (values, dispatch) => dispatch(signIn(values)),
})(User);

export default connect(mapStateToProps)(LoginForm);
