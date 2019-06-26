/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import firebase from "firebase/app";
import "firebase/auth";
import Api from "./src/services/Api";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage, // or window.sessionStorage or localForage instance.
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({
    USER: state.USER
  })
});

export const store = new Vuex.Store({
  state: {
    USER: null
  },
  mutations: {
    initUser(state, firebaseUser) {
      state.USER = firebaseUser;
    }
  },
  getters: {
    currUser(state) {
      return state.USER;
    },
    currUserID(state) {
      return state.USER.uid;
    }
  },
  actions: {
    signIn(context, userInfo) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(result => {

          if (!result.user.emailVerified){
            alert('Please verify your email address before signing in');
          }
          // // send user id to server to check if new user
          Api()
            .post("/verifynewuser", { uid: result.user.uid })
            .then(response => {
              alert(`[store.js] ${response.data.message}`);
            });
            console.log(result.user);
        })
        .catch(error => {
          // Error Handling
          alert(error.message);
        });
    },
    signInWithSocial(context, social) {
      if (social == "google") {
        var provider = new firebase.auth.GoogleAuthProvider();
      } else if (social == "facebook") {
        var provider = new firebase.auth.FacebookAuthProvider();
      } else if (social == "twitter") {
        var provider = new firebase.auth.TwitterAuthProvider();
      } else if (social == "github") {
        var provider = new firebase.auth.GithubAuthProvider();
      } else {
        alert("provider error");
      }
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log('signed in via provider');
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          Api()
            .post("/verifynewuser", { uid: user.uid })
            .then(response => {
              alert(`[store.js] ${response.data.message}`);
            });
            console.log(result.user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          alert(error.message);
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .catch(error => {
          // Error Handling
          alert(error.message);
        });
    },
    register(context, userInfo) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(result => {

          // Set display name
          result.user.updateProfile({
            displayName: userInfo.name,
          }).then(function() {
            // Update successful.
            alert('updated user');
          }).catch(function(error) {
            // An error happened.
            alert('updated user error');
          });

          // Send verification email
          result.user.sendEmailVerification().then(function() {
            // Email sent.
            alert('sent verification email');
          }).catch(function(error) {
            // An error happened.
            alert('email verification error');
          });

          // post request to server to insert user into DB
          Api()
            .post("/verifynewuser", { uid: result.user.uid })
            .then(response => {
              alert(`[store.js] ${response.data.message}`);
            });
        })
        .catch(error => {
          // Error Handling
          alert(error.message);
        });
    }
  },
  plugins: [vuexLocalStorage.plugin]
});
