import { useState } from "react";
import DocumentPreviewer from "./FilePreview";
import renderIcons from "../../functions/renderIcons";
import { GetS3SignedUrl, DeleteS3File } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import axios from "axios";

const DocumentUploader = ({ files, setFiles }) => {
  const [uploadedFiles, setUploadedFiles] = useState(files || []);
  const [previewFile, setPreviewFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    setUploading(true);

    for (const file of selectedFiles) {
      // Check for duplicates
      const alreadyUploaded = uploadedFiles.find((f) => f.name === file.name);
      if (alreadyUploaded) continue;

      try {
        // const signedUrlResponse = await GetS3SignedUrl(file.name, file.type);
        // if (signedUrlResponse.success) {
        //   await axios.put(signedUrlResponse.uploadUrl, file, {
        //     headers: { "Content-Type": file.type },
        //   });

        const fileObject = {
          name: file.name,
          url: URL.createObjectURL(file), // for preview only
          // key: signedUrlResponse.key,
          type: file.type,
        };

        setUploadedFiles((prev) => [...prev, fileObject]);
        setFiles((prev) => [...prev, fileObject]);
        // }
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
      }
    }

    setUploading(false);
  };

  const handleRemoveFile = async (fileToDelete) => {
    const confirm = window.confirm(`Delete "${fileToDelete.name}" from S3?`);
    if (!confirm) return;

    try {
      // const res = await DeleteS3File(fileToDelete.key);
      // if (res.success) {
      const updatedFiles = uploadedFiles.filter((f) => f.name !== fileToDelete.name);
      setUploadedFiles(updatedFiles);
      setFiles(updatedFiles);
      // } else {
      //   alert("Failed to delete file.");
      // }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting file.");
    }
  }

  return (
    <div className="">
      <input
        type="file"
        id="new-files-uploader"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
      />

      <label
        htmlFor="new-files-uploader"
        className={`py-2 px-10 border-2 border-[#ccc] !border-dashed rounded-lg cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        {renderIcons("SlCloudUpload", 40, "inherit")}
        {uploading ? "Uploading..." : "Upload"}
      </label>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2 mt-4">
          <ul className="list-none p-0 m-0 space-y-1 max-h-[200px] overflow-auto">
            {uploadedFiles.map((file, idx) => (
              <li
                key={idx}
                className="text-blue-600 p-2 flex items-center gap-4 justify-between cursor-pointer underline bg-blue-50 hover:shadow-lg"
              >
                <span onClick={() => setPreviewFile(file)}>{file.name}</span>
                <span
                  title="Remove"
                  onClick={() => handleRemoveFile(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  {renderIcons("IoIosClose", 15, "inherit")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {previewFile && (
        <DocumentPreviewer file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  );
};

export default DocumentUploader;
