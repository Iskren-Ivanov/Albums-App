import firebase from 'firebase';
const app = firebase.initializeApp({
  apiKey: 'AIzaSyBd2itbl2Cdjth1i_XqxU1sRdThY5lC6RM',
  authDomain: 'project-albums-photos-comment.firebaseapp.com',
  databaseURL: 'https://project-albums-photos-comment.firebaseio.com',
  projectId: 'project-albums-photos-comment',
  storageBucket: 'project-albums-photos-comment.appspot.com',
  messagingSenderId: '995572053236',
  appId: '1:995572053236:web:f3c230c34dfc183e055aa1',
  measurementId: 'G-B5LTCJ99XV',
});

export const auth = app.auth();
