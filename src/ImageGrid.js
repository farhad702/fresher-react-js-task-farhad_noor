import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSwipeable } from 'react-swipeable';
import './ImageGrid.css';

const ImageGrid = ({ onSelectionChange, images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]); // State to track selected images
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleCheckbox = (id) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, selected: !image.selected } : image
    );
    setImages(updatedImages);
    onSelectionChange(updatedImages.filter((image) => image.selected).length);

    // Update the selected images state
    setSelectedImages(updatedImages.filter((image) => image.selected));
  };

  // Add a class to the medium image when a small image is dropped
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
  
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(startIndex, 1);
    updatedImages.splice(endIndex, 0, movedImage);
  
    setImages(updatedImages);
  
    // Add a class to the medium image to trigger the grow effect
    if (endIndex === 0) {
      const mediumImage = document.querySelector('.medium-image img');
      mediumImage.classList.add('dropping');
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeRight,
    onSwipedRight: handleSwipeLeft,
  });

  // Add a listener to remove the grow class when the transition ends
useEffect(() => {
  const mediumImage = document.querySelector('.medium-image img');

  const handleTransitionEnd = () => {
    mediumImage.classList.remove('dropping');
  };

  mediumImage.addEventListener('transitionend', handleTransitionEnd);

  return () => {
    mediumImage.removeEventListener('transitionend', handleTransitionEnd);
  };
}, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container" {...swipeHandlers}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              className="medium-image"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {images.slice(0, 1).map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided,snapshot) => (
                    <div
                      className="image-container"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={image.src} alt={image.alt} />
                      <input
                        type="checkbox"
                        className={`image-checkbox ${image.selected ? 'selected' : ''}`}
                        onClick={() => toggleCheckbox(image.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="right-images">
          <Droppable droppableId="right-images" direction="horizontal">
            {(provided) => (
              <div className="row" {...provided.droppableProps} ref={provided.innerRef}>
                {images.slice(1, 4).map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index + 1}>
                    {(provided) => (
                      <div
                        className="image-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={image.src} alt={image.alt} />
                        <input
                          type="checkbox"
                          className={`image-checkbox ${image.selected ? 'selected' : ''}`}
                          onClick={() => toggleCheckbox(image.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
              
            )}
          </Droppable>
          <Droppable droppableId="row1" direction="horizontal">
            {(provided) => (
              <div className="row1" ref={provided.innerRef} {...provided.droppableProps}>
                {images.slice(4, 7).map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index + 4}>
                    {(provided) => (
                      <div
                        className="image-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={image.src} alt={image.alt} />
                        <input
                          type="checkbox"
                          className={`image-checkbox ${image.selected ? 'selected' : ''}`}
                          onClick={() => toggleCheckbox(image.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <Droppable droppableId="bottom-row" direction="horizontal">
          {(provided) => (
            <div className="bottom-row" ref={provided.innerRef} {...provided.droppableProps}>
              {images.slice(7, 11).map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index + 7}>
                  {(provided) => (
                    <div
                      className="image-container"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={image.src} alt={image.alt} />
                      <input
                        type="checkbox"
                        className={`image-checkbox ${image.selected ? 'selected' : ''}`}
                        onClick={() => toggleCheckbox(image.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="selected-images">
          {/* Render selected checkboxes on smaller screens */}
          {selectedImages.map((image, index) => (
            <input
              type="checkbox"
              className={`selected-image-checkbox ${image.selected ? 'selected' : ''}`}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default ImageGrid;
