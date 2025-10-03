import image_5d983775620195710e62e1ea1ea91c7a6d5abec3 from 'figma:asset/5d983775620195710e62e1ea1ea91c7a6d5abec3.png';
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  image_5d983775620195710e62e1ea1ea91c7a6d5abec3

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
