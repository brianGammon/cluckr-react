import React from 'react';

const DateField = ({ input, meta: { touched, error } }) => (
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

export default DateField;
