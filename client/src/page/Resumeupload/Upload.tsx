import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Upload as UploadIcon, X } from "lucide-react";

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file)
    validateFile(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    validateFile(file);
  };

  const validateFile = (file?: File) => {
    if (!file) {
      setUploadError("No file selected");
      return;
    }

    if (file.type !== "application/pdf") {
      setUploadError("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);
    setUploadError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const userDetail= JSON.stringify(localStorage.getItem('userDetail'))
      const token = JSON.parse(userDetail)
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": token
          },
        }
      );

      if (response.data.success) {
        console.log("File uploaded successfully:", response.data.file);
        setUploadError("");
      } else {
        setUploadError(response.data.message);
      }
    } catch (err:any) {
      console.error("Upload error:", err.response?.data || err.message);
      setUploadError(err.response?.data?.message || "Failed to upload file");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl"
      >
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-blue-400 rounded-2xl p-8 text-center transition-all duration-300 hover:border-blue-600"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf"
            className="hidden"
            id="fileInput"
          />

          {!selectedFile && (
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <UploadIcon size={50} className="text-blue-400" />
              <h2 className="text-2xl font-semibold text-white">
                Upload Your Resume
              </h2>
              <p className="text-gray-300">
                Drag and drop or click to select a PDF file
              </p>
            </label>
          )}

          {selectedFile && (
            <div className="space-y-6">
              <div className="mt-6 flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <FileText className="text-blue-400" size={30} />
                  <div>
                    <p className="text-white font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={24} />
                </button>
              </div>

              {filePreview && (
                <div className="mt-4">
                  <h3 className="text-white text-lg mb-2">File Preview</h3>
                  <div className="bg-white/10 rounded-lg p-4 flex justify-center items-center">
                    <iframe
                      src={filePreview}
                      width="100%"
                      height="400px"
                      className="border rounded-lg"
                      title="PDF Preview"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {uploadError && (
            <div className="mt-4 text-red-400 text-center">{uploadError}</div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`mt-6 w-full py-3 rounded-full transition-all duration-300 ${
              selectedFile
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Upload Resume
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
