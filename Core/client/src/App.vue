<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import'firebase/auth';

export default {
  name: "App",
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
       this.$store.commit("initUser", user);
       this.$router.push('/app');
        console.log("user is logged in");
      } else {
        this.$store.commit("initUser", null);
        this.$router.push('/');
        console.log("user is logged out");
      }
    });
  }
};
</script>
