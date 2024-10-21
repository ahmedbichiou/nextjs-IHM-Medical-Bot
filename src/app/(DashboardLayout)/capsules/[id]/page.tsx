'use client';

import { usePathname } from 'next/navigation';
import { Box, Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

const CapsuleDetail = () => {
  const pathname = usePathname();
  const capsuleId = pathname.split('/').pop(); // Get capsule ID from URL
  const [capsuleData, setCapsuleData] = useState<any>(null);
  const [remainingTime, setRemainingTime] = useState<string>('00:00'); // Initial remaining time

  const capsules = [
    { content: "Capsule 1", time: "10:00 AM", date: "2024-10-21", patient: "John Doe", id: "capsule1" },
    { content: "Capsule 2", time: "11:00 AM", date: "2024-10-22", patient: "Jane Smith", id: "capsule2" },
    { content: "Capsule 3", time: "12:00 PM", date: "2024-10-23", patient: "Alice Brown", id: "capsule3" },
    { content: "Capsule 4", time: "01:00 PM", date: "2024-10-24", patient: "Robert Johnson", id: "capsule4" },
  ];
  
  const patients = [
    { name: "John Doe", id: "john-doe" },
    { name: "Jane Smith", id: "jane-smith" },
    { name: "Alice Brown", id: "alice-brown" },
    { name: "Robert Johnson", id: "robert-johnson" },
  ];

  useEffect(() => {
    // Fetch capsule data based on the capsuleId from the URL
    const capsule = capsules.find((capsule) => capsule.id === capsuleId);
    if (capsule) {
      setCapsuleData(capsule);
      calculateRemainingTime(capsule.time); // Calculate the remaining time based on the capsule's time
    }
  }, [capsuleId]);

  // Function to calculate the remaining time
  const calculateRemainingTime = (capsuleTime: string) => {
    const [capsuleHours, capsuleMinutes] = capsuleTime.split(":").map(Number);
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // Convert everything to minutes for easier calculation
    const totalCapsuleMinutes = capsuleHours * 60 + capsuleMinutes;
    const totalCurrentMinutes = currentHours * 60 + currentMinutes;

    let remainingMinutes = totalCapsuleMinutes - totalCurrentMinutes;

    if (remainingMinutes < 0) remainingMinutes += 24 * 60; // If it's past the capsule time, assume it's for the next day

    const hoursLeft = Math.floor(remainingMinutes / 60);
    const minutesLeft = remainingMinutes % 60;

    setRemainingTime(`${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}`);
  };

  if (!capsuleData) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {/* Capsule Content */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '15px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="error">
                {capsuleData.content}
              </Typography>
              <Divider />
              {/* Delivery Time Section */}
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                      Time remaining
                    </Typography>
                    <CircularProgress variant="determinate" value={80} size={80} />
                    <Typography variant="h6">{remainingTime}</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                      Time
                    </Typography>
                    <Typography variant="h6" color="error">
                      {capsuleData.time}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
              {/* Patient Section */}
              <Box marginTop={4}>
                <Typography variant="body1" color="textSecondary">
                  Patient
                </Typography>
                <Card sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ marginRight: 2, color: 'primary.main' }} />
                  <Typography variant="h6">{capsuleData.patient}</Typography>
                </Card>
              </Box>
              {/* Medications Section */}
              <Box marginTop={4}>
                <Typography variant="body1" color="textSecondary">
                  Medications
                </Typography>
                {capsuleData.content}
                  <Card sx={{ padding: 2, marginTop: 1 }}>
                    <Typography variant="h6" color="primary">
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Type Medicament: 
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Number: 
                    </Typography>
                  </Card>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CapsuleDetail;
