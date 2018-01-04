/* global File, FileReader */
/* eslint-disable no-console */
import loadImage from 'blueimp-load-image';
import 'blueimp-canvas-to-blob';

export default (file, id) => {
  if (file.type && !/^image\//g.test(file.type)) {
    return Promise.reject(new Error('Must be an image file type'));
  }

  const imageSet = {};
  const getImg = (maxWidth) => {
    return new Promise((resolve) => {
      loadImage(
        file,
        (canvas) => {
          canvas.toBlob(
            (blob) => {
              const newFile = new File([blob], `${id}-${canvas.width}x${canvas.height}`, { type: blob.type });
              resolve(newFile);
            },
            'image/jpeg',
          );
        },
        { maxWidth, orientation: true, crossOrigin: true },
      );
    });
  };

  return getImg(480)
    .then((mainImage) => {
      imageSet.image = mainImage;
      console.log('Successfully processed main image');
      return getImg(128);
    })
    .then((thumbnailImage) => {
      imageSet.thumbnail = thumbnailImage;
      console.log('Successfully processed thumbnail image');
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(thumbnailImage);
        reader.onload = () => {
          imageSet.preview = reader.result;
          console.log('Successfully processed imageSet');
          resolve(imageSet);
        };
      });
    });
};
