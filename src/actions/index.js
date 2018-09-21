/* eslint-disable no-console */
import { SubmissionError } from 'redux-form';
import { deleteFromStorage } from '../utils/storageHelper';
import { C, firebaseRef, firebaseAuth } from '../config/constants';

const removeDbRefs = (dbRefs, dispatch) => {
  return new Promise((resolve) => {
    Object.keys(dbRefs).forEach((key) => {
      firebaseRef.child(dbRefs[key]).off();
    });
    dispatch({ type: C.REF_ALLOFF });
    resolve();
  });
};

export const fetchChickens = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve) => {
      const { auth, dbRefs } = getState();
      if (auth.uid) {
        const currentListener = dbRefs.chickens;

        const newListener = `userData/${auth.uid}/chickens`;
        if (currentListener) {
          if (newListener === currentListener) {
            // Already listening on this flock, so bail
            console.log('no need to add a listener');
            return resolve();
          }
          // switched flocks, so turn off the old listener
          firebaseRef.child(currentListener).off();
        }

        dispatch({ type: C.REF_ON, payload: { chickens: newListener } });
        const ref = firebaseRef.child(newListener);
        return ref.on('value', (snapshot) => {
          dispatch({
            type: C.CHICKENS,
            payload: snapshot.val(),
          });
          resolve();
        }, error => console.log({ error }));
      }
      return resolve();
    });

    return promise;
  };
};

export const fetchEggs = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve) => {
      const { auth, dbRefs } = getState();
      if (auth.uid) {
        const currentListener = dbRefs.eggs;

        const newListener = `userData/${auth.uid}/eggs`;
        if (currentListener) {
          if (newListener === currentListener) {
            // Already listening on this flock, so bail
            console.log('no need to add a listener');
            return resolve();
          }
          // switched flocks, so turn off the old listener
          firebaseRef.child(currentListener).off();
        }

        dispatch({ type: C.REF_ON, payload: { eggs: newListener } });
        const ref = firebaseRef.child(newListener);
        return ref.on('value', (snapshot) => {
          dispatch({
            type: C.EGGS,
            payload: snapshot.val(),
          });
          resolve();
        }, error => console.log({ error }));
      }
      return resolve();
    });
    return promise;
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    const { dbRefs } = getState();
    removeDbRefs(dbRefs, dispatch).then(() => {
      firebaseAuth.signOut();
    });
  };
};

export const startListening = (user) => {
  return (dispatch) => {
    dispatch({ type: C.LOGGING_IN, user });
    dispatch(fetchChickens())
      .then(() => dispatch(fetchEggs()))
      .then(() => dispatch({ type: C.LOGIN_SUCCESS }));
  };
};

export const deleteItem = (type, id) => {
  return (dispatch, getState) => {
    const { dbRefs } = getState();
    firebaseRef.child(`${dbRefs[type]}/${id}`)
      .remove()
      .catch(error => console.log(error));
  };
};

export const deleteChicken = (chickenId) => {
  return (dispatch, getState) => {
    const { dbRefs, eggs, chickens } = getState();

    // Need to find if there are images to remove from storage
    const imagesToDelete = [];
    const chicken = chickens[chickenId];
    if (chicken) {
      if (chicken.photoPath) {
        imagesToDelete.push(chicken.photoPath);
      }
      if (chicken.thumbnailPath) {
        imagesToDelete.push(chicken.thumbnailPath);
      }
    }
    const deleteImages = imagesToDelete.length > 0
      ? deleteFromStorage(imagesToDelete)
      : Promise.resolve();

    // Need to find all eggs laid by chicken
    const promises = [];
    Object.keys(eggs || {}).forEach((eggId) => {
      if (eggs[eggId].chickenId === chickenId) {
        promises.push(firebaseRef.child(`${dbRefs.eggs}/${eggId}`).remove());
      }
    });
    Promise.all(promises)
      .then(() => firebaseRef.child(`${dbRefs.chickens}/${chickenId}`).remove())
      .then(() => deleteImages)
      .catch(error => console.log(error));
  };
};

export const saveItem = (type, value, itemId) => {
  return (dispatch, getState) => {
    const { dbRefs } = getState();
    if (!itemId) {
      return firebaseRef.child(dbRefs[type]).push(value)
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 2000)))
        .catch((error) => {
          throw new SubmissionError({ _error: error });
        });
    }
    return firebaseRef.child(`${dbRefs[type]}/${itemId}`).update(value)
      .catch((error) => {
        throw new SubmissionError({ _error: error });
      });
  };
};

export const signIn = (values) => {
  return () => {
    return firebaseAuth.signInWithEmailAndPassword(values.email, values.password)
      .then(() => console.log('Signed in'))
      .catch((error) => {
        throw new SubmissionError({ _error: error });
      });
  };
};

export const signUp = (values) => {
  return () => {
    return firebaseAuth.createUserWithEmailAndPassword(values.email, values.password)
      .then(() => console.log('Signed up'))
      .catch((error) => {
        throw new SubmissionError({ _error: error });
      });
  };
};

export const resetPassword = (values) => {
  return () => {
    return firebaseAuth.sendPasswordResetEmail(values.email)
      .then(() => console.log('Reset password sent'))
      .catch((error) => {
        throw new SubmissionError({ _error: error });
      });
  };
};
