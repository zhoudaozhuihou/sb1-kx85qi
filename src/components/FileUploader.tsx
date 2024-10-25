import React, { useCallback } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';

interface FileUploaderProps {
  onFileLoad: (content: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoad }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          onFileLoad(content);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      };
      reader.readAsText(file);
    }
  }, [onFileLoad]);

  return (
    <Paper className="p-6 text-center">
      <input
        accept="application/json"
        className="hidden"
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUpload />}
          className="mb-4"
        >
          Upload Swagger/OpenAPI JSON
        </Button>
      </label>
      <Typography variant="body2" color="textSecondary">
        Drop your file here or click to upload
      </Typography>
    </Paper>
  );
};