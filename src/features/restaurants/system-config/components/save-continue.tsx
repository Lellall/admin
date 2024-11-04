import React from 'react';

const SaveAndPreview = () => {
  const handleSave = () => {
    // Save logic here
  };

  const handlePreview = () => {
    // Preview logic here
  };

  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={handlePreview}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-4"
      >
        Preview
      </button>
      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SaveAndPreview;
