<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "App",
  mounted() {

    // On auth state change...
    firebase.auth().onAuthStateChanged(user => {
      
      // if user is logged in
      if (user) {
        // if user has verified email
        if (user.emailVerified) {

          // redirect to app page and commit user to store
          this.$store.commit("initUser", user);
          this.$router.push("/app");
          console.log(user);

        // if user has NOT verified email
        } else {
          
          // log them out
          firebase
            .auth()
            .signOut()
            .catch(error => {
              // Error Handling
              alert(error.message);
            });
        }
        console.log("user is logged in");

      // if user is not logged in
      } else {
        // redirect to landing page
        this.$store.commit("initUser", null);
        this.$router.push("/");
        console.log("user is logged out");
      }
    });
  }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fredoka+One');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
@import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600,700');
@import "~bulma/sass/utilities/_all";

// Set your colors
// $primary: #2ED199;
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #6487A5;
$primary-invert: findColorInvert($primary);

$secondary: #2ED199;
$secondary-invert: findColorInvert($secondary);

$dark: #4A4A4A;
$dark-invert: findColorInvert($dark);

$accent: #22B4DE;
$accent-invert: findColorInvert($accent);

$danger: #FF6B6B;
$danger-invert: findColorInvert($danger);

$google: #4688f1;
$google-invert: findColorInvert($google);

$facebook: #466bae;
$facebook-invert: findColorInvert($facebook);

$twitter: #33a4ec;
$twitter-invert: findColorInvert($twitter);

$github: #3f4347;
$github-invert: findColorInvert($github);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "accent": ($accent, $accent-invert),
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "secondary": ($secondary, $secondary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "google": ($google, $google-invert),
    "facebook": ($facebook, $facebook-invert),
    "twitter": ($twitter, $twitter-invert),
    "github": ($github, $github-invert),
    

);



@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
