import firebase from 'firebase/app';
import ("firebase/auth");
import ("firebase/firestore");

export const signupUser = (userDetails) => {
    const {firstName, lastName, contrato, admin, email, password} = userDetails;
    return () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
                firstName: firstName,
                lastName: lastName,
                contrato: contrato,
		admin: admin,
                email: email
            }) 
            .catch(error => {
                console.log('Error creando el usuario Firestore', error);
            })
        })
        .catch(error => {
            console.log('Error creando el usuario Auth', error);
        })
    }
};

export const signinUser = (userCredentials) => {
  const {email,password} = userCredentials;
  return () => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
      });
  }
}
