import React, { useEffect, useState  } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
var AWS = require('aws-sdk');

const s3  = new AWS.S3({
  accessKeyId: 'kongza1234',
  secretAccessKey: 'kongza1234',
  endpoint: 'http://192.168.10.19:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});

export default function Addpic() {

  const [file, setFile] = useState(null)
  const [pic, setPic] = useState(null)

  const handleChange = (newFile) => {
    const addfile = newFile.target.files[0]
    setFile(addfile)
    alert(addfile)
    console.log(addfile)
    setPic(URL.createObjectURL(newFile.target.files[0]));
  }

    function addminio(e){
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
    }
    let i = 0;
    const [dataStream, setdataStream] = useState(null)
    useEffect(() => {
      s3.listObjects(
        {Bucket: 'kongza'}, 
        (err, dataStream) =>{
        console.log(dataStream.Contents)
        setdataStream(dataStream.Contents)
      });
    }, [])
    for (i in dataStream) {
      console.log(dataStream[i].Key);
      s3.getObject(
        {Bucket: 'kongza', Key: dataStream[i].Key}, 
        (err, dataStream) =>{
        
      });
    }

    const ImageGallery = () => {
      const [imageUrls, setImageUrls] = useState([]);
    
      useEffect(() => {
        const fetchImages = async () => {
          try {
            const params = {
              Bucket: 'kongza', // Replace with your S3 bucket name
            };
            //1 list object from params -------------
            const data = await s3.listObjects(params).promise();
    
    
    
            //2 create url from object
            const urls = await Promise.all(
              data.Contents.map(async (object) => {
                console.log(object)  // example {Key: 'yung.png', LastModified: Wed Jun 14 2023 15:18:40 GMT+0700 (Indochina Time), ETag: '"819c860a6d2d690858871af6588fce51"', ChecksumAlgorithm: Array(0), Size: 309257, …}
                const getObjectParams = {
                  Bucket: 'kongza', // Replace with your S3 bucket name
                  Key: object.Key,
                };
    
                // 
                const objectData = await s3.getObject(getObjectParams).promise();
                const imageBlob = new Blob([objectData.Body]);
                console.log(imageBlob)
                return URL.createObjectURL(imageBlob);
              
              })
            );
            
    
            setImageUrls(urls);
            //console.log(urls)
          } catch (error) {
            console.error('Error retrieving images:', error);
          }
        };
    
        fetchImages();
      }, []);
    
      return (
        <div>
          {imageUrls.map((url, index) => (
            //console.log(index),
            <img key={index} src={url} alt={` ${index }`} 
    
            style={{ width: '200px', height: '200px' }}/>
          ))}
        </div>
      );
    };
    
    const App = () => {
      return (
        <div>
          <h1>Get images from minio by aws-sdk
    
          </h1>
          <ImageGallery />
        </div>
      );
    };
  return (
    <Container sx={{ p:2 }} maxWidth="xl">    
      <Grid item xs={12}>

      <h2>Add Image:</h2>
      <button onClick={addminio} >save</button>
            <input type='file'  multiple accept='*' onChange={handleChange}  />
            <img src= {pic} style={{width: 200 ,height: 200}} /><br></br>
       <div>
             {/* {dataStream.map((user) => (
            <img key={user} src= {'http://192.168.10.19:9000/kongza/'+user.Key}
             style={{width: 200 ,height: 200}} />
      ))} */}
      </div>   
      <div>
      <h1>Get images from minio by aws-sdk

      </h1>
      <ImageGallery />
    </div>  
    </Grid>
    </Container>
   
  );
}




