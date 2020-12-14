import React from 'react';
import {Typography,Button,FormControl,FormHelperText,TextField,Snackbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase/app';
import ("firebase/auth");
import ("firebase/firestore");


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }, 
  button: {
    margin: theme.spacing(3),
  },
}));



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Registrarse({setShowRegister}){
  const classes = useStyles();
  const [user,setUser] = React.useState({});
  var [err ,setErr] = React.useState('');

  const handleChange = (e) => {
    setUser(prev=> ({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }
  
  const handlerror = (e)=>{
    setErr(e);
  }
  const handleClose = ()=> {
    setErr('');
  }
  const signupUser = (userDetails) => {
    const {firstName, lastName, contrato, email, password} = userDetails;
    console.log(userDetails);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
                firstName: firstName,
                lastName: lastName,
                contrato: contrato,
		admin: 'false',
                email: email
            }) 
	    .then(e=>{
	      console.log(e)
	      window.location.replace('');
	    })
            .catch(error => {
	        setErr(error.message);
                console.log('Error creando el usuario Firestore', error);
            })
        })
        .catch(error => {
	    setErr(error.message);
	  console.log(err);
            console.log('Error creando el usuario Auth', error);
        })
  };
  
  return (
    <div>
      <Typography variant="h5"  gutterBottom>Registrarse</Typography>
      <FormControl className={[classes.formControl,classes.button].join(" ")}>
	<TextField required name='firstName' type='text' onChange={handleChange} />
	<FormHelperText>Nombre</FormHelperText>
      	<TextField required name='lastName' type='text' onChange={handleChange}/>
	<FormHelperText>Apellido</FormHelperText>
     	<TextField required name='contrato' type='text' onChange={handleChange}/>
	<FormHelperText>contrato</FormHelperText> 
     	<TextField required name='email' type='text' onChange={handleChange}/>
	<FormHelperText>email</FormHelperText>
     	<TextField required type='password' name='password' onChange={handleChange}/>
	<FormHelperText>password</FormHelperText>
      </FormControl>
      <div>
	<Button 
	  onClick={()=> signupUser(user)}
	  variant='contained'
	  className={classes.button}
	  color='secondary'>Confirmar Registro
	</Button>
       <Button 
	  onClick={()=> setShowRegister(false)}
	  variant='contained'
	  className={classes.button}
	  color='primary'> Logearse 
       </Button>
	<Snackbar open={!err===''} autoHideDuration={6000}>
	  <Alert onClose={()=>handleClose()} severity="warning">
         revisa los datos ingresados o comunicate con el administrador 
        </Alert>
      </Snackbar>
      </div>
    </div>
  )
}
