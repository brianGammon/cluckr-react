import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { chickenType } from '../types';
import DateField from './DateField';
import ChickenSelectField from './ChickenSelectField';
import WeightField from './WeightField';

const EggEditor = ({
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

        <Field component={DateField} name="date" />
        <Field component={ChickenSelectField} chickens={chickens} name="chickenId" />
        <Field component={WeightField} name="weight" />

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

EggEditor.propTypes = {
  chickens: PropTypes.objectOf(chickenType),
  error: PropTypes.shape({}),
  match: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
EggEditor.defaultProps = {
  chickens: null,
  error: null,
};

export default EggEditor;
