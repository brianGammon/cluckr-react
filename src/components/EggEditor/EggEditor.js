import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { saveItem } from '../../actions';
import { nowAsMoment, dateStringAsMoment } from '../../utils/dateHelper';
import './EggEditor.css';

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

const renderDate = ({ input, meta: { touched, error } }) => (
  <div className="field md-field">
    <label htmlFor="date" className="label">Date</label>
    <div className="control">
      <input {...input} type="date" className={`input ${touched && error ? 'is-danger' : ''}`} />
    </div>
    {touched && error &&
      <p className="help is-danger">
        { error }
      </p>
    }
  </div>
);

const renderChickenSelect = ({ chickens, input, meta: { touched, error } }) => (
  <div className="field md-field">
    <label htmlFor="chickenId" className="label">Chicken</label>
    <div className="control">
      <div className="select">
        <select {...input} component="select">
          <option value="">Select a chicken</option>
          <option value="unknown">I&#39;m not sure</option>
          {Object.keys(chickens || {}).map(id => (
            <option key={id} value={id}>{chickens[id].name}</option>
          ))}
        </select>
      </div>
    </div>
    {touched && error &&
      <p className="help is-danger">
        { error }
      </p>
    }
  </div>
);

const renderWeight = ({ input, meta: { touched, error } }) => (
  <div className="field md-field">
    <label htmlFor="weight" className="label">Weight (g)</label>
    <div className="control has-icons-right">
      <input {...input} type="text" className={`input ${touched && error ? 'is-danger' : ''}`} />
      {touched && error &&
        <span className="icon is-small is-right">
          <i className="fa fa-warning" />
        </span>
      }
    </div>
    {touched && error &&
      <p className="help is-danger">
        { error }
      </p>
    }
  </div>
);

let EggEditor = ({
  chickens,
  error,
  handleSubmit,
  history,
  submitting,
  match,
}) => {
  return (
    <div>
      {error &&
        <div className="notification is-danger">
          {error.code ? `An error has occurred: ${error.code}` : 'An error has occured, sorry about that!'}
        </div>
      }
      <form onSubmit={handleSubmit}>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="title is-6">{match.params.eggId ? 'Edit Egg' : 'Add Egg'}</p>
            </div>
          </div>
        </div>

        <Field component={renderDate} name="date" />
        <Field component={renderChickenSelect} chickens={chickens} name="chickenId" />
        <Field component={renderWeight} name="weight" />

        <div className="field">
          <div className="control">
            <label htmlFor="damaged" className="checkbox">
              <Field
                component="input"
                type="checkbox"
                name="damaged"
              /> This egg was found damaged
            </label>
          </div>
        </div>

        <div className="field">
          <label htmlFor="notes" className="label">Notes</label>
          <div className="control">
            <Field
              component="textarea"
              className="textarea"
              name="notes"
              maxLength="250"
              placeholder="e.g. Anything interesting about this egg"
            />
          </div>
        </div>

        <button type="submit" className="button is-primary" disabled={submitting}>Submit</button>
        <button type="button" className="button cancel-button" disabled={submitting} onClick={history.goBack}>
          Cancel
        </button>
      </form>
    </div>
  );
};

EggEditor = reduxForm({
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

export default connect(mapStateToProps)(EggEditor);
