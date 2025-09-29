// CrImageCropper.jsx
import React, { useState, useRef, useCallback } from 'react';
import { PiUploadSimple, PiPencilSimple, PiX } from 'react-icons/pi';
import CrButton from './CrButton';
import CrModal from './CrModal';
import './CrImageCropper.css';

export default function CrImageCropper({
  onImageChange,
  maxFileSize = 2 * 1024 * 1024, // 2MB default
  acceptedFormats = 'image/jpeg,image/png',
  initialFullImage = null, // Pre-populate with existing full image
  initialCroppedImage = null // Pre-populate with existing cropped image
}) {
  // Fixed sizes - no customization needed
  const maxDisplayWidth = 400;
  const maxDisplayHeight = 400;
  const avatarSize = 200;

  // Core state management - cleaner separation
  const [images, setImages] = useState({
    full: initialFullImage,
    cropped: initialCroppedImage
  });
  
  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Image processing state
  const [currentImage, setCurrentImage] = useState(null);
  const [cropperState, setCropperState] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    lastMousePos: { x: 0, y: 0 }
  });
  
  const fileInputRef = useRef();
  const imageElementRef = useRef();
  const cropContainerRef = useRef();
  const previewCanvasRef = useRef();
  const outputCanvasRef = useRef();
  
  // Cropper settings
  const containerSize = 400;
  const cropSize = 300;
  const cropOffset = 50;
  const outputSize = avatarSize;

  // Initialize currentImage from initialFullImage if provided
  React.useEffect(() => {
    if (initialFullImage && !currentImage) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Enable CORS for canvas export
      img.onload = () => {
        setCurrentImage(img);
      };
      img.onerror = (error) => {
        console.warn('Failed to load initial image with CORS. Canvas export will be limited.', error);
        // Still set the image so display works, but canvas operations may fail
        setCurrentImage(img);
      };
      img.src = initialFullImage;
    }
  }, [initialFullImage, currentImage]);

  const resetCropperState = useCallback(() => {
    setCropperState({
      scale: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      lastMousePos: { x: 0, y: 0 }
    });
  }, []);

  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    
    // Validate file size
    if (file.size > maxFileSize) {
      alert(`File size must be less than ${Math.round(maxFileSize / (1024 * 1024))}MB`);
      return;
    }
    
    // Validate file type
    if (!acceptedFormats.split(',').some(format => file.type === format.trim())) {
      alert('Please upload a JPG or PNG file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Enable CORS for canvas export
      img.onload = () => {
        // Update state and open modal
        setImages(prev => ({ ...prev, full: e.target.result }));
        setCurrentImage(img);
        resetCropperState();
        setIsModalOpen(true);
        
        // Create initial avatar immediately
        setTimeout(() => {
          createInitialAvatar(img, e.target.result);
        }, 200);
      };
      img.onerror = (error) => {
        console.warn('Image load error:', error);
        alert('Error loading image. Please try a different file.');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [maxFileSize, acceptedFormats, resetCropperState]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleEditClick = useCallback(() => {
    if (images.full && currentImage) {
      resetCropperState();
      setIsModalOpen(true);
    }
  }, [images.full, currentImage, resetCropperState]);

  // Cropper functions
  const updatePreview = useCallback(() => {
    if (!currentImage || !previewCanvasRef.current) return;
    
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, outputSize, outputSize);
    
    const cropData = calculateCropArea();
    if (cropData.width > 0 && cropData.height > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(outputSize/2, outputSize/2, outputSize/2, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.drawImage(
        currentImage,
        cropData.sx, cropData.sy, cropData.width, cropData.height,
        0, 0, outputSize, outputSize
      );
      ctx.restore();
    }
  }, [currentImage, cropperState.position, cropperState.scale, outputSize]);

  const updateImageDisplay = useCallback(() => {
    console.log('=== updateImageDisplay called ===');
    
    if (!currentImage || !imageElementRef.current) {
      console.log('Missing currentImage or imageElementRef');
      return;
    }
    
    const imageAspect = currentImage.width / currentImage.height;
    const minDisplaySize = containerSize;
    
    console.log('Image aspect ratio:', imageAspect);
    console.log('Current scale:', cropperState.scale);
    
    let displayWidth, displayHeight;
    
    if (imageAspect >= 1) {
      displayHeight = Math.max(minDisplaySize, containerSize * cropperState.scale);
      displayWidth = displayHeight * imageAspect;
    } else {
      displayWidth = Math.max(minDisplaySize, containerSize * cropperState.scale);
      displayHeight = displayWidth / imageAspect;
    }
    
    displayWidth *= cropperState.scale;
    displayHeight *= cropperState.scale;
    
    console.log('Calculated display size:', displayWidth, displayHeight);
    console.log('Setting position:', cropperState.position);
    
    const imageEl = imageElementRef.current;
    imageEl.style.width = displayWidth + 'px';
    imageEl.style.height = displayHeight + 'px';
    imageEl.style.left = cropperState.position.x + 'px';
    imageEl.style.top = cropperState.position.y + 'px';
    
    console.log('Image element styles set:', {
      width: imageEl.style.width,
      height: imageEl.style.height,
      left: imageEl.style.left,
      top: imageEl.style.top
    });
    
    // Force a small delay before preview update to ensure DOM is ready
    setTimeout(() => {
      updatePreview();
    }, 10);
  }, [currentImage, cropperState.scale, cropperState.position, containerSize, updatePreview]);

  const calculateCropArea = useCallback(() => {
    console.log('=== calculateCropArea called ===');
    
    if (!imageElementRef.current || !currentImage) {
      console.log('Missing imageElementRef or currentImage');
      return { sx: 0, sy: 0, width: 0, height: 0 };
    }
    
    const displayWidth = parseFloat(imageElementRef.current.style.width);
    const displayHeight = parseFloat(imageElementRef.current.style.height);
    
    console.log('Display dimensions:', displayWidth, displayHeight);
    console.log('Current image dimensions:', currentImage.width, currentImage.height);
    console.log('Cropper position:', cropperState.position);
    console.log('Crop offset/size:', cropOffset, cropSize);
    
    if (isNaN(displayWidth) || isNaN(displayHeight)) {
      console.log('Invalid display dimensions, forcing update...');
      // Try to trigger an image display update and return default for now
      setTimeout(() => updateImageDisplay(), 50);
      return { sx: 0, sy: 0, width: 100, height: 100 };
    }
    
    const scaleX = currentImage.width / displayWidth;
    const scaleY = currentImage.height / displayHeight;
    
    console.log('Scale factors:', scaleX, scaleY);
    
    const cropX = cropOffset - cropperState.position.x;
    const cropY = cropOffset - cropperState.position.y;
    const sx = Math.max(0, cropX * scaleX);
    const sy = Math.max(0, cropY * scaleY);
    const cropSizeInImage = cropSize * scaleX;
    
    console.log('Crop calculations:', { cropX, cropY, sx, sy, cropSizeInImage });
    
    const maxWidth = currentImage.width - sx;
    const maxHeight = currentImage.height - sy;
    const width = Math.min(cropSizeInImage, maxWidth);
    const height = Math.min(cropSizeInImage, maxHeight);
    
    const result = { sx, sy, width, height };
    console.log('Final crop area:', result);
    
    return result;
  }, [currentImage, cropperState.position, cropOffset, cropSize, updateImageDisplay]);

  const handleZoomChange = useCallback((e) => {
    setCropperState(prev => ({ ...prev, scale: parseFloat(e.target.value) }));
  }, []);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    setCropperState(prev => ({
      ...prev,
      isDragging: true,
      lastMousePos: { x: clientX, y: clientY }
    }));
  }, []);

  const drag = useCallback((e) => {
    if (!cropperState.isDragging) return;
    e.preventDefault();
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const deltaX = clientX - cropperState.lastMousePos.x;
    const deltaY = clientY - cropperState.lastMousePos.y;
    
    setCropperState(prev => ({
      ...prev,
      position: { x: prev.position.x + deltaX, y: prev.position.y + deltaY },
      lastMousePos: { x: clientX, y: clientY }
    }));
  }, [cropperState.isDragging, cropperState.lastMousePos]);

  const endDrag = useCallback(() => {
    setCropperState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const createInitialAvatar = useCallback((img, imageSrc) => {
    if (!outputCanvasRef.current) return;
    
    const canvas = outputCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = outputSize;
    canvas.height = outputSize;
    ctx.clearRect(0, 0, outputSize, outputSize);
    
    const imageAspect = img.width / img.height;
    let cropSize, sourceX, sourceY;
    
    if (imageAspect >= 1) {
      cropSize = img.height;
      sourceX = (img.width - cropSize) / 2;
      sourceY = 0;
    } else {
      cropSize = img.width;
      sourceX = 0;
      sourceY = (img.height - cropSize) / 2;
    }
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(outputSize/2, outputSize/2, outputSize/2, 0, Math.PI * 2);
    ctx.clip();
    
    ctx.drawImage(
      img,
      sourceX, sourceY, cropSize, cropSize,
      0, 0, outputSize, outputSize
    );
    ctx.restore();
    
    const initialCroppedDataURL = canvas.toDataURL('image/png');
    
    // Update local state
    setImages(prev => ({ 
      ...prev, 
      cropped: initialCroppedDataURL 
    }));
    
    // Notify parent component
    if (onImageChange) {
      onImageChange({ 
        fullImage: imageSrc, 
        croppedImage: initialCroppedDataURL 
      });
    }
  }, [outputSize, onImageChange]);

  const handleApplyCrop = useCallback(() => {
    console.log('=== Apply Crop Started ===');
    console.log('currentImage:', currentImage);
    console.log('outputCanvasRef.current:', outputCanvasRef.current);
    console.log('cropperState:', cropperState);
    
    if (!currentImage || !outputCanvasRef.current) {
      console.log('Apply crop failed: missing image or canvas');
      return;
    }
    
    const canvas = outputCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = outputSize;
    canvas.height = outputSize;
    ctx.clearRect(0, 0, outputSize, outputSize);
    
    const cropData = calculateCropArea();
    console.log('Crop data calculated:', cropData);
    console.log('Current images state:', images);
    
    if (cropData.width > 0 && cropData.height > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(outputSize/2, outputSize/2, outputSize/2, 0, Math.PI * 2);
      ctx.clip();
      
      try {
        console.log('Drawing image with params:');
        console.log('  Source:', cropData.sx, cropData.sy, cropData.width, cropData.height);
        console.log('  Destination:', 0, 0, outputSize, outputSize);
        
        ctx.drawImage(
          currentImage,
          cropData.sx, cropData.sy, cropData.width, cropData.height,
          0, 0, outputSize, outputSize
        );
        ctx.restore();
        
        // Try to export canvas - this will fail with CORS issues
        let croppedDataURL;
        try {
          croppedDataURL = canvas.toDataURL('image/png');
          console.log('Generated cropped image URL (first 50 chars):', croppedDataURL.substring(0, 50));
        } catch (corsError) {
          console.warn('CORS error when exporting canvas:', corsError.message);
          
          // Fallback: Use the original image if we can't export the cropped version
          // This happens with cross-origin images like Unsplash
          alert('Note: Due to cross-origin restrictions, using the original image as avatar. Upload your own image files for full cropping functionality.');
          croppedDataURL = images.full;
        }
        
        // Update local state first
        setImages(prev => {
          const newImages = { 
            ...prev, 
            cropped: croppedDataURL 
          };
          console.log('Updating local images state:', newImages);
          return newImages;
        });
        
        // Close modal
        setIsModalOpen(false);
        
        // Notify parent component with BOTH images
        const imageData = {
          fullImage: images.full, 
          croppedImage: croppedDataURL
        };
        console.log('Calling onImageChange with:', imageData);
        
        if (onImageChange) {
          onImageChange(imageData);
        }
        
        console.log('=== Apply Crop Completed Successfully ===');
      } catch (error) {
        console.error('Error applying crop:', error);
        console.error('Error stack:', error.stack);
        
        // Even if there's an error, close the modal and use original image
        setIsModalOpen(false);
        alert('There was an issue processing the crop. Using the original image.');
        
        if (onImageChange) {
          onImageChange({
            fullImage: images.full, 
            croppedImage: images.full
          });
        }
      }
    } else {
      console.log('Invalid crop area dimensions:', cropData);
      console.log('imageElementRef current style:', imageElementRef.current?.style);
      alert('Invalid crop area. Please adjust the image position and try again.');
    }
  }, [currentImage, calculateCropArea, outputSize, images.full, onImageChange, cropperState]);

  const handleCancelCrop = useCallback(() => {
    setIsModalOpen(false);
    resetCropperState();
  }, [resetCropperState]);

  // Update image display when modal opens or state changes
  React.useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        updateImageDisplay();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, updateImageDisplay]);

  React.useEffect(() => {
    if (isModalOpen) {
      updateImageDisplay();
    }
  }, [cropperState.scale, cropperState.position, isModalOpen, updateImageDisplay]);

  // Add event listeners for drag
  React.useEffect(() => {
    if (cropperState.isDragging) {
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', drag);
      document.addEventListener('touchend', endDrag);
    }
    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);
    };
  }, [cropperState.isDragging, drag, endDrag]);

  return (
    <div className="cr-image-cropper">
      <h2 className="cr-image-cropper__title">Update Profile Picture</h2>
      
      <div className="cr-image-cropper__images">
        {/* Full Image Display */}
        <div className="cr-image-cropper__full-image">
          <h3 className="cr-image-cropper__subtitle">Profile Picture - Full (used on DJ Profile page)</h3>
          {images.full ? (
            <div className="cr-image-cropper__image-container">
              <img 
                src={images.full} 
                alt="Full profile" 
                className="cr-image-cropper__image cr-image-cropper__image--full"
                style={{ 
                  maxWidth: maxDisplayWidth,
                  maxHeight: maxDisplayHeight,
                  width: 'auto',
                  height: 'auto'
                }}
              />
            </div>
          ) : (
            <div className="cr-image-cropper__placeholder-initial">
              No image uploaded yet
            </div>
          )}
        </div>

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
                leftIcon={React.createElement(PiPencilSimple)}
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
              JPG or PNG format<br />
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
                cursor: cropperState.isDragging ? 'grabbing' : 'grab'
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
            <CrButton
              variant="outline"
              color="default"
              onClick={handleCancelCrop}
            >
              Cancel
            </CrButton>
            <CrButton
              variant="solid"
              color="primary"
              onClick={handleApplyCrop}
            >
              Apply Crop
            </CrButton>
          </div>
        </div>
      </CrModal>

      {/* Hidden canvas for output */}
      <canvas 
        ref={outputCanvasRef} 
        style={{ display: 'none' }} 
      />
    </div>
  );
}