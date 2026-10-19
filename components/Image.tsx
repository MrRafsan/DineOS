'use client';

import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
  style,
  ...props
}) => {
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(fill
      ? {
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: 'cover',
        }
      : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={combinedStyle}
      {...props}
    />
  );
};

export default Image;
