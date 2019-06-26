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
