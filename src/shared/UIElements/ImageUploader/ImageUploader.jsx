import React, { useState } from "react";
import renderIcons from "../../functions/renderIcons";
import { GetS3SignedUrl, DeleteS3File } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import axios from "axios";

const ImageUploader = ({ imageUrl, setImageUrl }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(imageUrl);

  // 9b3133d9-3050-46cc-9226-f41e3670483b-planet.png

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        // const uploadResponse = await GetS3SignedUrl(file.name, file.type)
        // if (uploadResponse.success === true) {
        //   console.log('filename and file type', file.type)

        //   // Step 2: Upload file to S3
        //   await axios.put(uploadResponse.uploadUrl, file, {
        //     headers: { "Content-Type": file.type },
        //   });
        //   setImageUrl(uploadResponse.key)
        //   alert(`"Upload successful!" ${uploadResponse.key}`);
        //   console.log(`File uploaded as ${uploadResponse.key}`);
        // }
        setPreview(URL.createObjectURL(file));
      }
    } catch (err) {
      console.log('error uploading image', err)
    }
  };

  const handleRemoveImage = async () => {
    try {

      setImage(null);
      setPreview(null);
      alert('Image Deleted SuccessFully')

      // const delResponse = await DeleteS3File(imageUrl)
      // if (delResponse.success === true) {
      // }
      // return alert(`Error deleting image: ${delResponse.error}`)
    } catch (err) {
      console.log('error deleting the image: ', err)
    }
  };

  return (
    <div className="">
      {!preview ? (
        <div className="flex flex-col items-center space-y-4">
          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="group flex flex-col items-center space-y-4">
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg border"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute translate-x-23 -translate-y-2 hidden group-hover:block p-0 !rounded-full !bg-red-600 text-white hover:!bg-red-700"
          >
            {renderIcons('IoIosClose', 20, 'inherit')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
