'use client';
import React, { useState } from 'react';
import {
  Button,
  FileUploader,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Modal,
} from '@carbon/react';

const initialUploads = [];

function RacerPage() {
  const [uploads, setUploads] = useState(initialUploads);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (fileInfo) => {
    const newUpload = {
      id: fileInfo.name,
      name: fileInfo.name,
      type: fileInfo.type,
    };
    setUploads([...uploads, newUpload]);
  };

  const removeUpload = (uploadId) => {
    setUploads(uploads.filter((upload) => upload.id !== uploadId));
  };

  const trainUpload = () => {
    console.log(`Training with ${selectedCar} car on ${selectedTrack}`);
    setIsModalOpen(false);
    // Reset selections
    setSelectedCar('');
    setSelectedTrack('');
  };

  // Define the colors directly
  const buttonStyles = {
    redCar: { backgroundColor: '#FF0000', color: 'white' },
    blueCar: { backgroundColor: '#0000FF', color: 'white' },
    greenCar: { backgroundColor: '#00FF00', color: 'white' },
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Racer Dashboard</h1>
      <h2 style={{ margin: '1rem 0' }}>Upload and train models here</h2>
      <FileUploader
        buttonKind="primary"
        buttonLabel="Upload model"
        filenameStatus="edit"
        accept={['.json', 'image/*']}
        multiple
        onChange={(event) => handleFileUpload(event.target.files[0])}
      />
      <TableContainer title="Uploads">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploads.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell>{upload.name}</TableCell>
                <TableCell>{upload.type}</TableCell>
                <TableCell>
                  <Button
                    kind="danger"
                    size="small"
                    onClick={() => removeUpload(upload.id)}
                  >
                    Remove
                  </Button>
                  <Button size="small" onClick={() => setIsModalOpen(true)}>
                    Train
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        modalHeading="Configure Training"
        open={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        primaryButtonText="Train"
        secondaryButtonText="Cancel"
        onPrimarySubmit={trainUpload}
        primaryButtonDisabled={!selectedCar || !selectedTrack} // Disable train button until selections are made
      >
        <div style={{ marginBottom: '1rem' }}>
          <h5>Select a Car</h5>
          <Button
            style={buttonStyles.redCar}
            onClick={() => setSelectedCar('Red')}
          >
            Red Car
          </Button>
          <Button
            style={buttonStyles.blueCar}
            onClick={() => setSelectedCar('Blue')}
          >
            Blue Car
          </Button>
          <Button
            style={buttonStyles.greenCar}
            onClick={() => setSelectedCar('Green')}
          >
            Green Car
          </Button>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <h5>Select a Track</h5>
          <Button
            className="track-button"
            onClick={() => setSelectedTrack('Track A')}
          >
            Track A
          </Button>
          <Button
            className="track-button"
            onClick={() => setSelectedTrack('Track B')}
          >
            Track B
          </Button>
          <Button
            className="track-button"
            onClick={() => setSelectedTrack('Track C')}
          >
            Track C
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default RacerPage;
