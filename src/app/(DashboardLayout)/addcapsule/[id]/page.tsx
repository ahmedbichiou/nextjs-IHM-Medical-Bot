'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { idText } from 'typescript';

const AddCapsule = () => {
  const router = useRouter();
  const pathname = usePathname();
  const capsuleId = pathname.split('/').pop(); // Get capsule ID from URL
  
  // State variables for capsule details
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    const id = capsuleId; // Use the capsuleId from the URL
    const newCapsule = {
      id,
      date,
      time,
      content,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/capsules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCapsule),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add capsule');
      }
  
      // Redirect to the root after successful submission
      router.push('/'); // Navigate to the root page
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a message)
    }
  };
  

  return (
    <Box>
      <Card sx={{ borderRadius: '15px', boxShadow: 3, width: '100%' }}>
        <CardContent>
          <Typography  margin={5} variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
  {capsuleId}
</Typography>

          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              variant="outlined"
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              variant="outlined"
              margin="normal"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              margin="normal"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Add Capsule
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCapsule;
