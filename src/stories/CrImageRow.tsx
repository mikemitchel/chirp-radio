// CrImageRow.tsx
import React from 'react'
import './CrImageRow.css'

interface ImageData {
  src: string
  alt?: string
}

interface CrImageRowProps {
  images?: ImageData[]
  className?: string
}

const defaultImages: ImageData[] = [
  {
    src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image 1',
  },
  {
    src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image 2',
  },
  {
    src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Image 3',
  },
]

export default function CrImageRow({ images = defaultImages, className = '' }: CrImageRowProps) {
  // Limit to 2-5 images
  const validImages = images.slice(0, 5)

  if (validImages.length < 2) {
    console.warn('CrImageRow requires at least 2 images')
    return null
  }

  return (
    <div className={`cr-image-row ${className}`}>
      {validImages.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt || `Image ${index + 1}`}
          className="cr-image-row__image"
        />
      ))}
    </div>
  )
}
