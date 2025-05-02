import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // we'll create this helper
import { useNavigate } from 'react-router-dom';
import { zustandStore } from '../../../zustand/zustand';

function UploadImage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    console.log('Base64 of cropped image:', croppedImage);
    // You can now send `croppedImage` to your backend
  };

  return (
    <div className='mt-10 px-4'>
      {/* PREVIEW SECTION */}
      <div className='md:h-[80vh] h-[80vh]'>
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl aspect-[3/2] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          {image ? (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={3 / 2}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              Preview area (3:2)
            </div>
          )}
        </div>
      </div>
  
      {/* ZOOM SLIDER */}
      {image && (
        <div className="flex justify-center mt-4">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-64"
          />
        </div>
      )}
  
      {/* CONTROLS SECTION */}
      <div className="flex flex-col items-center gap-4 mt-6">

  
        <div className="md:flex-row flex gap-4 flex-col">
        <label className="cursor-pointer inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
          <button
            onClick={handleCrop}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Upload
          </button>
          <button
            onClick={() => navigate('/me')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UploadImage;
