import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  FormHelperText,
} from '@material-ui/core';
//importacion de componentes del select
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import firebase from 'firebase/app';
import ("firebase/auth");
import ("firebase/firestore");


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function getSteps() {
  return ['Seleccione su tipo de contrato', 'Seleccione el documento que necesita'];
}

export default function AppStepper({usuario}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({ "type":"", "document":"","usuario":usuario});
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (e) => {
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //========== FIREBASE =============
  var db = firebase.firestore();
  var storage = firebase.storage();
  const [docId,setDocId] = useState(-1);

  const handleDoc = ()=>{
    db.collection("documents").add(data)
      .then(function(docRef) {
	console.log("Document written with ID: ", docRef.id);
        db.collection("users").get().then((querySnapshot) => {
	  setDocId(querySnapshot.docs.length);
	});
      	var url = `https://back-harold-app.herokuapp.com/${data.document}-${data.type}/${data.usuario.email}`;
	window.location.replace(url);
      })
      .catch(function(error) {
	console.error("Error adding document: ", error);
      })
  }

  const handleLogout = ()=>{
    firebase.auth().signOut()
      .then(function() {
	console.log('signout succesfull');
	window.location.replace('');
      })
      .catch(function(err) {
	console.error(err);
      });
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
	return (
	<FormControl className={classes.formControl} >
	  <InputLabel >Tipo</InputLabel>
	  <Select  name="type" value={data['type']} onChange={handleChange}>
	    <MenuItem value={'GM'}>GM</MenuItem>
	    <MenuItem value={'Contratista'}>Contratista</MenuItem>
	  </Select>
	  <FormHelperText>Tipo de contrato</FormHelperText>
	</FormControl>
	);
      case 1:
	return (
	<FormControl className={classes.formControl} >
	  <InputLabel >Documento </InputLabel>
	  <Select  name="document" value={data['document']} onChange={handleChange}>
	    <MenuItem value={'ALTURA'}>Permiso de trabajo en alturas</MenuItem>
	    <MenuItem value={'CONFINADOS'}>Permiso ingreso espacios confinados</MenuItem>
	    <MenuItem value={'ENERGIA'}>Permiso control energías peligrosas</MenuItem>
	  </Select>
	  <FormHelperText>Tipo de permiso</FormHelperText>
	</FormControl>
	);
      default:
	return '¿está usted intentando romper algo?';
    }
  }
 
  return (
    <div className={classes.root}>
     <Button
      onClick={handleLogout}
      className={classes.button}>
      Cerrar sesión
     </Button>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index,data,setData)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
		    disabled={(data.type===''  && activeStep===0)||(data.document==='' && activeStep===1)?true:false}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
	  <Typography>Usted Necesita un Permiso de {data.document} como empleado {data.type}</Typography>
          <Button 
	    onClick={handleReset} 
	    className={classes.button}
	  >
            Reset
          </Button>
          <Button 
	    variant="contained"
            color="primary"
	    onClick={handleDoc} 
	  >
            Confirmar
          </Button>
        </Paper>
      )}
    </div>
  );
}
