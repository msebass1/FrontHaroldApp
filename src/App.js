import React  from 'react';
import { Grid,Paper,CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './componets/navBar/';
import AppStepper from './componets/stepper';
import Registrarse from './componets/registrarse'; 
import Login from './componets/login'; 
import firebase from 'firebase/app';
import ('firebase/auth');
import ('firebase/firestore');

const useStyles = makeStyles({
  app: {
    background: ' #5a657e',
    height: 1080,
  },
  cont:{
    marginTop: 50,
  },
  form:{
    padding: 50,
    width: 800,
  }

});

function App() {
  const classes = useStyles();
  const [usuario, setUsuario] = React.useState({});
  const [showRegister, setShowRegister] = React.useState(false);

  React.useEffect(() => {
     firebase.auth().onAuthStateChanged(function(user) {
       try{
       firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
	 .then((doc) => {
	   if (doc.exists) {
	     setUsuario(doc.data());
             console.log("Document data:", doc.data());
	   } else {
	     // doc.data() will be undefined in this case
	    console.log("No such document!");
	   }
	    
	 });
       }catch(e){
	 console.log('no Loged');
       }
      });
  }, []);

/*
=============Lectura Documentos==============================

  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
    });
});
*/

  return (
    <div className={classes.app}>
      <CssBaseline />
      <header >
	<NavBar/>
      </header>
      <div >
      <Grid
	container
	direction="column"
	justify="center"
        alignItems="center"
	className={classes.cont}>
	<Grid item >
	  <Paper className={classes.form}>
	    {usuario.firstName!==undefined?
	      <AppStepper usuario={usuario}/>
	      :(
		showRegister?
		<Registrarse setShowRegister={setShowRegister}/>
		:
		<Login setShowRegister={setShowRegister}/>
	      )
	    }
	    {/* si existe usu =>  */}
	  </Paper>
	</Grid>
	</Grid>
	</div>
    </div>
  );
}

export default App;
