import Resizer from "react-image-file-resizer";
export const ImageResize = (file:any) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      19,
      10,
      "JPEG",
      30,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};

export const ImageOptimizer = (file:any) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "PNG",
      40,
      0,
      (file) => {
        resolve(file);
      },
      "file"
    );
  });
};
