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
    <div id="app-sort-wrap">
      <div id="main-sorts-wrap">
        <div class="main-sort" @click="chooseMainSort('price')" id="sort-by-price">
          <div class="main-sort-left">
            <div class="sort-checked" v-if="isSortPrice"></div>
          </div>
          <div class="main-sort-right">
            <p v-if="isSortPrice" class="chosen-main-sort">Price</p>
            <p v-else>Price</p>
          </div>
        </div>
        <div class="main-sort" @click="chooseMainSort('duration')" id="sort-by-duration">
          <div class="main-sort-left">
            <div class="sort-checked" v-if="isSortDuration"></div>
          </div>
          <div class="main-sort-right">
            <p v-if="isSortDuration" class="chosen-main-sort">Duration</p>
            <p v-else>Duration</p>
          </div>
        </div>
        <div class="main-sort" @click="chooseMainSort('date')" id="sort-by-date">
          <div class="main-sort-left">
            <div class="sort-checked" v-if="isSortDate"></div>
          </div>
          <div class="main-sort-right">
            <p v-if="isSortDate" class="chosen-main-sort">Date</p>
            <p v-else>Date</p>
          </div>
        </div>
      </div>
      <div id="sort-stops-wrap"></div>
      <div id="sort-depart-airports"></div>
      <div id="sort-arrive-airports"></div>
    </div>

    <div id="app-tickets-wrap">
      <!--<p id='presearch-message' v-if='dispMessage'>Enter in your trip info to find tickets!</p>-->
      <img id="presearch-message" v-if="dispMessage" src="../assets/logo-light.svg">
      <div id="search-spinner" v-if="dispSpinner"></div>
      <div v-if="isSortPrice">
        <ticket
          v-for="(ticket,i) in ticketsByPrice"
          @click="setTicketDetails(ticket)"
          :ticketData="ticket"
          :key="i"
        ></ticket>
      </div>
      <div v-if="isSortDuration">
        <ticket
          v-for="(ticket,i) in ticketsByDuration"
          @click="setTicketDetails(ticket)"
          :ticketData="ticket"
          :key="i"
        ></ticket>
      </div>
      <div v-if="isSortDate">
        <ticket
          v-for="(ticket,i) in ticketsByDate"
          @click="setTicketDetails(ticket)"
          :ticketData="ticket"
          :key="i"
        ></ticket>
      </div>
    </div>

    <div id="app-ticket-details-wrap">
      <div id="details-text-wrap">
        <div v-if="ticketDetailsData" class="text-inner-wrap">
          <div v-for="(leg,i) in ticketDetailsData.route" :key="i" class="details-text-leg-wrap">
            <div class="leg">
              <div class="leg-date-row leg-row">
                <p>
                  {{convertDate(leg.dTimeUTC)}}
                  <span
                    v-if="convertDate(leg.dTimeUTC) != convertDate(leg.aTimeUTC)"
                  >- {{convertDate(leg.aTimeUTC)}}</span>
                </p>
              </div>
              <div class="leg-top leg-row">
                <img src="../assets/plane-departure.svg" alt>
                <p class="leg-time">{{converTime(leg.dTimeUTC)}}</p>
                <p class="leg-airport">{{leg.flyFrom}} - {{leg.cityFrom}}</p>
              </div>
              <div class="leg-mid leg-row">
                <img src="../assets/plane-arrival.svg" alt>
                <p class="leg-time">{{converTime(leg.aTimeUTC)}}</p>
                <p class="leg-airport">{{leg.flyTo}} - {{leg.cityTo}}</p>
              </div>
              <div class="leg-bot leg-row">
                <div>
                  <p>{{convertAirlineCode(leg.airline)}} #{{leg.flight_no}}</p>
                </div>
                <div>
                  <p class="leg-guaranteed" v-if="leg.guarantee">Guaranteed</p>
                  <p class="leg-not-guaranteed" v-else>Not Guranteed</p>
                </div>
              </div>
            </div>
            <div v-if="ticketDetailsData.route[i+1]" class="layover">
              <p>{{determineLayoverTime(leg, ticketDetailsData.route[i+1])}}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="details-buy-btn-wrap">
        <div v-if="ticketDetailsData" id="ticket-buy-btn-trip-brief">
          <p>{{ticketDetailsData.flyFrom}}</p>
          <img v-if="selectedTicketOneWay" style="width: 15px;" src="../assets/one-way-white.svg">
          <img v-else src="../assets/round-trip-white.svg">
          <p>{{ticketDetailsData.flyTo}}</p>
        </div>

        <p id="buy-btn-wrap-price" v-if="ticketDetailsData">${{ticketDetailsData.price}}.00</p>
        <a
          v-if="ticketDetailsData"
          :href="ticketDetailsData.deep_link"
          target="_blank"
          id="buy-btn"
        >
          <p>Purchase</p>
        </a>
      </div>
    </div>

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
import ticket from "@/components/Ticket";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
import firebase, { functions } from "firebase/app";
import "firebase/auth";
const moment = require("moment-timezone");
const airlinesCodes = require("airlines-iata-codes");

