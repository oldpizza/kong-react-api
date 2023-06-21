import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
var AWS = require('aws-sdk');

const s3  = new AWS.S3({
  accessKeyId: 'kongza-test',
  secretAccessKey: 'xektagp9pYUNS3cmyI3FQ7PbKnMTG4Ar0vJA8DZA',
  endpoint: 'http://192.168.10.19:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});
export default function UserCreate() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {

      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
      image: file.name,
    }
    s3.putObject(
      { Bucket: 'kongza', Key: file.name , Body: file  },
      (err, data) => {
        if (err)
          console.log(err,data);
        else
          console.log('Successfully uploaded data to kongza/kongza');
          alert('update success')
      }
    );
    fetch('http://localhost:3334/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('success', data);
        alert("success")
        window.location ='/react-kong/users'
      })
      .catch((error) => {
        console.error('Error', error);
        console.log(JSON.stringify(jsonData))
      });
  };
  const [file, setFile] = React.useState(null)
  const [pic, setPic] = React.useState(null)
  const handleChange = (newFile) => {
    const addfile = newFile.target.files[0]
    setFile(addfile)
    console.log(addfile)
    setPic(URL.createObjectURL(newFile.target.files[0]));
  }

  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt: 2 }} spacing={2}>

            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                name="firstname"
                label="First name"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="lastname"
                label="Last name"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
              />
            <input type='file' multiple accept='*' name='image' onChange={handleChange}  />
            <img src={pic} style={{width: 200 ,height: 200}} />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}