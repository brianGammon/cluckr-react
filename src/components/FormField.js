import React from 'react';

const FormField = ({
  input: {
    name,
    value,
    onBlur,
    onChange,
  },
  type,
  label,
  autoComplete,
  meta: { touched, error, pristine },
  ...rest
}) => {
  const { formclass = '', showsuccess = 'true' } = { ...rest };
  const isError = error && touched;
  const isSuccess = !error && touched && (showsuccess === 'true');
  return (
    <div className={`field ${formclass}`}>
      <label className="label" htmlFor={name}>{label}</label>
      <div className="control has-icons-right">
        <input
          // https://github.com/erikras/redux-form/issues/860
          onBlur={pristine ? null : onBlur}
          {...{
            name,
            value,
            onChange,
            type,
            ...rest,
          }}
          className={`input ${isError ? 'is-danger' : ''} ${isSuccess ? 'is-success' : ''}`}
          autoComplete={autoComplete}
        />
        {isSuccess &&
          <span className="icon is-small is-right">
            <i className="fa fa-check" />
          </span>
        }
        {isError &&
          <span className="icon is-small is-right">
            <i className="fa fa-warning" />
          </span>
        }
      </div>
      {isError &&
        <p className="help is-danger">{ error }</p>
      }
    </div>
  );
};

export default FormField;
