import React from 'react';

const WeightField = ({ input, meta: { touched, error } }) => (
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

export default WeightField;
