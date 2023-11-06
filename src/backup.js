import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './ImageGrid.css';

const ImageGrid = ({ onSelectionChange, images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]); // State to track selected images

  const toggleCheckbox = (id) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, selected: !image.selected } : image
    );
    setImages(updatedImages);
    onSelectionChange(updatedImages.filter((image) => image.selected).length);

    // Update the selected images state
    setSelectedImages(updatedImages.filter((image) => image.selected));
  };


  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const updatedImages = Array.from(images);
    const [movedImage] = updatedImages.splice(startIndex, 1);
    updatedImages.splice(endIndex, 0, movedImage);

    setImages(updatedImages);
  };

  return (
    <div className="container">
      <div className="medium-image">
        <div
          className="image-container"
        >
          <img src={images[0].src} alt={images[0].alt} />
          <input
            type="checkbox"
            className={`image-checkbox ${images[0].selected ? 'selected' : ''}`}
            onClick={() => toggleCheckbox(images[0].id)}
          />
        </div>
      </div>
      <div className="right-images">
        <div className="row">
          {images.slice(1, 4).map((image) => (
            <div
              className="image-container"
            >
              <img src={image.src} alt={image.alt} />
              <input
                type="checkbox"
                className={`image-checkbox ${image.selected ? 'selected' : ''}`}
                onClick={() => toggleCheckbox(image.id)}
              />
            </div>
          ))}
        </div>
        <div className="row">
          {images.slice(4, 7).map((image) => (
            <div
              className="image-container"
            >
              <img src={image.src} alt={image.alt} />
              <input
                type="checkbox"
                className={`image-checkbox ${image.selected ? 'selected' : ''}`}
                onClick={() => toggleCheckbox(image.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-row">
        {images.slice(7, 11).map((image) => (
          <div
            className="image-container"
          >
            <img src={image.src} alt={image.alt} />
            <input
              type="checkbox"
              className={`image-checkbox ${image.selected ? 'selected' : ''}`}
              onClick={() => toggleCheckbox(image.id)}
            />
          </div>
        ))}
      </div>
      <div className="selected-images">
        {/* Render selected checkboxes on smaller screens */}
        {selectedImages.map((image) => (
          <input
            type="checkbox"
            className={`selected-image-checkbox ${image.selected ? 'selected' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
