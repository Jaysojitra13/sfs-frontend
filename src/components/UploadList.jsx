import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { config } from '../config';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function UploadList() {
    const [imageData, setImageData] = useState(null);
    const [sLoading, setIsLoading] = useState(null);

    useEffect(() => {
    const apiUrl = config.BASE_URL+'/file/list';
        axios.get(apiUrl, { headers: {
          Authorization: localStorage.getItem('token')
        }})
      .then((response) => {
          setImageData(response.data);
          console.log(imageData);
          setIsLoading(false);
       })
       .catch((error) => {
        console.error('Error fetching image data:', error);
       setIsLoading(false);
    });
    }, []); // The empty dependency array ensures this effect runs only once on component mount
    
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8, marginTop: '100px' }}maxWidth="xl">
          <Grid container spacing={6}>
            { cards.map((file) => (
              <Grid item xs={12} sm={12} md={2}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {file.fileName}
                  </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            )) }
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}