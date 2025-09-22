import { useState } from 'react';
import Modal from 'react-modal'
import { IoIosClose } from "react-icons/io";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BulkUploadData } from '../../../utils/CheckAndExecuteFlows/CRUDoperations';
import { BsDatabaseFillExclamation } from "react-icons/bs";

const customStyles = {
    overlay: {
        background: 'rgba(0, 0 ,0 ,0.5)',
    },
    content: {
        width: '50vw',
        height: 'fit-content',
        maxHeight: '80vh',
        background: '#fff',
        selfAlign: 'center',
        top: '10%',
        left: '25%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    }
}

export default function BulkImportModal({ isOpen, setIsOpen, tableName }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [BulkImportErrors, setBulkImportErrors] = useState([]);

    // Allowed file types
    const allowedTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];
    const closeModal = () => {
        setIsOpen(false)
    }

    // Handle file selection
    const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        validateFiles(selectedFiles);

        // Reset file input so that re-uploading the same file works
        event.target.value = "";
    };

    // Handle drop
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        validateFiles(droppedFiles);
    };

    // Validate file type
    const validateFiles = (selectedFiles) => {
        console.log(selectedFiles);
        const validFiles = selectedFiles.filter((file) => allowedTypes.includes(file.type));

        if (validFiles.length !== selectedFiles.length) {
            setError("Only Excel (.xls, .xlsx) and CSV (.csv) files are allowed.");
        } else {
            setError("");
        }
        setFiles(validFiles);
    };
    // console.log('opening bulk import modal', files);
    // Remove file function
    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));

        // Also reset input field in case user selects the same file again
        document.getElementById("bulk_import_upload").value = "";
    };

    const handleImport = async () => {
        if (files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", files[0]); // Sending only the first file

        const resData = await BulkUploadData(files[0], tableName)
        console.log(resData);
        if (resData.errors) {
            const errors = resData.errors.map((error) => ({ error: error.error + ` where field ${Object.keys(error.row)[0]} is ${error.row[Object.keys(error.row)[0]]}` }));
            setBulkImportErrors(errors)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <button
                type='button'
                className='self-end border'
                onClick={closeModal}
            >
                <IoIosClose size={20} />
            </button>

            <label
                htmlFor='bulk_import_upload'
                className={`font-bold bg-[#c6fadd4f] w-full h-[10rem] !flex items-center
                     justify-center !border-dashed border-3 rounded-[15px] border-[#ccc]
                     bg-blend-overlay bg-[url('https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/xqe6wjshtgcpyytqhqyx')]
                     bg-no-repeat bg-center bg-contain !backdrop-opacity-50 hover:border-blue-500
                     transition-all ease-in-out
                     `}
                style={{
                    backgroundSize: '150px'
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <p>Drag & Drop <br /> (or) Upload</p>
            </label>

            <input
                type='file'
                id='bulk_import_upload'
                multiple
                hidden
                onChange={handleFileSelect}
            />

            <div className='flex gap-4 flex-wrap' >
                <button
                    type='button'
                    className={`bg-[#c6fadd4f] !border-dashed border-3   flex items-center justify-center
                                w-[6rem] h-[5rem] p-1 !border-[#ccc]
                            hover:!border-blue-500 transition-all ease-in-out !rounded-[1rem]
                            `}
                    onClick={'handleUpload'}
                >
                    {/* <p>Upload</p> */}
                    <img
                        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/cvnxnqilnawglcjtul1j'
                        alt='Upload'
                        className='w-fit h-fit object-cover object-center'
                    />
                </button>

                <button
                    type='button'
                    className={`bg-[#c6fadd4f] !border-dashed border-3   flex items-center justify-center
                                w-[6rem] h-[5rem] p-1 !border-[#ccc]
                            hover:!border-blue-500 transition-all ease-in-out !rounded-[1rem]
                            `}
                    onClick={'handleUpload'}
                >
                    <img
                        src='https://res.cloudinary.com/drtguvwir/image/upload/f_auto,q_auto/v1/WON-Platform-Images/khevadzlk2hwtm2yvoxg'
                        alt='Upload'
                        className='w-fit h-fit object-cover object-center'
                    />
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {files.map((file, index) => (
                    <li
                        key={index}
                        className='border w-fit p-2 flex items-center gap-3 '
                    >
                        <LuFileSpreadsheet />
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        <IoIosClose
                            size={20}
                            onClick={() => removeFile(index)}
                            className='border !border-transparent rounded-[50%] hover:!border-[#14747a] cursor-pointer ' />
                    </li>
                ))}
            </ul>

            {files.length > 0 &&
                <button
                    type='button'
                    onClick={handleImport}
                    className={`w-fit h-fit px-4 py-2 self-center border font-semibold
                        rounded cursor-pointer !bg-[#14747a] text-white
                        hover:!bg-white hover:!text-[#14747a] hover:!border-[#14747a] `}
                >Sart Import</button>
            }

            {BulkImportErrors.length > 0 &&
                <ul className='w-full h-fit flex flex-col gap-2 p-0'>
                    {BulkImportErrors.map((item, index) => (
                        <li
                            key={index}
                            className='flex items-center gap-2 border px-2 py-1 !border-red-500 text-red-500'
                        >
                            <span
                                className=' h-fit w-fit rounded-[50%] p-1 '
                            >{index + 1}.</span>
                            {item.error} <BsDatabaseFillExclamation size={18} className='ml-auto' />
                        </li>
                    ))}
                </ul>}
        </Modal>
    )
}