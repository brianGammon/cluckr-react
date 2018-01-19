import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import { saveItem } from '../actions';
import { nowAsMoment, dateStringAsMoment } from '../utils/dateHelper';
import './EggEditorPage.css';
import EggEditor from '../components/EggEditor';

const validate = (values) => {
  const errors = {};
  if (!values.date) {
    errors.date = 'Date laid is required';
  } else if (dateStringAsMoment(values.date).isAfter(nowAsMoment())) {
    errors.date = 'Date cannot be in the future';
  }

  if (!values.chickenId) {
    errors.chickenId = 'Chicken is required (or select unknown)';
  }

  if (values.weight) {
    if (values.weight < 10 || values.weight > 110) {
      errors.weight = 'Weight must be between 10 and 110 grams';
    }

    if (!values.weight.toString().match(/^\d+([.]\d{0,1})?$/)) {
      errors.weight = 'Use number format "0.0".';
    }
  }

  return errors;
};

const wrappedEggEditor = reduxForm({
  form: 'eggEditor',
  validate,
  onSubmit: (values, dispatch, props) => {
    const chickenName = props.chickens && props.chickens[values.chickenId]
      ? props.chickens[values.chickenId].name
      : 'Unknown';
    const userId = props.uid;
    const modified = moment().toISOString();
    const newValues = Object.assign(values, { chickenName, userId, modified });
    dispatch(saveItem('eggs', newValues, props.match.params.eggId));
  },
  onSubmitSuccess: (result, dispatch, props) => props.history.goBack(),
})(EggEditor);

const mapStateToProps = ({
  chickens,
  eggs,
  auth,
  dataLoading,
}, ownProps) => {
  let initialValues = {
    date: nowAsMoment().format('YYYY-MM-DD'),
  };
  const state = {
    uid: auth.uid,
    chickens,
    dataLoading,
  };
  // Only set initial values if data is loaded
  if (!dataLoading.isLoading) {
    const { eggId } = ownProps.match.params;
    if (eggId && eggs) {
      initialValues = Object.assign({ ...eggs[eggId] });
    } else {
      // eslint-disable-next-line no-undef
      const query = new URLSearchParams(ownProps.location.search);

      const dateQs = query.get('date');
      if (dateQs) {
        initialValues.date = dateQs;
      }

      const chickenIdQs = query.get('chickenId');
      if (chickenIdQs) {
        initialValues.chickenId = chickenIdQs;
      }
    }
  }

  if (initialValues.date) {
    state.initialValues = initialValues;
  }
  return state;
};

export default connect(mapStateToProps)(wrappedEggEditor);
