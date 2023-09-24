import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppTopBar from '../../../components/AppBar';
import DrawerBar from '../../../components/DrawerBar';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Alert, Button, ListItem, Typography } from '@mui/material';
import { uploadService } from '../../../service/uploadservice';
import { Grid, Container } from '@mui/material';

const defaultTheme = createTheme();

export default function Uploads() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [progress, setProgress ] = useState(null);
  const [currentFile, setCurrentFile ] = useState(null);
  const [message, setMessage ] = useState("");
  const [fileInfos, setFileInfos ] = useState(null);
  const [isError, setIsError ] = useState(false);
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully ] = useState(false);

  const upload = () => {
    setIsError("")
    if(!selectedFiles?.length) {
      setIsError("Please upload a file")
      return
    }
    let currentFile = selectedFiles[0];
    // setProgress(0);
    setCurrentFile(currentFile);

    uploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total))
    })
      .then((response) => {
        console.log("111 ==== ", response?.data?.status)
        if(response?.data?.status) {
          setFileUploadedSuccessfully(true)
        }
        // return uploadService.getFiles();
      })
      // .then((files) => {
      //   console.log("222", files)
      //   setFileInfos(files.info)
      // })
      .catch(() => {
        setProgress(0)
        setMessage("Could not upload the file!")
        setCurrentFile(null);
        setIsError(true)
      });

    setSelectedFiles(null)
    return
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
            <Typography variant="h4" pb={5} color="initial" align="center">
                Upload Image
              </Typography>
              <Typography pb={5} color="initial" align="center">
              {fileUploadedSuccessfully && <Alert severity="success">File uploaded successfully</Alert> }
              </Typography>
            <div className="" style={{marginTop: "100px"}}>
          {currentFile && (
            <Box className="mb25" display="flex" alignItems="center">
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
              </Box>
            </Box>)
          }

          {/* <label htmlFor="btn-upload" style={{marginBottom: "50px"}} /> */}
          <Box className="mb25" display="flex" alignItems="center" style={{width: "100%"}}>            
          </Box>
          <Button variant="contained" 
            component="label" 
            color="inherit"
            style={{ width: '250px', marginBottom: '30px'}}
            >
            {" "}
              Upload a file
            <input type="file" hidden             
              onChange={selectFile} />
          </Button>
          <div className="file-name">
          {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
          </div>
          <Button
            className="btn-upload"
            // color="primary"
            variant="contained"
            component="span"
            // disabled={!!selectedFiles}
            style={{ width: '100%', marginBottom: "25px"}}
            onClick={upload}
            >
            Upload
          </Button>
          <Button fullWidth sx={{color: "white", }} >Login</Button>
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