/* eslint-disable jsx-a11y/label-has-for, no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { saveItem } from '../../actions';
import FormField from '../Common/FormField';
import resizer from '../../utils/imageTools';
import { uploadToStorage, deleteFromStorage } from '../../utils/storageHelper';
import './ChickenEditor.css';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Chicken name is required.';
  }

  return errors;
};

const initialState = {
  imagesToDelete: [],
  newImageSet: {
    image: null,
    preview: null,
    thumbnail: null,
  },
};

class ChickenEditor extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onFileChange = this.onFileChange.bind(this);
    this.resetPreview = this.resetPreview.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.removeProfileImage = this.removeProfileImage.bind(this);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    const id = Math.floor(Date.now() / 1000).toString();
    resizer(file, id)
      .then((result) => {
        this.props.change('photoPath', null);
        return this.setState({ newImageSet: { ...result } });
      })
      .catch(error => console.log(error.message ? error.message : error));
  }

  onFormSubmit(values) {
    const { newImageSet, imagesToDelete } = this.state;
    const { uid, flockId } = this.props;
    const processNewImage = !!newImageSet.image;
    const removeExistingImage = imagesToDelete.length > 0;

    const deleteImages = removeExistingImage
      ? deleteFromStorage(imagesToDelete)
      : Promise.resolve();

    const uploadImages = processNewImage
      ? uploadToStorage(newImageSet, uid, flockId)
      : Promise.resolve({});

    return deleteImages
      .then(() => uploadImages)
      .then((uploadResult) => {
        const userId = this.props.uid;
        const modified = moment().toISOString();

        // wipe out existing photo metadata if user removed profile pic
        const photoValues = {};
        if (removeExistingImage && !processNewImage) {
          photoValues.photoUrl = '';
          photoValues.photoPath = '';
          photoValues.thumbnailUrl = '';
          photoValues.thumbnailPath = '';
        }

        const newValues = Object.assign(values, {
          userId,
          modified,
          ...uploadResult,
          ...photoValues,
        });
        return this.props.onSubmit(newValues);
      })
      .catch(error => console.log({ error }));
  }

  resetPreview() {
    this.setState(initialState);
  }

  removeProfileImage() {
    const paths = [];
    paths.push(this.props.initialValues.photoPath);
    paths.push(this.props.initialValues.thumbnailPath);
    this.setState({ imagesToDelete: paths });
  }

  render() {
    const errorMessage = 'Sample Error Message';
    const {
      initialValues,
      error,
      history,
      match,
      handleSubmit,
      submitting,
    } = this.props;
    const { newImageSet: { preview }, imagesToDelete } = this.state;
    const hasExistingImage = initialValues && initialValues.photoUrl;
    const removeExistingImage = imagesToDelete.length > 0;

    let imgUrl = '/assets/images/default-profile-photo_thumb.png';
    if (preview) {
      imgUrl = preview;
    } else if (hasExistingImage && !removeExistingImage) {
      imgUrl = initialValues.thumbnailUrl;
    }
    const imgStyle = { backgroundImage: `url(${imgUrl})` };
    return (
      <form onSubmit={handleSubmit(values => this.onFormSubmit(values))}>
        {error &&
          <div className="notification is-danger">
            { errorMessage }
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
                      onChange={this.onFileChange}
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
                {(preview || removeExistingImage) &&
                  <div className="photo-button">
                    <button type="button" className="button is-small full-width" onClick={() => this.resetPreview()}>
                      <span className="icon is-small">
                        <i className="fa fa-undo" />
                      </span>
                      <span>
                        Revert
                      </span>
                    </button>
                  </div>
                }

                {hasExistingImage && !preview && !removeExistingImage &&
                  <div>
                    <button type="button" className="button is-small" onClick={() => this.removeProfileImage()}>
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
  }
}

const wrappedChickenEditor = reduxForm({
  form: 'chickenEditor',
  validate,
  // onSubmit: values => console.log({ values }),
  // onSubmit: (values, dispatch, props) => {
  //   console.log({ values });
  //   // delete existing from storage if necessary

  //   // add new to storage

  //   // set paths and URLs in values

  //   // save item to FB
  //   const userId = props.uid;
  //   const modified = moment().toISOString();
  //   const newValues = Object.assign(values, { userId, modified });
  //   dispatch(saveItem('chickens', newValues, props.match.params.id));
  // },
  onSubmitSuccess: (result, dispatch, props) => props.history.goBack(),
})(ChickenEditor);

const mapStateToProps = ({
  auth,
  chickens,
  dataLoading,
  userSettings,
}, ownProps) => {
  let initialValues = {};
  const state = {
    uid: auth.uid,
    flockId: userSettings.currentFlockId,
    dataLoading,
  };
  // Only set initial values if data is loaded
  if (!dataLoading.isLoading) {
    const { id } = ownProps.match.params;
    if (id && chickens) {
      initialValues = Object.assign({ ...chickens[id] });
      state.initialValues = initialValues;
    }
  }

  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => dispatch(saveItem('chickens', values, ownProps.match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(wrappedChickenEditor);

