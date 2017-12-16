/* eslint-disable no-console */
import firebase from 'firebase';
import { firebaseStorageRef } from '../config/constants';

export const uploadToStorage = (imageSet, userId, flockId) => {
  const promise = new Promise((resolve, reject) => {
    let mainImageUrl = null;
    let mainImagePath = null;

    // Main image first
    let uploadTask = firebaseStorageRef
      .child(`uploads/user:${userId}/flock:${flockId}/${imageSet.image.name}`)
      .put(imageSet.image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Main image upload progress: ${progress}`);
      },
      (error) => {
        reject(new Error(error));
      },
      () => {
        mainImageUrl = uploadTask.snapshot.downloadURL;
        mainImagePath = uploadTask.snapshot.metadata.fullPath;
        uploadTask = firebaseStorageRef
          .child(`uploads/user:${userId}/flock:${flockId}/${imageSet.thumbnail.name}`)
          .put(imageSet.thumbnail);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            // upload in progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Thumbnail upload progress: ${progress}`);
          },
          (error) => {
            // upload failed
            reject(new Error(error));
          },
          () => {
            // upload success
            const uploadResult = {
              photoUrl: mainImageUrl,
              photoPath: mainImagePath,
              thumbnailUrl: uploadTask.snapshot.downloadURL,
              thumbnailPath: uploadTask.snapshot.metadata.fullPath,
            };

            // this.saveFileData(upload);
            resolve(uploadResult);
          },
        );
      },
    );
  });

  return promise;
};

export const deleteFromStorage = (paths) => {
  const promises = [];
  paths.forEach((path) => {
    const promise = firebaseStorageRef.child(path).delete().catch((error) => {
      if (error.code && error.code === 'storage/object-not-found') {
        // Swallow the error if image already deleted
        return new Promise(resolve => resolve({ success: true }));
      }
      throw (error);
    });
    promises.push(promise);
  });
  return Promise.all(promises);
};
