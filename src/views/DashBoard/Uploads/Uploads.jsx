import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppTopBar from '../../../components/AppBar';
import DrawerBar from '../../../components/DrawerBar';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Checkbox, Link, ListItem, TextField, Typography } from '@mui/material';
import { uploadService } from '../../../service/uploadservice';
import { Grid, Container } from '@mui/material';

const defaultTheme = createTheme();

export default function Uploads() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress ] = useState(null);
  const [currentFile, setCurrentFile ] = useState(null);
  const [message, setMessage ] = useState("");
  const [fileInfos, setFileInfos ] = useState(null);
  const [isError, setIsError ] = useState(false);

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    uploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total))
    })
      .then((response) => {
        setMessage(response.data.message)
        isError(false)
        return uploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.info)
      })
      .catch(() => {
        setProgress(0)
        setMessage("Could not upload the file!")
        setCurrentFile(null);
        setIsError(true)
      });

    setSelectedFiles(null)
  }

  const selectFile =(e) => {
    setSelectedFiles(e.target.files)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppTopBar routeName="Uploads"/>
        <DrawerBar />
        <Box sx={{background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%"}}>
        <Container alignItems="center" >
          <Grid container  sx={{height: "100vh", alignItems: "center", justifyContent: "center",  }}>
            <Grid item xs={12} md={12}lg={5} sx={{background: "white",boxShadow: 3, borderRadius: 3, p:3, width: "100%" }}>
            <div className="" style={{marginTop: "100px"}}>
          {currentFile && (
            <Box className="mb25" display="flex" alignItems="center">
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
              </Box>
            </Box>)
          }

          {/* <label htmlFor="btn-upload" style={{marginBottom: "50px"}}> */}
          <Box className="mb25" display="flex" alignItems="center" style={{width: "100%", background: 'red'}}>            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none'}}
              type="file"
              onChange={selectFile} />
            <Button
              className="btn-choose"
              variant="outlined"
              component="span" >
              Choose Files
            </Button>
          </Box>
          <div className="file-name">
          {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
          </div>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!selectedFiles}
            onClick={upload}>
            Upload
          </Button>

          <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
            {message}
          </Typography>

          <Typography variant="h6" className="list-header">
            List of Files
            </Typography>
          <ul className="list-group">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <ListItem
                  divider
                  key={index}>
                  <a href={file.url}>{file.name}</a>
                </ListItem>
              ))}
          </ul>
        </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      </Box>
    </ThemeProvider>
  );
}