<template>
  <div class="grid-container">
    <p class="test">{{currUserEmail}}</p>
    <Nav/>
    <Tickets/>
    <Map/>
  </div>
</template>

<script>
/* eslint-disable */
import Nav from "@/components/Nav";
import Tickets from "@/components/Tickets";
import Map from "@/components/Map";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AppPage",
  components: {
    Nav,
    Tickets,
    Map
  },
  data() {
    return {
      myUser: ""
    };
  },
  computed: {
    currUserEmail() {
      var currUser = this.$store.state.USER;
      return currUser === null ? "not logged in" : currUser.email;
    },
  },
  mounted() {
    // window.location.reload();
    // this.myUser = firebase.auth().currentUser;
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
  },
  methods: {
    refresh () {
       window.location.reload();
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/AppPageStyles.scss";

.test {
  position: absolute;
  top: 0;
  z-index: 999;
}
</style>
