<template>
  <div id="app-page-container">
    <div id="app-nav">
      <div id="search-bar-wrap">
        <div id="trip-selection">
          <p id="round-trip-btn" @click="setTripType('round')">Round Trip</p>
          <p id="one-way-btn" @click="setTripType('oneway')">One Way</p>
        </div>
        <form id="app-page-search-form" @submit.prevent="validateInput()">
          <autocomplete v-model="searchData.from" id="from-input" placeholder="From"></autocomplete>
          <autocomplete v-model="searchData.to" id="to-input" placeholder="To"></autocomplete>
          <v-date-picker
            class="datepicker"
            id="start-datepicker"
            :pane-width="150"
            name="date"
            mode="range"
            :available-dates="{ start: new Date(), end: new Date(), span: 280 }"
            :disabledAttribute="disabledAttribute"
            v-model="searchData.departureWindow"
            show-caps
          ></v-date-picker>
          <v-date-picker
            class="datepicker"
            id="return-datepicker"
            :pane-width="150"
            name="date"
            mode="range"
            :available-dates="{ start: new Date(), end: new Date(), span: 280 }"
            :disabledAttribute="disabledAttribute"
            v-model="searchData.returnDepartureWindow"
            show-caps
          ></v-date-picker>
          <button id="nav-search-submit-btn" type="submit">
            <span id="submit-svg"></span>
          </button>
        </form>
      </div>

      <div id="nav-profile-wrap">
        <div @click="openProfileModal()" id="nav-username-wrap">
          <p>{{currUserDisplayName}}</p>
        </div>
        <div @click="openProfileModal()" id="nav-profile-picture">
          <img v-bind:src="currUserPhotoURL" alt>
        </div>
      </div>
    </div>

    <div id="app-sort-wrap"></div>
    <div id="app-tickets-wrap"></div>
    <div id="app-ticket-details-wrap"></div>

    <sweet-modal ref="profileModal" overlay-theme="dark" :title="currUserDisplayName">
      <button @click="signOut()">Sign out</button>
    </sweet-modal>
  </div>
</template>

<script>
/* eslint-disable */
/* import Nav from "@/components/Nav";
import Tickets from "@/components/Tickets";
import Map from "@/components/Map"; */

import Api from "@/services/Api";
import autocomplete from "@/components/Autocomplete";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AppPage",
  components: {
    autocomplete,
    SweetModal,
    SweetModalTab
  },
  data() {
    return {
      // searchData is the object that exists in our nav component
      // to temporarily store the input form data
      searchData: {
        oneWay: false,
        from: "",
        to: "",
        radiusFrom: "50",
        radiusTo: "50",
        departureWindow: {
          start: new Date(),
          end: new Date()
        },
        returnDepartureWindow: {
          start: new Date(),
          end: new Date()
        }
      },
      //works like css, for what is disabled we can choose the style to give the content
      disabledAttribute: {
        contentStyle: {
          opacity: 0.3
        }
      },
      testPlaceholder: "test"
    };
  },
  computed: {
    currUserEmail() {
      var currUser = this.$store.state.USER;
      console.log(currUser);
      return currUser === null ? "not logged in" : currUser.email;
    },
    currUserDisplayName() {
      var currUser = this.$store.state.USER;
      return currUser === null ? "not logged in" : currUser.displayName;
    },
    currUserPhotoURL() {
      var currUser = this.$store.state.USER;
      return currUser === null ? "not logged in" : currUser.photoURL;
    }
  },
  mounted() {
    // window.location.reload();
    // this.myUser = firebase.auth().currentUser;
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }

    var roundBtn = document.getElementById("round-trip-btn");
    roundBtn.style.fontWeight = 800;
  },
  methods: {
    refresh() {
      window.location.reload();
    },
    signOut: function() {
      this.$store.dispatch("signOut");
    },
    validateInput: function() {
      if (this.searchData.from == "" || this.searchData.to == "") {
        alert("Please fill out all fields");
      }
    },
    // This is the function that sends a post request containing 'searchData' to the server
    submitSearch: function() {
      this.$root.$emit("startedSearch");

      // do post request
      Api()
        .post("/search", this.searchData)
        .then(response => {
          console.log(response.data.data);

          // This line sends(emits) the ticket data as an event. Other components
          // can listen for this event to have access to the data that is sent.
          //  this.$root.$emit("ticketComm", response.data.data);
        })
        .catch(error => {
          // This catches any error the server would send back
          console.log(error);
        });
    },
    setTripType: function(tripType) {
      if (tripType === "round") {
        this.searchData.oneWay = false;
        var roundBtn = document.getElementById("round-trip-btn");
        var onewayBtn = document.getElementById("one-way-btn");
        var returnDatepicker = document.getElementById('return-datepicker');
        returnDatepicker.style.display = 'initial';
        roundBtn.style.fontWeight = 800;
        onewayBtn.style.fontWeight = 100;
      } else {
        this.searchData.oneWay = true;
        var roundBtn = document.getElementById("round-trip-btn");
        var onewayBtn = document.getElementById("one-way-btn");
        var returnDatepicker = document.getElementById('return-datepicker');
        returnDatepicker.style.display = 'none';
        roundBtn.style.fontWeight = 100;
        onewayBtn.style.fontWeight = 800;
      }
    },
    openProfileModal: function() {
      this.$refs.profileModal.open();
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/AppPageStyles.scss";

/*
.test {
  position: absolute;
  top: 0;
  z-index: 999;
} */
</style>
