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

export const fetchFlocks = () => {
  return (dispatch, getState) => {
    const { auth, userSettings } = getState();

    const promise = new Promise((resolve) => {
      if (auth.uid) {
        // Wipe out existing flock state
        dispatch({ type: C.FLOCKS_RESET });
        let tracker = 0;
        const keys = Object.keys(userSettings.flocks || {});
        if (keys.length === 0) {
          return resolve();
        }
        return keys.forEach((flockKey) => {
          const flockRef = `flocks/${flockKey}`;
          // Only need to listen on the currently active flock
          firebaseRef.child(flockRef).once('value', (snapshot) => {
            dispatch({
              type: C.FLOCK,
              payload: { $key: flockKey, ...snapshot.val() },
            });
          }).then(() => {
            tracker += 1;
            if (tracker === keys.length) {
              resolve();
            }
          });
        });
      }
      return resolve();
    });

    return promise;
  };
};

export const fetchChickens = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve) => {
      const { auth, dbRefs, userSettings } = getState();
      if (auth.uid) {
        const currentListener = dbRefs.chickens;
        const activeFlockId = userSettings.currentFlockId;

        if (!activeFlockId) {
          console.log('no active flock, remove state');
          if (currentListener) {
            console.log('remove existing listener');
            firebaseRef.child(currentListener).off();
            dispatch({ type: C.REF_OFF, payload: 'chickens' });
          }
          dispatch({ type: C.CHICKENS_RESET });
          return resolve();
        }

        const newListener = `chickens/${activeFlockId}`;
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
      const { auth, dbRefs, userSettings } = getState();
      if (auth.uid) {
        const currentListener = dbRefs.eggs;
        const activeFlockId = userSettings.currentFlockId;

        if (!activeFlockId) {
          console.log('no active flock, remove state');
          if (currentListener) {
            console.log('remove existing listener');
            firebaseRef.child(currentListener).off();
            dispatch({ type: C.REF_OFF, payload: 'eggs' });
          }
          dispatch({ type: C.EGGS_RESET });
          return resolve();
        }

        const newListener = `eggs/${activeFlockId}`;
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

export const updateUserSettings = (values) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    return firebaseRef.child(`userSettings/${auth.uid}`).update(values)
      .catch((error) => {
        throw new SubmissionError({ _error: error });
      });
  };
};

export const fetchUserSettings = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const promise = new Promise((resolve) => {
      if (auth.uid) {
        const userSettingsRef = `userSettings/${auth.uid}`;
        dispatch({ type: C.REF_ON, payload: { userSettings: userSettingsRef } });

        const ref = firebaseRef.child(userSettingsRef);
        return ref.on('value', (snapshot) => {
          const userSettings = snapshot.val();
          if (!userSettings || !userSettings.displayName) {
            // Running this update will trigger the 'on' event again
            dispatch(updateUserSettings({ displayName: auth.email || auth.uid }));
          } else {
            dispatch({ type: C.DATA_LOADING, payload: 'Fetching Flock...' });
            dispatch({
              type: C.USER_SETTINGS,
              payload: { $key: auth.uid, ...snapshot.val() },
            });
            dispatch(fetchFlocks())
              .then(() => dispatch(fetchChickens()))
              // .then(() => new Promise(resolver => setTimeout(() => resolver(), 2000)))
              .then(() => dispatch(fetchEggs()))
              .then(() => {
                dispatch({ type: C.DATA_LOADED });
                resolve();
              });
          }
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
    dispatch(fetchUserSettings())
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

export const deleteFlock = (flockId) => {
  return (dispatch, getState) => {
    const { auth, dbRefs } = getState();
    removeDbRefs(dbRefs, dispatch)
      .then(() => firebaseRef.child('userSettings').orderByChild(`flocks/${flockId}`).equalTo(true).once('value'))
      .then((snapshot) => {
        const promises = [];
        snapshot.forEach((childSnapshot) => {
          const { key } = childSnapshot;
          promises.push(firebaseRef.child(`userSettings/${key}/flocks/${flockId}`).remove()
            .then(() => firebaseRef.child(`userSettings/${key}/currentFlockId`).remove()));
        });
        return Promise.all(promises);
      })
      .then(() => firebaseRef.child(`eggs/${flockId}`).remove())
      .then(() => firebaseRef.child(`chickens/${flockId}`).remove())
      .then(() => firebaseRef.child(`flocks/${flockId}`).remove())
      .then(() => firebaseRef.child(`deletedFlocks/${auth.uid}/${flockId}`).set(true))
      .then(() => dispatch(fetchUserSettings()))
      .catch(error => console.log(error));
  };
};

export const joinFlock = (flockId) => {
  return (dispatch, getState) => {
    const { auth: { uid }, dbRefs } = getState();

    return firebaseRef.child(`flocks/${flockId}`).once('value')
      .then((snapshot) => {
        return new Promise((resolve, reject) => {
          if (snapshot.exists()) {
            dispatch({ type: C.REF_OFF, payload: 'userSettings' });
            firebaseRef.child(dbRefs.userSettings).off();
            return resolve();
          }
          return reject(new Error('Flock not found'));
        });
      })
      .then(() => firebaseRef.child(`userSettings/${uid}/flocks/${flockId}`).set(true))
      .then(() => firebaseRef.child(`userSettings/${uid}/currentFlockId`).set(flockId))
      .then(() => dispatch(fetchUserSettings()));
  };
};

export const newFlock = (name) => {
  return (dispatch, getState) => {
    const { auth: { uid }, dbRefs } = getState();
    let flockId;
    return firebaseRef.child('flocks').push({ name, ownedBy: uid })
      .then((snapshot) => {
        dispatch({ type: C.REF_OFF, payload: 'userSettings' });
        firebaseRef.child(dbRefs.userSettings).off();
        flockId = snapshot.key;
        return new Promise(resolve => resolve());
      })
      .then(() => firebaseRef.child(`userSettings/${uid}/flocks/${flockId}`).set(true))
      .then(() => firebaseRef.child(`userSettings/${uid}/currentFlockId`).set(flockId))
      .then(() => dispatch(fetchUserSettings()));
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
