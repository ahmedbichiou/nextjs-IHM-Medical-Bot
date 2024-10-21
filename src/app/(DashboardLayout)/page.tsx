'use client';
import { Grid, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
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

  const router = useRouter();

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
              }}>
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
                      {capsules.map((capsule, index) => (
                        <Grid item xs={6} key={index} style={{ display: 'flex' }}>
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
                              <Divider style={{ margin: '8px 0' }} /> {/* Divider between name and content */}
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
                            display: 'flex', // Make it a flex container to align items
                            alignItems: 'center', // Center items vertically
                          }}
                        >
                          <PersonIcon sx={{ marginRight: 2 }} /> {/* Icon next to patient name */}
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
