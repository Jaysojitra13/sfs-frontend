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
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Typography from '@mui/material/Typography';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function UploadList() {
    const [imageData, setImageData] = useState(null);
    const [sLoading, setIsLoading] = useState(false);
    const [fileBuffer, setBuffeFile ] = useState(null)
    const [filename, setFilename ] = useState("null")
    const [isModalOpen, setModalOpen] = useState(false);
    const [fileData, setFileData] = useState({})
    const [fileUrl, setFileUrl] = useState("")
    useEffect(() => {
    const apiUrl = config.BASE_URL + "/file/list";
    const token = localStorage.getItem("token");
    axios.get(apiUrl, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
          console.log("YYY", response)
          setImageData(response.data);
          setIsLoading(false);
       })
       .catch((error) => {
        console.error('Error fetching image data:', error);
       setIsLoading(false);
    });
    }, []); // The empty dependency array ensures this effect runs only once on component mount
    
    const handleCardClick = async (data) => {
      const fileWithUrl = await getFile(data);
      console.log("file with url", fileWithUrl);
      setFileUrl(fileWithUrl.data.url);
      setFileData(data)
      setModalOpen(true);
    };
  
    // Function to close the modal
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const getFile = async (file) => {
      const token = localStorage.getItem("token");
      return await axios.get(`${config.BASE_URL}/file/view/${file._id}`, {
        headers: {
          Authorization: token
        }
      })
    }

    const handleDownload = async (file) => {
      console.log("fffil", `${config.BASE_URL}/file/view/${file._id}`)
      try {
        const data = await getFile(file)
        if(fileData) {
          const anchor = document.createElement('a');
          anchor.href = data;
          anchor.target = '_blank';
          anchor.download = 'newfile.jpeg';
          anchor.click();
        }
        handleCloseModal()
      } catch (error) {
        console.log("error", error.message)

      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
      <Container sx={{ py: 8, marginTop: '100px' }} maxWidth="xl">
      <Grid container spacing={12}>
        {imageData?.length
          ? 
          imageData.map((card) => (
              <Grid item key={card._id}>
                <Card
                  onClick={() => handleCardClick(card)}
                >
                  {/* <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  /> */}
                  <InsertDriveFileIcon sx={{ width: "100%", margin: "auto", height: 100 }}/>
                  <CardContent sx={{ flexGrow: 1 }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {card?.fileName}
                  </Typography>

                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : <h1 xs={12}>You have no uploads</h1>}
      </Grid>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogContent>
          {fileData && (
            <img src={fileUrl} alt={"Download file"} style={{ width: '100%' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDownload(fileData)} color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
      </main>
    </ThemeProvider>
  );
}