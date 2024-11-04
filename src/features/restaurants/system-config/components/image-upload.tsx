import React, { useState } from 'react';
import styled from 'styled-components';
import rose from "@/assets/rose-petals.svg";
import main from "@/assets/scattered-forcefields.svg";

// Predefined template images
const templateImages = [rose, main];

const ImageBox = styled.div<{ isSelected: boolean }>`
  width: 50px;
  height: 50px;
  background-color: #f7f7f7;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
  border: ${(props) => (props.isSelected ? '3px solid #000' : '2px solid transparent')};

  &:hover {
    border: 3px solid #000;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TemplateImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(templateImages[0]);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-row items-start space-x-8">
      {/* Image Picker Grid */}
      <div className="grid grid-cols-3 gap-4">
        {templateImages.map((image) => (
          <ImageBox
            key={image}
            isSelected={selectedImage === image}
            onClick={() => handleImageSelect(image)}
          >
            <img src={image} alt="Template Preview" />
          </ImageBox>
        ))}
      </div>

      {/* Selected Image Display */}
      <div>
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Selected Template"
              className="mt-2 h-36 w-36 object-cover border border-gray-200 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateImagePicker;
