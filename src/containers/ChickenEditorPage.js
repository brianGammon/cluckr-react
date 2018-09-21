/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import { saveItem } from '../actions';
import resizer from '../utils/imageTools';
import { uploadToStorage, deleteFromStorage } from '../utils/storageHelper';
import ChickenEditor from '../components/ChickenEditor';
import './ChickenEditorPage.css';

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
    thumbnail: null,
    previewDataUrl: null,
  },
};

class ChickenEditorPage extends Component {
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
    const { uid } = this.props;
    const processNewImage = !!newImageSet.image;
    const removeExistingImage = imagesToDelete.length > 0;

    const deleteImages = removeExistingImage
      ? deleteFromStorage(imagesToDelete)
      : Promise.resolve();

    const uploadImages = processNewImage
      ? uploadToStorage(newImageSet, uid)
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
      });
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
    const { initialValues } = this.props;
    const { newImageSet: { previewDataUrl }, imagesToDelete } = this.state;
    const hasExistingImage = initialValues && initialValues.photoUrl;
    const isRemovingImage = imagesToDelete.length > 0;

    return (
      <ChickenEditor
        {...this.props}
        handleFormSubmit={this.props.handleSubmit(values => this.onFormSubmit(values))}
        thumbnailUrl={initialValues ? initialValues.thumbnailUrl : ''}
        previewDataUrl={previewDataUrl}
        resetPreview={this.resetPreview}
        hasExistingImage={!!hasExistingImage}
        isRemovingImage={isRemovingImage}
        removeProfileImage={this.removeProfileImage}
        onFileChange={this.onFileChange}
      />
    );
  }
}

const wrappedChickenEditor = reduxForm({
  form: 'chickenEditor',
  validate,
  onSubmitSuccess: (result, dispatch, props) => props.history.goBack(),
})(ChickenEditorPage);

const mapStateToProps = ({
  auth,
  chickens,
  dataLoading,
}, ownProps) => {
  let initialValues = {};
  const state = {
    uid: auth.uid,
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
