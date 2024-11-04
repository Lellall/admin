import React, { useState } from 'react';
import styled from 'styled-components';

const colors = ['#0E5D37', '#092D2B', '#FF9900', '#007BFF', '#FFC107', '#E91E63'];

const ColorBox = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    border: 2px solid #000;
  }
`;

const ThemeColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <input
          type="color"
          value={selectedColor}
          onChange={handleCustomColorChange}
          className="w-12 h-12 p-0 rounded-lg border border-gray-300 mr-4"
        />
        <span className="text-sm text-gray-600">Selected Color: {selectedColor}</span>
      </div>

      <div className="flex space-x-4">
        {colors.map((color) => (
          <ColorBox
            key={color}
            color={color}
            onClick={() => handleColorSelect(color)}
            style={{
              border: selectedColor === color ? '2px solid #000' : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeColorPicker;
