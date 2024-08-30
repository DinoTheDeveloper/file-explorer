import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [loadTime, setLoadTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const fetchFiles = async (path) => {
    try {
      setError(null);
      const startTime = performance.now();
      const response = await axios.get(`http://localhost:3001/api/directory`, {
        params: { path: path }
      });
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch directory contents. Please try again.');
    }
  };

  const handleDirectoryClick = (path) => {
    setCurrentPath(path);
  };

  return (
    <div className="file-explorer">
      <h1>File Explorer</h1>
      <p>Current Path: {currentPath || 'Home Directory'}</p>
      {loadTime && <p>Load Time: {loadTime.toFixed(2)} ms</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.isDirectory ? (
              <button onClick={() => handleDirectoryClick(file.fullPath)}>
                📁 {file.filename}
              </button>
            ) : (
              <span>📄 {file.filename}</span>
            )}
            <span> - Size: {file.size} bytes</span>
            <span> - Type: {file.isDirectory ? 'Directory' : file.extension}</span>
            <span> - Created: {new Date(file.createdDate).toLocaleString()}</span>
            <span> - Permissions: {file.permissions}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;