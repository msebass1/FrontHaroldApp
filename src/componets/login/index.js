import React from 'react';
import {Typography,Button,FormControl,FormHelperText,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import firebase from 'firebase/app';
import ("firebase/auth");
import ("firebase/firestore");


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));



export default function Login({setShowRegister}){
  const classes = useStyles();
  const [log,setLog] = React.useState({});

  const handleChange = (e) => {
    setLog(prev=> ({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }
  const signInUser = ({email,password})=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
	window.location.replace('');
      })
      .catch((err) => {
	console.error(err);
      });
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>Loguearse</Typography>
      <FormControl className={classes.formControl} >
     	<TextField required name='email' onChange={handleChange}/>
	<FormHelperText>email</FormHelperText>
     	<TextField required name='password' onChange={handleChange}/>
	<FormHelperText>password</FormHelperText>
      </FormControl>
      <br/>
      <Button onClick={()=> signInUser(log)}
      variant='contained'
      color='secondary'
      > iniciar Sesión </Button>
      <br/>
      <br/>
      <Button onClick={()=> setShowRegister(true)}
      variant='contained'
      color='primary'> registrarse </Button>
    </div>
  )
}
