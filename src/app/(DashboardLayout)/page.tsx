'use client';
import { useEffect, useState } from 'react'; // Import useState and useEffect
import { Grid, Box, Card, CardContent, Typography, Divider, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';
import { Capsule } from './types'; // Ensure you have a Capsule type defined if needed
import { Patient } from './types'; // Import the Patient type
import { URLPORT } from './URLPORT';

const Dashboard = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]); // State to hold fetched capsules
  const [patients, setPatients] = useState<Patient[]>([]); // State to hold fetched patients
  const router = useRouter();
  const handleAddPatient = () => {
    router.push('/addpatient'); // Navigate to the Add Patient page
  };
  // Fetch capsules from the API when the component mounts
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await fetch(URLPORT+'api/capsules'); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error('Failed to fetch capsules');
        }
        const data: Capsule[] = await response.json(); // Parse the JSON response
        setCapsules(data); // Set the fetched capsules to state
      } catch (error) {
        console.error('Error fetching capsules:', error); // Handle error
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await fetch(URLPORT+'api/patients'); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data: Patient[] = await response.json(); // Parse the JSON response
        setPatients(data); // Set the fetched patients to state
      } catch (error) {
        console.error('Error fetching patients:', error); // Handle error
      }
    };

    fetchCapsules(); // Call the fetch function for capsules
    fetchPatients(); // Call the fetch function for patients
  }, []); // Empty dependency array ensures this runs once on mount

  const handleCapsuleClick = (id: string) => {
    const capsule = capsules.find(capsule => capsule.id === id); // Find the clicked capsule
    if (capsule && capsule.content) {
      router.push(`/capsules/${id}`); // Navigate to the dynamic capsule route if content is non-empty
    } else {
      router.push(`/addcapsule/${id}`); // Navigate to add capsule route if content is empty
    }
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
                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom>
                      Capsules List
                    </Typography>
                  </Grid>

                  {/* Capsules Section */}
                  <Grid item xs={12} marginTop={2}>
                    <Grid container spacing={2}>
                      {capsules.map((capsule) => (
                        <Grid item xs={6} key={capsule.id}>
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
                              height: '200px', // Ensures all cards are the same height
                            }}
                          >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                              <Typography variant="h6" color="primary" gutterBottom>
                                {capsule.id} {/* Display ID at the top */}
                              </Typography>
                              <Typography variant="body1" color="textSecondary" marginBottom={1}>
                                {capsule.content} {/* Display content right under the ID */}
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
                <Grid container spacing={3}>   
              <Grid item xs={8}>
                <Typography variant="h5" gutterBottom>
                  Patient List
                </Typography></Grid>
                <Grid item xs={4}>
                <Button
                  sx={{ mt: -1, borderRadius: '15px' }} // Added borderRadius for rounded corners
                  variant="contained"
                  onClick={handleAddPatient}
                  color="primary" // You can change the color as needed
                >
                  Add
                </Button></Grid>
                {/* Patients List Section */}
                <Grid item xs={12}>
                  <Grid container spacing={2} marginTop={1}>
                    {patients.map((patient) => (
                      <Grid item xs={12} key={patient.id}> {/* Use patient.id instead of index */}
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
