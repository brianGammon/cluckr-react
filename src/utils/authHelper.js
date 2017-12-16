import firebase from 'firebase';
import { SubmissionError } from 'redux-form';

export default (values) => {
  return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .catch((error) => {
      throw new SubmissionError({ _error: error });
    });
};
