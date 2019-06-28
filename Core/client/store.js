/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import firebase from "firebase/app";
import "firebase/auth";
import Api from "./src/services/Api";
import { Snackbar } from "buefy/dist/components/snackbar";

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
    // Sign in with email and password
    signIn(context, userInfo) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(result => {

          // If user email is verified, do post request to server to verify
          // they are in firestore DB
          if (result.user.emailVerified) {
            // send user id to server to check if new user
            Api()
              .post("/verifynewuser", { uid: result.user.uid })
              .then(response => {
                // alert(`[store.js] ${response.data.message}`);
              });

          // if user email is NOT verified, alert them
          } else {
            Snackbar.open({
              message: "Please verify your email before signing in",
              position: "is-top"
            });
          }

        })
        .catch(error => {
          // Error Handling
          alert(error.message);
        });
    },
    // Sign in with provider
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

          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;

          // send user id to server to check if new user
          Api()
            .post("/verifynewuser", { uid: result.user.uid })
            .then(response => {
              // alert(`[store.js] ${response.data.message}`);
            });
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
    // Sign out
    signOut() {
      firebase
        .auth()
        .signOut()
        .catch(error => {
          // Error Handling
          alert(error.message);
        });
    },
    // Register with email and password
    register(context, userInfo) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(result => {

          // Set user display name (in google auth)
          result.user
            .updateProfile({
              displayName: userInfo.name
            })
            .then(function() {
              // Update successful.
            })
            .catch(function(error) {
              // An error happened.
              alert("updated user error");
            });

          // Send verification email to users email address
          result.user
            .sendEmailVerification()
            .then(function() {
              
              // Email sent.
              Snackbar.open({
                message: "A verification email has been sent to you!",
                position: "is-bottom-left"
              });
            })
            .catch(function(error) {
              // An error happened.
              alert("email verification error");
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
