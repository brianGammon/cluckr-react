/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Field } from 'redux-form';
import FormField from '../components/FormField';

const ChickenEditor = ({
  error,
  match,
  submitting,
  history,
  thumbnailUrl,
  handleFormSubmit,
  previewDataUrl,
  resetPreview,
  hasExistingImage,
  isRemovingImage,
  removeProfileImage,
  onFileChange,
}) => {
  let imgUrl = '/assets/images/default-profile-photo_thumb.png';
  if (previewDataUrl) {
    imgUrl = previewDataUrl;
  } else if (hasExistingImage && !isRemovingImage) {
    imgUrl = thumbnailUrl;
  }
  const imgStyle = { backgroundImage: `url(${imgUrl})` };
  return (
    <form onSubmit={handleFormSubmit}>
      {error &&
        <div className="notification is-danger">
          { error.message || 'An error has occurred.' }
        </div>
      }

      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <p className="title is-6">{ match.params.id ? 'Edit' : 'Add' } Chicken</p>
          </div>
        </div>
      </div>

      <Field
        component={FormField}
        formclass="lg-field"
        autoFocus
        name="name"
        type="text"
        label="Name"
        maxLength="25"
      />

      <Field
        component={FormField}
        formclass="lg-field"
        name="breed"
        type="text"
        label="Breed"
        maxLength="25"
        showsuccess="false"
      />

      <Field
        component={FormField}
        formclass="md-field"
        name="hatched"
        type="date"
        label="Hatched On"
        showsuccess="false"
      />

      <p className="label">Photo</p>
      <div className="level is-mobile">
        <div className="level-left photo-picker">
          <div className="level-item">
            <div
              className="is-inline-block profile-image"
              style={imgStyle}
            />
          </div>
          <div className="level-item">
            <div>
              <div className="file is-small photo-button">
                <label className="file-label full-width">
                  <input
                    className="file-input"
                    onChange={onFileChange}
                    type="file"
                    accept="image/*"
                    name="photo"
                  />
                  <span className="file-cta full-width">
                    <span className="file-icon">
                      <i className="fa fa-camera" />
                    </span>
                    <span className="file-label">
                      Photo
                    </span>
                  </span>
                </label>
              </div>
              {(previewDataUrl || isRemovingImage) &&
                <div className="photo-button">
                  <button type="button" className="button is-small full-width" onClick={() => resetPreview()}>
                    <span className="icon is-small">
                      <i className="fa fa-undo" />
                    </span>
                    <span>
                      Revert
                    </span>
                  </button>
                </div>
              }

              {hasExistingImage && !previewDataUrl && !isRemovingImage &&
                <div>
                  <button type="button" className="button is-small" onClick={() => removeProfileImage()}>
                    <span className="icon is-small">
                      <i className="fa fa-ban" />
                    </span>
                    <span>
                      Delete Photo
                    </span>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="button is-primary" disabled={submitting}>Save</button>
      <button
        type="button"
        className="button cancel-button"
        onClick={() => history.goBack()}
        disabled={submitting}
      >
        Cancel
      </button>
    </form>
  );
};

export default ChickenEditor;
