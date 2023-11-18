import React from "react";

interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export const Image = ({ alt, ...props }: ImageProps) => {
  return (
    <img alt={alt ?? ""} {...props}>
      {props.children}
    </img>
  );
};