export default {
  name: "AppPage",
  components: {
    autocomplete,
    SweetModal,
    SweetModalTab,
    ticket
  },
  data() {
    return {
      // searchData is the object that exists in our nav component
      // to temporarily store the input form data
      searchData: {
        uid: this.$store.getters.currUserID,
        oneWay: false,
        from: "",
        to: "",
        radiusFrom: "100",
        radiusTo: "100",
        departureWindow: {
          start: new Date(new Date().getTime() + 86400000),
          end: new Date(new Date().getTime() + 86400000 * 7)
        },
        returnDepartureWindow: {
          start: new Date(new Date().getTime() + 86400000 * 9),
          end: new Date(new Date().getTime() + 86400000 * 16)
        }
      },
      //works like css, for what is disabled we can choose the style to give the content
      disabledAttribute: {
        contentStyle: {
          opacity: 0.3
        }
      },
      ticketsByPrice: [],
      ticketsByDuration: [],
      ticketsByDate: [],
      isSortPrice: false,
      isSortDuration: false,
      isSortDate: false,
      dispMessage: true,
      dispSpinner: false,
      ticketDetailsData: "",
      selectedTicketOneWay: Boolean,
      isOutOfSearches: false
    };
  },
  computed: {
    currUserEmail() {
      var currUser = this.$store.state.USER;
      return currUser === null ? "not logged in" : currUser.email;
    },
    currUserDisplayName() {
      var currUser = this.$store.state.USER;
      return currUser === null ? "not logged in" : currUser.displayName;
    },
    currUserPhotoURL() {
      var currUser = this.$store.state.USER;
      return currUser === null ? "not logged in" : currUser.photoURL;
    },
    currUserID() {
      return this.$store.getters.currUserID;
    }
  },
  mounted() {
    var roundBtn = document.getElementById("round-trip-btn");
    roundBtn.style.fontWeight = 800;

    this.$root.$on("ticketDetails", ticket => {
      if (ticket.routes.length == 1) {
        this.selectedTicketOneWay = true;
      } else {
        this.selectedTicketOneWay = false;
      }
      this.ticketDetailsData = ticket;
    });
  },
  methods: {
    refresh() {
      window.location.reload();
    },
    signOut: function() {
      this.$refs.profileModal.close();
      this.$store.dispatch("signOut");
    },
    validateInput: function() {
      if (this.searchData.from == "" || this.searchData.to == "") {
        alert("Please fill out all fields");
      } else {
        this.ticketsByPrice = [];
        this.ticketDetailsData = null;
        this.searchData.from = this.onlyAirportCode(this.searchData.from);
        this.searchData.to = this.onlyAirportCode(this.searchData.to);
        this.isLoading(true);
        this.submitSearch();
      }
    },
    // This is the function that sends a post request containing 'searchData' to the server
    submitSearch: function() {
      this.$root.$emit("startedSearch");

      // do post request
      Api()
        .post("/search", this.searchData)
        .then(response => {
          this.isLoading(false);

          if (response.data.code == 1) {
            let tickets = response.data.tickets.data

            this.ticketsByPrice = [];
            this.ticketsByDuration = [];
            this.ticketsByDate = [];

            this.ticketsByPrice = tickets.slice();
            this.ticketsByDuration = tickets.slice();
            this.ticketsByDate = tickets.slice();

            this.ticketsByPrice.sort(this.comparePrice);
            this.ticketsByDuration.sort(this.compareDuration);
            this.ticketsByDate.sort(this.compareDate);

            this.isSortPrice = true;

          } else if (response.data.code == 0) {
            this.isOutOfSearches = true;
          } else {
            // ***** NEED ERROR HANDLING *******
            console.log('Something went wrong with the search');
          }
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
        var returnDatepicker = document.getElementById("return-datepicker");
        returnDatepicker.style.display = "initial";
        roundBtn.style.fontWeight = 800;
        onewayBtn.style.fontWeight = 100;
      } else {
        this.searchData.oneWay = true;
        var roundBtn = document.getElementById("round-trip-btn");
        var onewayBtn = document.getElementById("one-way-btn");
        var returnDatepicker = document.getElementById("return-datepicker");
        returnDatepicker.style.display = "none";
        roundBtn.style.fontWeight = 100;
        onewayBtn.style.fontWeight = 800;
      }
    },
    openProfileModal: function() {
      this.$refs.profileModal.open();
    },
    isLoading: function(isSearching) {
      if (isSearching) {
        this.dispMessage = false;
        this.dispSpinner = true;
      } else {
        this.dispMessage = false;
        this.dispSpinner = false;
      }
    },
    setTicketDetails: function(ticket) {
      // alert('here');
      // if (ticket.routes.length == 1) {
      //   alert('true');
      //   this.selectedTicketOneWay = true;
      // } else {
      //   alert('false');
      //   this.selectedTicketOneWay = false;
      // }
      // this.ticketDetailsData = ticket;
    },
    determineLayoverTime: function(leg1, leg2) {
      var arrival = moment.unix(leg1.aTime);
      var departure = moment.unix(leg2.dTime);

      var elapsedTime = departure.diff(arrival);
      var tempTime = moment.duration(elapsedTime);

      var returnedTime;

      if (tempTime.days() != 0) {
        returnedTime =
          tempTime.days() +
          "d " +
          tempTime.hours() +
          "h " +
          tempTime.minutes() +
          "m";
      }

      if (tempTime.hours() == 0 && tempTime.days() == 0) {
        returnedTime = tempTime.minutes() + "m";
      }

      returnedTime = tempTime.hours() + "h " + tempTime.minutes() + "m";

      if (leg1.return == 0 && leg2.return == 1) {
        return tempTime.days() + " Day Stay";
      } else {
        return returnedTime + " Layover";
      }
    },
    convertAirlineCode: function(code) {
      var airlineString = airlinesCodes.getAirlineName(code);
      airlineString = airlineString.replace("Airlines", "");
      return airlineString;
    },
    converTime: function(timeSeconds) {
      var timeMoment = moment.unix(timeSeconds);
      return timeMoment.format("hh:mma");
    },
    convertDate: function(rawDate) {
      var dateMoment = moment.unix(rawDate);
      return dateMoment.format("ll");
    },
    getReturnAirport: function(ticket) {
      for (var i = 0; i < ticket.route.length; i++) {
        if (ticket.route[i].return == 1) {
          return ticket.route[i].flyFrom;
        }
      }
    },
    chooseMainSort(sort) {
      if (sort == "price") {
        this.isSortPrice = true;
        this.isSortDuration = false;
        this.isSortDate = false;
      } else if (sort == "duration") {
        this.isSortPrice = false;
        this.isSortDuration = true;
        this.isSortDate = false;
      } else if (sort == "date") {
        this.isSortPrice = false;
        this.isSortDuration = false;
        this.isSortDate = true;
      } else {
        console.log("Error with choosing main sort");
      }
    },
    comparePrice: function(a, b) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    },
    compareDuration: function(a, b) {
      if (a.duration.total < b.duration.total) return -1;
      if (a.duration.total > b.duration.total) return 1;
      return 0;
    },
    compareDate: function(a, b) {
      if (a.dTime < b.dTime) return -1;
      if (a.dTime > b.dTime) return 1;
      return 0;
    },
    onlyAirportCode: function(str) {
      var parts = str.split(",");
      return parts[0];
    }
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
