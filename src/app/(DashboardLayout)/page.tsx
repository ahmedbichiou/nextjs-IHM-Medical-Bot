'use client';
import { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography, Divider, Button, Slide, Skeleton, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';
import { Capsule } from './types';
import { Patient } from './types';
import { URLPORT } from './URLPORT';

const Dashboard = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingCapsules, setLoadingCapsules] = useState<boolean>(true); // Loading state for capsules
  const [loadingPatients, setLoadingPatients] = useState<boolean>(true);  // Loading state for patients
  const router = useRouter();

  const handleAddPatient = () => {
    router.push('/addpatient');
  };

  // Fetch capsules and patients from the API
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await fetch(URLPORT + 'api/capsules');
        if (!response.ok) {
          throw new Error('Failed to fetch capsules');
        }
        const data: Capsule[] = await response.json();
        setCapsules(data);
      } catch (error) {
        console.error('Error fetching capsules:', error);
      } finally {
        setLoadingCapsules(false); // Stop loading after data is fetched
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await fetch(URLPORT + 'api/patients');
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoadingPatients(false); // Stop loading after data is fetched
      }
    };

    fetchCapsules();
    fetchPatients();
  }, []);

  const handleCapsuleClick = (id: string) => {
    const capsule = capsules.find((capsule) => capsule.id === id);
    if (capsule && capsule.content) {
      router.push(`/capsules/${id}`);
    } else {
      router.push(`/addcapsule/${id}`);
    }
  };

  const handlePatientClick = (id: string) => {
    router.push(`/patients/${id}`);
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
                      {loadingCapsules ? (
                        // Show loading skeleton while fetching capsules
                        Array.from(new Array(4)).map((_, index) => (
                          <Grid item xs={6} key={index}>
                            <Skeleton variant="rectangular" height={200} animation="wave" />
                          </Grid>
                        ))
                      ) : (
                        capsules.map((capsule, index) => (
                          <Grid item xs={6} key={capsule.id}>
                          <Slide in={!loadingCapsules} direction="up" timeout={index * 200}>
                            <Card
                              onClick={() => handleCapsuleClick(capsule.id)}
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
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',  // Center the number for empty capsules
                                alignItems: 'center',
                                textAlign: 'center',
                                backgroundColor: capsule.content ? '#ff5252' : 'white', // red background for capsules with content
                              }}
                            >
                              <CardContent
                                sx={{
                                  padding: 0,
                                  flex: 1,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',  // Ensure the number is centered
                                  alignItems: 'center',
                                }}
                              >
                                {/* Capsule Number */}
                                <Typography
                                  variant="h1"
                                  color={capsule.content ? 'white' : 'black'} // Black text for empty capsules
                                  sx={{ fontSize: '5rem', lineHeight: 1, padding: '10px' }}
                                >
                                  {index + 1}
                                </Typography>
                        
                                {/* Capsule Details */}
                                {capsule.content ? (
                                  <>
                                    <Typography variant="h6" color="white" gutterBottom>
                                      {capsule.patient}
                                    </Typography>
                                    <Button
                                      sx={{
                                        backgroundColor: 'white',
                                        color: '#ff5252',
                                        borderRadius: '20px',
                                        padding: '5px 15px',
                                        textTransform: 'none',
                                        marginBottom: '5px',
                                      }}
                                    >
                                      {capsule.content}
                                    </Button>
                                    <Divider sx={{ backgroundColor: 'white' }} />
                                    <Typography variant="body2" color="white" sx={{ marginTop: '8px' }}>
                                      {capsule.date} - {capsule.time}
                                    </Typography>
                                  </>
                                ) : null} {/* Don't show anything else for empty capsules */}
                              </CardContent>
                            </Card>
                          </Slide>
                        </Grid>
                        
                        
                        ))
                      )}
                    </Grid>
                  </Grid>
                  {/* Capsules Section END */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Patients List Section */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '15px', boxShadow: 3, padding: '16px' }}>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h5">Patient List</Typography>
                  <Fade in={!loadingPatients} timeout={500}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddPatient}
                      sx={{
                        borderRadius: '50px',
                        textTransform: 'none',
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: 6,
                        },
                      }}
                    >
                      Add Patient
                    </Button>
                  </Fade>
                </Grid>
                <Grid container spacing={2} marginTop={2}>
                  {loadingPatients ? (
                    Array.from(new Array(4)).map((_, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Skeleton variant="rectangular" height={100} animation="wave" />
                      </Grid>
                    ))
                  ) : (
                    patients.map((patient, index) => (
                      <Grid item xs={12} sm={6} md={4} key={patient.id}>
                        <Slide in={!loadingPatients} direction="left" timeout={index * 200}>
                          <Card
                            onClick={() => handlePatientClick(patient.id)}
                            sx={{
                              borderRadius: '15px',
                              boxShadow: 3,
                              padding: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              transition: '0.3s',
                              '&:hover': {
                                boxShadow: 6,
                              },
                            }}
                          >
                            <PersonIcon sx={{ marginRight: 2, color: 'primary.main' }} />
                            <CardContent>
                              <Typography variant="body1" color="primary">
                                {patient.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Slide>
                      </Grid>
                    ))
                  )}
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
