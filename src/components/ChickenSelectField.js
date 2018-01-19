import React from 'react';

const ChickenSelectField = ({ chickens, input, meta: { touched, error } }) => (
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

export default ChickenSelectField;
