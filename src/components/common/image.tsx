import React from "react";

interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export const Image = (props: ImageProps) => {
  return <img {...props}>{props.children}</img>;
};
