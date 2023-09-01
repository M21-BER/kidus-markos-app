import { ImageResize } from "./ImageResize";
import { encodeImageToBlurhash } from "./Encoder";
const ImageSizePlusEncoder = async (file:any) => {
  try {
    const resizeDImage = await ImageResize(file);
    const hash = await encodeImageToBlurhash(resizeDImage);
    return [hash, null];
  } catch (error) {
    return [null, error];
  }
};
export { ImageSizePlusEncoder };
