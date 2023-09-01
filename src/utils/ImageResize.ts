import Resizer from "react-image-file-resizer";
export const ImageResize = (file:any) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      19,
      10,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};
