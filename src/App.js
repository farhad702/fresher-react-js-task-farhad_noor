import React, { useState } from 'react';
import ImageGrid from './ImageGrid';

import './App.css';
import img1 from './images/image-1.webp';
import img2 from './images/image-2.webp';
import img3 from './images/image-3.webp';
import img4 from './images/image-4.webp';
import img5 from './images/image-5.webp';
import img6 from './images/image-6.webp';
import img7 from './images/image-7.webp';
import img8 from './images/image-8.webp';
import img9 from './images/image-9.webp';
import img10 from './images/image-10.jpeg';
import img11 from './images/image-11.jpeg';

function App() {
  const [images, setImages] = useState([
    { id: 'img1', src: img1, alt: 'Image 1', selected: false },
    { id: 'img2', src: img2, alt: 'Image 2', selected: false },
    { id: 'img3', src: img3, alt: 'Image 3', selected: false },
    { id: 'img4', src: img4, alt: 'Image 4', selected: false },
    { id: 'img5', src: img5, alt: 'Image 5', selected: false },
    { id: 'img6', src: img6, alt: 'Image 6', selected: false },
    { id: 'img7', src: img7, alt: 'Image 7', selected: false },
    { id: 'img8', src: img8, alt: 'Image 8', selected: false },
    { id: 'img9', src: img9, alt: 'Image 9', selected: false },
    { id: 'img10', src: img10, alt: 'Image 10', selected: false },
    { id: 'img11', src: img11, alt: 'Image 11', selected: false },
  ]);
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [isCheckboxVisible, setCheckboxVisible] = useState(false);
  const [isH1Hidden, setH1Hidden] = useState(false);

  const handleSelectionChange = (count) => {
    setSelectedItemCount(count);
    setCheckboxVisible(count > 0);
    setH1Hidden(count > 0);
  };

  const handleDeleteFiles = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
    setSelectedItemCount(0);
    setCheckboxVisible(false);
    setH1Hidden(false);
  };

  
  return (
    <div className="App">
      <div className="header">
        {isCheckboxVisible && (
          <div className="header-left">
            <input
              type="checkbox"
              checked={selectedItemCount > 0}
              onChange={() => setSelectedItemCount(selectedItemCount === 0 ? 1 : 0)}
            />
          </div>
        )}
        <div className="header-right">
          <h1 className={isH1Hidden ? 'hide' : ''}>Gallery</h1>
          {selectedItemCount > 0 && (
            <div className="selected-items">
              <span className="selected-text">
                <strong>{selectedItemCount} File{selectedItemCount > 1 ? 's' : ''} Selected</strong>
              </span>
              <button className="delete-button" onClick={handleDeleteFiles}>
                Delete files
              </button>
            </div>
          )}
        </div>
      </div>
      <br />
      <ImageGrid
        onSelectionChange={handleSelectionChange}
        images={images}
        setImages={setImages} // Pass the setImages function to ImageGrid
      />
      </div>
  );
}

export default App;
