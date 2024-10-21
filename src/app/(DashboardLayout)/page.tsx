'use client';
import { useEffect, useState } from 'react'; // Import useState and useEffect
import { Grid, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';
import { Capsule } from './types' // Ensure you have a Capsule type defined if needed

const Dashboard = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]); // State to hold fetched capsules
  const patients = [
    { name: "John Doe", id: "john-doe" },
    { name: "Jane Smith", id: "jane-smith" },
    { name: "Alice Brown", id: "alice-brown" },
    { name: "Robert Johnson", id: "robert-johnson" },
  ];
  
  const router = useRouter();

  // Fetch capsules from the API when the component mounts
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/capsules'); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error('Failed to fetch capsules');
        }
        const data: Capsule[] = await response.json(); // Parse the JSON response
        setCapsules(data); // Set the fetched capsules to state
      } catch (error) {
        console.error('Error fetching capsules:', error); // Handle error
      }
    };

    fetchCapsules(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  const handleCapsuleClick = (id: string) => {
    router.push(`/capsules/${id}`); // Navigate to the dynamic capsule route
  };

  const handlePatientClick = (id: string) => {
    router.push(`/patients/${id}`); // Navigate to the dynamic patient route
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                flex: 1,
                borderRadius: '15px',
                boxShadow: 3,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Capsules List
                    </Typography>
                  </Grid>

                  {/* Capsules Section */}
                  <Grid item xs={12} marginTop={2}>
                    <Grid container spacing={2}>
                      {capsules.map((capsule) => (
                        <Grid item xs={6} key={capsule.id} style={{ display: 'flex' }}>
                          <Card
                            onClick={() => handleCapsuleClick(capsule.id)} // Handle click event
                            sx={{
                              flex: 1,
                              borderRadius: '15px',
                              boxShadow: 3,
                              cursor: 'pointer',
                              transition: '0.3s',
                              '&:hover': {
                                boxShadow: 6,
                              },
                              padding: '16px',
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6" color="primary" gutterBottom>
                                {capsule.content}
                              </Typography>
                              <Divider style={{ margin: '8px 0' }} />
                              <Typography variant="body2" color="textSecondary">
                                <strong>Time:</strong> {capsule.time}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Date:</strong> {capsule.date}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Patient:</strong> <br />{capsule.patient}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  {/* Capsules Section END */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Patients List Section */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: '15px',
                boxShadow: 3,
                padding: '16px',
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Patient List
                </Typography>
                {/* Patients List Section */}
                <Grid item xs={12}>
                  <Grid container spacing={2} marginTop={1}>
                    {patients.map((patient, index) => (
                      <Grid item xs={12} key={index}>
                        <Card
                          onClick={() => handlePatientClick(patient.id)} // Handle click event
                          sx={{
                            borderRadius: '15px',
                            boxShadow: 2,
                            cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                              boxShadow: 4,
                            },
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <PersonIcon sx={{ marginRight: 2 }} />
                          <CardContent>
                            <Typography variant="body1" color="primary">
                              {patient.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
