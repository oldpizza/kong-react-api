import React, { useEffect, useState  } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
const secret = 'react-app-kongza'

export default function UserList() {
  const token = localStorage.getItem('token')
  useEffect(() => {
    fetch('http://localhost:3334/authen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if(data.status == 'ok'){

        }else{
          alert("authen fail")
          window.location ='/login'
        }
      })
      .catch((error) => {
      });
  }, [])

  const [users, setUsers] = useState([])

  const UsersGet = () => {
    fetch("http://localhost:3334/getuserlist")
      .then(res => res.json())
      .then(
        (users) => {
          setUsers(users)
        }
      )
  }
  useEffect(() => {
    UsersGet()
  }, [])

  const UpdateUser = id => {
    window.location = '/update/'+id
  }
  
  const popupimage = id => {
    alert('asd')
  }
  const UserDelete = id => {
   
            alert('u want delete forever?')
            fetch('http://localhost:3334/deleteuser/'+id, {
              method: 'POST',
              headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
              }
            })
            .then(res => res.json())
            .then(
              (result) => {
                alert(result['message'])
                if (result['status'] === 'ok') {
                  UsersGet();
                }
              }
            )
 
  }

  return (
    <Container sx={{ p:2 }} maxWidth="false">    
      <Paper sx={{ p:2 }}>
            <Link to="/Addpic">
              <Button variant="contained" color="primary">
                  ADD PICTURE
                </Button>
              </Link>
          <Box display="flex">
          
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              USERS
            </Typography>
          </Box>
          <Box>
            <Link to="/create">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">email</TableCell>
              <TableCell align="center">password</TableCell>
              <TableCell align="center">image</TableCell>
              <TableCell align="center">Minio image</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map((user) => (
            
              <TableRow key={user.ID}>
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="left">{user.firstname}</TableCell>
                <TableCell align="left">{user.lastname}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.password}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Avatar src={user.image}  onClick={popupimage} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Avatar src={user.image}  onClick={popupimage} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={() => UpdateUser(user.id)} >Edit</Button>
                    <Button onClick={() => UserDelete(user.id)}>Del</Button>
                  

                  </ButtonGroup>
                </TableCell>
              </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </Container>
    
  );
}
