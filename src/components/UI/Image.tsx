import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { url } from "../../utils/utils";

interface Props {
  src: string;
  notServer: boolean;
  display: string;
  hash: string;
  label: string;
  props: any;
}
const ImageComponent: React.FC<Props> = ({
  src,
  notServer = false,
  display = "inline",
  hash,
  label,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded((pre) => !pre);
    };
    image.src = !notServer ? `${url}${src}` : src;

    // eslint-disable-next-line
  }, [src, hash, label, display, notServer]);
  return (
    <>
      <div style={{ display: imageLoaded ? "none" : display }}>
        <Blurhash
          className="blurhash-img"
          hash={hash}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <>
        <img
          src={!notServer ? `${url}${src}` : src}
          alt={label}
          {...props}
          loading="lazy"
          style={{ display: !imageLoaded ? "none" : display }}
        />
      </>
    </>
  );
};

export default ImageComponent;
