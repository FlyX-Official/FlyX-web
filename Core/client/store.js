/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    storage: window.localStorage, // or window.sessionStorage or localForage instance.
    // Function that passes the state and returns the state with only the objects you want to store.
    reducer: state => ({
        USER: state.USER,
    })
})

export const store = new Vuex.Store({
    state: {
        USER: null,
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
    },
    actions: {
        signIn(context, userInfo) {
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    userInfo.email,
                    userInfo.password
                )
                .then(user => {})
                .catch(error => {
                    // Error Handling
                    alert(error.message);
                    console.log(error.message);
                });
        },
        signInWithSocial(context, social) {

            if (social == 'google'){
                var provider = new firebase.auth.GoogleAuthProvider();
            }else if (social == 'facebook'){
                var provider = new firebase.auth.FacebookAuthProvider();
            }else if (social == 'twitter'){
                var provider = new firebase.auth.TwitterAuthProvider();
            }else if (social == 'github'){
                var provider = new firebase.auth.GithubAuthProvider();
            }else{
                alert('provider fucked up');
            }
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(error.message);
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
                .createUserWithEmailAndPassword(
                    userInfo.email,
                    userInfo.password
                )
                .then(user => {})
                .catch(error => {
                    // Error Handling
                    alert(error.message);
                });
        }
    },
    plugins: [vuexLocalStorage.plugin]
});