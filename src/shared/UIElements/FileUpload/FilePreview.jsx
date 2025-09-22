import renderIcons from "../../functions/renderIcons";

const DocumentPreviewer = ({ file, onClose }) => {
  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";

  return (
    <div className=" fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-0 rounded-lg max-w-3xl w-full h-[95vh] relative">
        <h2
          className="h-[5%] !text-lg font-semibold flex items-center px-4 m-0 justify-between"
        >
          {file.name}
          <button
            onClick={onClose}
            type='button'
            className="!text-black bg-transparent"
          >
            {renderIcons('IoIosClose', 20, 'inherit')}
          </button>
        </h2>

        {isImage && (
          <img
            src={file.url}
            alt={file.name}
            className="max-h-[70vh] mx-auto"
          />
        )}

        {isPDF && (
          <iframe
            src={file.url}
            title="PDF Preview"
            className="w-full !h-[95%] border rounded-lg"
          />
        )}

        {!isImage && !isPDF && (
          <p className="text-gray-700">Preview not supported for this file type.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewer;
