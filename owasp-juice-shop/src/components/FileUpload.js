import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Fileupload.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileExtension, setFileExtension] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const extension = selectedFile.name.split('.').pop().toLowerCase();
            setFileExtension(extension);
        } else {
            setFileExtension('');
        }

        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            setMessage('No username provided.');
            return;
        }

        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileExtension', fileExtension);

        try {
            const response = await axios.post(`http://localhost:5000/api/files/${username}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading file: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Upload File for {username}</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                {fileExtension && <p>File Extension: {fileExtension}</p>}
                <button type="submit" disabled={!file}>Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
