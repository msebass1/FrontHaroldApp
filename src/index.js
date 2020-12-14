import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCsPG0nNNwtzpo06VgdUPW7YneeJqzz5WQ",
  authDomain: "haroldapp-49993.firebaseapp.com",
  databaseURL: "https://haroldapp-49993.firebaseio.com",
  projectId: "haroldapp-49993",
  storageBucket: "haroldapp-49993.appspot.com",
  messagingSenderId: "432466827161",
  appId: "1:432466827161:web:41233f367828b077dea508"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
