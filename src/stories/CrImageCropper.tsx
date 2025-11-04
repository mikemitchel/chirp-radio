// CrImageCropper.tsx
import React, { useState, useRef, useCallback } from 'react'
import { PiUploadSimple, PiPencilSimple } from 'react-icons/pi'
import CrButton from './CrButton'
import CrModal from './CrModal'
import './CrImageCropper.css'

interface CrImageCropperProps {
  onImageChange?: (imageData: {
    fullImage: string
    croppedImage: string
    orientation?: string
  }) => void
  maxFileSize?: number
  acceptedFormats?: string
  initialFullImage?: string | null
  initialCroppedImage?: string | null
  showFullImage?: boolean // Control whether to show the full image section (for DJs only)
  initialOrientation?: 'square' | 'landscape' | 'portrait'
  onOrientationChange?: (orientation: 'square' | 'landscape' | 'portrait') => void
}

export default function CrImageCropper({
  onImageChange,
  maxFileSize = 2 * 1024 * 1024, // 2MB default
  acceptedFormats = 'image/jpeg,image/png',
  initialFullImage = null, // Pre-populate with existing full image
  initialCroppedImage = null, // Pre-populate with existing cropped image
  showFullImage = true, // Default to showing full image for backwards compatibility
  initialOrientation = 'square',
  onOrientationChange,
}: CrImageCropperProps) {
  // Fixed sizes - no customization needed
  const avatarSize = 200

  // Core state management - cleaner separation
  const [images, setImages] = useState({
    full: initialFullImage,
    cropped: initialCroppedImage,
  })

  // Sync images state when props change (for profile switching)
  React.useEffect(() => {
    setImages({
      full: initialFullImage,
      cropped: initialCroppedImage,
    })
  }, [initialFullImage, initialCroppedImage])

  // Image orientation state
  const [orientation, setOrientation] = useState<'square' | 'landscape' | 'portrait'>(
    initialOrientation
  )

  // Sync orientation when prop changes
  React.useEffect(() => {
    setOrientation(initialOrientation)
  }, [initialOrientation])

  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  // Image processing state
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null)
  const [cropperState, setCropperState] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    lastMousePos: { x: 0, y: 0 },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageElementRef = useRef<HTMLImageElement>(null)
  const cropContainerRef = useRef<HTMLDivElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)

  // Cropper settings
  const containerSize = 400
  const cropSize = 300
  const cropOffset = 50
  const outputSize = avatarSize

  // Initialize currentImage from initialFullImage if provided
  React.useEffect(() => {
    if (initialFullImage) {
      const img = new Image()
      img.crossOrigin = 'anonymous' // Enable CORS for canvas export
      img.onload = () => {
        setCurrentImage(img)
        // Reset cropper state when new image loads
        setCropperState({
          scale: 1,
          position: { x: 0, y: 0 },
          isDragging: false,
          lastMousePos: { x: 0, y: 0 },
        })
      }
      img.onerror = (error) => {
        console.warn(
          'Failed to load initial image with CORS. Canvas export will be limited.',
          error
        )
        // Still set the image so display works, but canvas operations may fail
        setCurrentImage(img)
      }
      img.src = initialFullImage
    } else {
      // Clear the image if initialFullImage becomes null
      setCurrentImage(null)
    }
  }, [initialFullImage])

  const resetCropperState = useCallback(() => {
    setCropperState({
      scale: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      lastMousePos: { x: 0, y: 0 },
    })
  }, [])

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file) return

      // Validate file size
      if (file.size > maxFileSize) {
        alert(`File size must be less than ${Math.round(maxFileSize / (1024 * 1024))}MB`)
        return
      }

      // Validate file type
      if (!acceptedFormats.split(',').some((format) => file.type === format.trim())) {
        alert('Please upload a JPG or PNG file')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = 'anonymous' // Enable CORS for canvas export
        img.onload = () => {
          // Update state and open modal
          const result = e.target?.result
          if (typeof result === 'string') {
            setImages((prev) => ({ ...prev, full: result }))
            setCurrentImage(img)
            resetCropperState()
            setIsModalOpen(true)

            // Create initial avatar immediately
            setTimeout(() => {
              createInitialAvatar(img, result)
            }, 200)
          }
        }
        img.onerror = (error) => {
          console.warn('Image load error:', error)
          alert('Error loading image. Please try a different file.')
        }
        const result = e.target?.result
        if (typeof result === 'string') {
          img.src = result
        }
      }
      reader.readAsDataURL(file)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxFileSize, acceptedFormats, resetCropperState]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      handleFileSelect(file)
    },
    [handleFileSelect]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  const handleEditClick = useCallback(() => {
    if (images.full && currentImage) {
      resetCropperState()
      setIsModalOpen(true)
    }
  }, [images.full, currentImage, resetCropperState])

  // Cropper functions
  const updatePreview = useCallback(() => {
    if (!currentImage || !previewCanvasRef.current) return

    const canvas = previewCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, outputSize, outputSize)

    const cropData = calculateCropArea()
    if (cropData.width > 0 && cropData.height > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
      ctx.clip()

      ctx.drawImage(
        currentImage,
        cropData.sx,
        cropData.sy,
        cropData.width,
        cropData.height,
        0,
        0,
        outputSize,
        outputSize
      )
      ctx.restore()
    }
  }, [currentImage, outputSize, cropperState.position.x, cropperState.position.y])

  const updateImageDisplay = useCallback(() => {
    if (!currentImage || !imageElementRef.current) {
      return
    }

    const imageAspect = currentImage.width / currentImage.height
    let displayWidth, displayHeight

    // Calculate base dimensions to ensure image is at least as large as container
    if (imageAspect >= 1) {
      // Landscape or square
      displayHeight = containerSize
      displayWidth = displayHeight * imageAspect
    } else {
      // Portrait
      displayWidth = containerSize
      displayHeight = displayWidth / imageAspect
    }

    // Apply scale
    displayWidth *= cropperState.scale
    displayHeight *= cropperState.scale

    const imageEl = imageElementRef.current
    imageEl.style.width = displayWidth + 'px'
    imageEl.style.height = displayHeight + 'px'
    imageEl.style.left = cropperState.position.x + 'px'
    imageEl.style.top = cropperState.position.y + 'px'

    // Update preview after a small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      updatePreview()
    })
  }, [currentImage, cropperState.scale, cropperState.position, containerSize, updatePreview])

  const calculateCropArea = useCallback(() => {
    if (!imageElementRef.current || !currentImage) {
      return { sx: 0, sy: 0, width: 0, height: 0 }
    }

    const displayWidth = parseFloat(imageElementRef.current.style.width)
    const displayHeight = parseFloat(imageElementRef.current.style.height)

    if (isNaN(displayWidth) || isNaN(displayHeight) || displayWidth === 0 || displayHeight === 0) {
      return { sx: 0, sy: 0, width: 0, height: 0 }
    }

    const scaleX = currentImage.width / displayWidth
    const scaleY = currentImage.height / displayHeight

    const cropX = cropOffset - cropperState.position.x
    const cropY = cropOffset - cropperState.position.y
    const sx = Math.max(0, cropX * scaleX)
    const sy = Math.max(0, cropY * scaleY)
    const cropSizeInImage = cropSize * scaleX

    const maxWidth = currentImage.width - sx
    const maxHeight = currentImage.height - sy
    const width = Math.min(cropSizeInImage, maxWidth)
    const height = Math.min(cropSizeInImage, maxHeight)

    return { sx, sy, width, height }
  }, [currentImage, cropperState.position, cropOffset, cropSize])

  const handleZoomChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCropperState((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
  }, [])

  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY
    if (clientX !== undefined && clientY !== undefined) {
      setCropperState((prev) => ({
        ...prev,
        isDragging: true,
        lastMousePos: { x: clientX, y: clientY },
      }))
    }
  }, [])

  const drag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!cropperState.isDragging) return
      e.preventDefault()
      const clientX = 'clientX' in e ? e.clientX : (e as TouchEvent).touches?.[0]?.clientX
      const clientY = 'clientY' in e ? e.clientY : (e as TouchEvent).touches?.[0]?.clientY

      if (clientX !== undefined && clientY !== undefined) {
        const deltaX = clientX - cropperState.lastMousePos.x
        const deltaY = clientY - cropperState.lastMousePos.y

        setCropperState((prev) => ({
          ...prev,
          position: { x: prev.position.x + deltaX, y: prev.position.y + deltaY },
          lastMousePos: { x: clientX, y: clientY },
        }))
      }
    },
    [cropperState.isDragging, cropperState.lastMousePos]
  )

  const endDrag = useCallback(() => {
    setCropperState((prev) => ({ ...prev, isDragging: false }))
  }, [])

  const createInitialAvatar = useCallback(
    (img: HTMLImageElement, imageSrc: string) => {
      if (!outputCanvasRef.current) return

      const canvas = outputCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = outputSize
      canvas.height = outputSize
      ctx.clearRect(0, 0, outputSize, outputSize)

      const imageAspect = img.width / img.height
      let cropSize, sourceX, sourceY

      if (imageAspect >= 1) {
        cropSize = img.height
        sourceX = (img.width - cropSize) / 2
        sourceY = 0
      } else {
        cropSize = img.width
        sourceX = 0
        sourceY = (img.height - cropSize) / 2
      }

      ctx.save()
      ctx.beginPath()
      ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
      ctx.clip()

      ctx.drawImage(img, sourceX, sourceY, cropSize, cropSize, 0, 0, outputSize, outputSize)
      ctx.restore()

      const initialCroppedDataURL = canvas.toDataURL('image/png')

      // Update local state
      setImages((prev) => ({
        ...prev,
        cropped: initialCroppedDataURL,
      }))

      // Notify parent component
      if (onImageChange) {
        onImageChange({
          fullImage: imageSrc,
          croppedImage: initialCroppedDataURL,
          orientation: orientation,
        })
      }
    },
    [outputSize, onImageChange, orientation]
  )

  const handleApplyCrop = useCallback(() => {
    if (!currentImage || !outputCanvasRef.current) {
      return
    }

    const canvas = outputCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = outputSize
    canvas.height = outputSize
    ctx.clearRect(0, 0, outputSize, outputSize)

    const cropData = calculateCropArea()

    if (cropData.width > 0 && cropData.height > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
      ctx.clip()

      try {
        ctx.drawImage(
          currentImage,
          cropData.sx,
          cropData.sy,
          cropData.width,
          cropData.height,
          0,
          0,
          outputSize,
          outputSize
        )
        ctx.restore()

        // Try to export canvas - this will fail with CORS issues
        let croppedDataURL
        try {
          croppedDataURL = canvas.toDataURL('image/png')
        } catch (corsError) {
          const errorMsg = corsError instanceof Error ? corsError.message : 'Unknown error'
          console.warn('CORS error when exporting canvas:', errorMsg)
          alert(
            'Note: Due to cross-origin restrictions, using the original image as avatar. Upload your own image files for full cropping functionality.'
          )
          croppedDataURL = images.full
        }

        // Update local state
        setImages((prev) => ({
          ...prev,
          cropped: croppedDataURL,
        }))

        // Close modal
        setIsModalOpen(false)

        // Notify parent component with BOTH images
        if (onImageChange && images.full) {
          onImageChange({
            fullImage: images.full,
            croppedImage: croppedDataURL || images.full,
            orientation: orientation,
          })
        }
      } catch (error) {
        console.error('Error applying crop:', error)
        setIsModalOpen(false)
        alert('There was an issue processing the crop. Using the original image.')

        if (onImageChange && images.full) {
          onImageChange({
            fullImage: images.full,
            croppedImage: images.full,
            orientation: orientation,
          })
        }
      }
    } else {
      alert('Invalid crop area. Please adjust the image position and try again.')
    }
  }, [currentImage, calculateCropArea, outputSize, images.full, onImageChange, orientation])

  const handleCancelCrop = useCallback(() => {
    setIsModalOpen(false)
    resetCropperState()
  }, [resetCropperState])

  // Update image display when modal opens or state changes
  React.useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        updateImageDisplay()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isModalOpen, updateImageDisplay])

  React.useEffect(() => {
    if (isModalOpen) {
      updateImageDisplay()
    }
  }, [cropperState.scale, cropperState.position, isModalOpen, updateImageDisplay])

  // Add event listeners for drag
  React.useEffect(() => {
    if (cropperState.isDragging) {
      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', endDrag)
      document.addEventListener('touchmove', drag)
      document.addEventListener('touchend', endDrag)
    }
    return () => {
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', endDrag)
      document.removeEventListener('touchmove', drag)
      document.removeEventListener('touchend', endDrag)
    }
  }, [cropperState.isDragging, drag, endDrag])

  return (
    <div className="cr-image-cropper">
      <h2 className="cr-image-cropper__title">Update Profile Picture</h2>

      <div className="cr-image-cropper__images">
        {/* Full Image Display - Only for DJs */}
        {showFullImage && (
          <div className="cr-image-cropper__full-image">
            <h3 className="cr-image-cropper__subtitle">
              Profile Picture - Full (used on DJ Profile page)
            </h3>
            {images.full ? (
              <div className="cr-image-cropper__image-container">
                <img
                  src={images.full}
                  alt="Full profile"
                  className="cr-image-cropper__image cr-image-cropper__image--full"
                  style={{
                    width:
                      orientation === 'landscape'
                        ? '400px'
                        : orientation === 'portrait'
                          ? '225px'
                          : '400px',
                    height:
                      orientation === 'landscape'
                        ? '225px'
                        : orientation === 'portrait'
                          ? '400px'
                          : '400px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : (
              <div
                className="cr-image-cropper__placeholder-initial"
                style={{
                  width:
                    orientation === 'landscape'
                      ? '400px'
                      : orientation === 'portrait'
                        ? '225px'
                        : '400px',
                  height:
                    orientation === 'landscape'
                      ? '225px'
                      : orientation === 'portrait'
                        ? '400px'
                        : '400px',
                }}
              >
                No image uploaded yet
              </div>
            )}

            {/* Image Orientation Radio Buttons */}
            <div className="cr-image-cropper__orientation">
              <h4 className="cr-image-cropper__orientation-label">Image Orientation</h4>
              <div className="cr-image-cropper__orientation-options">
                <label className="cr-image-cropper__orientation-option">
                  <input
                    type="radio"
                    name="orientation"
                    value="square"
                    checked={orientation === 'square'}
                    onChange={() => {
                      setOrientation('square')
                      if (onOrientationChange) {
                        onOrientationChange('square')
                      }
                    }}
                  />
                  <span>Square</span>
                </label>
                <label className="cr-image-cropper__orientation-option">
                  <input
                    type="radio"
                    name="orientation"
                    value="landscape"
                    checked={orientation === 'landscape'}
                    onChange={() => {
                      setOrientation('landscape')
                      if (onOrientationChange) {
                        onOrientationChange('landscape')
                      }
                    }}
                  />
                  <span>Landscape</span>
                </label>
                <label className="cr-image-cropper__orientation-option">
                  <input
                    type="radio"
                    name="orientation"
                    value="portrait"
                    checked={orientation === 'portrait'}
                    onChange={() => {
                      setOrientation('portrait')
                      if (onOrientationChange) {
                        onOrientationChange('portrait')
                      }
                    }}
                  />
                  <span>Portrait</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Avatar Image Display */}
        <div className="cr-image-cropper__avatar">
          <h3 className="cr-image-cropper__subtitle">Profile Picture - Avatar</h3>
          <div
            className="cr-image-cropper__avatar-container"
            style={{ width: avatarSize, height: avatarSize }}
          >
            {images.cropped ? (
              <img
                src={images.cropped}
                alt="Profile avatar"
                className="cr-image-cropper__image cr-image-cropper__image--avatar"
              />
            ) : (
              <div className="cr-image-cropper__avatar-placeholder">
                <span>Avatar Preview</span>
              </div>
            )}
          </div>

          {/* Edit Avatar Button */}
          {images.cropped && (
            <div className="cr-image-cropper__edit-section">
              <CrButton
                variant="outline"
                color="default"
                size="small"
                leftIcon={<PiPencilSimple />}
                onClick={handleEditClick}
              >
                Edit Avatar
              </CrButton>
            </div>
          )}
        </div>
      </div>

      {/* Upload New Image Section */}
      <div className="cr-image-cropper__upload-section">
        <div
          className={`cr-image-cropper__placeholder ${isDragOver ? 'cr-image-cropper__placeholder--drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="cr-image-cropper__placeholder-content">
            <PiUploadSimple className="cr-image-cropper__upload-icon" />
            <p className="cr-image-cropper__placeholder-text">
              {images.full ? 'Upload New Image' : 'Click or drag file to upload'}
            </p>
            <p className="cr-image-cropper__placeholder-subtext">
              JPG or PNG format
              <br />
              Maximum file size {Math.round(maxFileSize / (1024 * 1024))}MB
            </p>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      {/* Crop Modal */}
      <CrModal
        isOpen={isModalOpen}
        onClose={handleCancelCrop}
        title="Crop Profile Picture"
        showDjInfo={false}
      >
        <div className="cr-image-cropper__crop-modal">
          <div className="cr-image-cropper__crop-container">
            <div
              ref={cropContainerRef}
              className="cr-image-cropper__crop-area"
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              style={{
                width: containerSize,
                height: containerSize,
                cursor: cropperState.isDragging ? 'grabbing' : 'grab',
              }}
            >
              {images.full && (
                <img
                  ref={imageElementRef}
                  src={images.full}
                  alt="Crop preview"
                  className="cr-image-cropper__crop-image"
                  draggable={false}
                />
              )}
              <div className="cr-image-cropper__crop-overlay" />
            </div>

            <div className="cr-image-cropper__zoom-control">
              <label>Zoom:</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.01"
                value={cropperState.scale}
                onChange={handleZoomChange}
                className="cr-image-cropper__zoom-slider"
              />
              <span>{cropperState.scale.toFixed(1)}</span>
            </div>
          </div>

          <div className="cr-image-cropper__preview-section">
            <h4>Avatar Preview:</h4>
            <canvas
              ref={previewCanvasRef}
              width={outputSize}
              height={outputSize}
              className="cr-image-cropper__preview-canvas"
            />
          </div>

          <div className="cr-image-cropper__modal-actions">
            <CrButton type="button" variant="outline" color="default" onClick={handleCancelCrop}>
              Cancel
            </CrButton>
            <CrButton type="button" variant="solid" color="primary" onClick={handleApplyCrop}>
              Apply Crop
            </CrButton>
          </div>
        </div>
      </CrModal>

      {/* Hidden canvas for output */}
      <canvas ref={outputCanvasRef} style={{ display: 'none' }} />
    </div>
  )
}
