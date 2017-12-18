/* global File, FileReader, Image */
/* eslint-disable no-console */
import pica from 'pica/dist/pica.min';

const resizeImage = (sourceCanvas, maxWidth, maxHeight, id) => {
  const targetCanvas = document.createElement('canvas');
  const currentWidth = sourceCanvas.width;
  let currentHeight = sourceCanvas.height;
  let newWidth = currentWidth;
  let newHeight = currentHeight;
  if (newWidth > maxWidth) {
    newWidth = maxWidth;
    // resize height proportionally
    const ratio = maxWidth / currentWidth; // is gonna be <1
    newHeight *= ratio;
  }
  currentHeight = newHeight;
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    // resize width proportionally
    const ratio = maxHeight / currentHeight; // is gonna be <1
    newWidth *= ratio;
  }
  // if (newHeight === sourceCanvas.height && newWidth === sourceCanvas.width) {
  //   // no resizing necessary
  //   console.log('no need to resize');
  //   Promise.resolve()
  // }

  targetCanvas.width = newWidth;
  targetCanvas.height = newHeight;

  return pica().resize(sourceCanvas, targetCanvas)
    .then(canvas => pica().toBlob(canvas, 'image/jpeg', 0.90))
    .then(blob => new File([blob], `${id}-${Math.round(newWidth)}x${Math.round(newHeight)}`, { type: blob.type }));
};

const buildImageSet = (img, id) => {
  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.width = img.width;
  sourceCanvas.height = img.height;
  const imgCtx = sourceCanvas.getContext('2d');
  if (!imgCtx) {
    return Promise.reject(new Error('canvas error'));
  }
  imgCtx.drawImage(img, 0, 0);

  const imageSet = {};
  return resizeImage(sourceCanvas, 480, 10000, id)
    .then((file) => {
      imageSet.image = file;
      console.log('Successfully processed main image');
      return resizeImage(sourceCanvas, 128, 10000, id);
    })
    .then((file) => {
      imageSet.thumbnail = file;
      console.log('Successfully processed thumbnail image');
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          imageSet.preview = reader.result;
          console.log('Successfully processed imageSet');
          resolve(imageSet);
        };
      });
    });
};

export default (file, id) => {
  const promise = new Promise((resolve, reject) => {
    if (file.type && !/^image\//g.test(file.type)) {
      return reject(new Error('Must be an image file type'));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');
      image.onload = () => {
        buildImageSet(image, id)
          .then(imageSet => resolve(imageSet))
          .catch(error => reject(error));
      };
      image.src = reader.result;
    };
    return reader.onload;
  });
  return promise;
};
