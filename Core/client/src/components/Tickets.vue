<template>
  <div class="tickets-wrap">
    <div class="ticketLabel">Tickets</div>
    <div class="sort-options">
      <div class="sort-option" v-on:click="renderTickets(1)">Price</div>
      <div class="sort-option" v-on:click="renderTickets(2)">Duration</div>
      <div class="sort-option" v-on:click="renderTickets(3)">Date</div>
    </div>
    <!--
      You have access to these ticket attributes:
        arrival: (...)
        depature: (...)
        duration: (...)
        from: (...)2
        key: (...)
        legs: Array(2)
        pennyPrice: (...)
        to: (...)
    -->
    <p id='presearch-message' v-if='dispMessage'>Enter in your trip info to find tickets!</p>
    <div id='search-spinner' v-if='dispSpinner'></div>
    <div v-if="isSortDate && !dispSpinner">
      <div class="ticket" v-for="(ticket,i) in ticketsByDate" :key="i">
        <div class="ticket-from-to">
          <p>{{ ticket.from }}</p>
          <img src="../assets/Divider.svg">
          <p>{{ ticket.to }}</p>
        </div>
        <div class="ticket-price">
          <p>${{ convertPennies(ticket.pennyPrice) }}</p>
        </div>
        <div class="ticket-color"></div>
        <div class="ticket-departure">
          <img src="../assets/plane-departure.svg">
          <p>{{ removeDay(ticket.departure) }}</p>
        </div>
        <div class="ticket-return">
          <img src="../assets/plane-arrival.svg">
          <p>{{ removeDay(ticket.legs[(ticket.legs.length-1)].arrivalTime) }}</p>
        </div>
        <div class="ticket-duration-legs">
          <p>{{ convertSeconds(ticket.duration) }}</p>
          <p>{{ ticket.legs.length }} Legs</p>
        </div>
      </div>
    </div>
    <div v-else-if="isSortPrice && !dispSpinner">
      <div class="ticket" v-for="(ticket,i) in ticketsByPrice" :key="i">
        <div class="ticket-from-to">
          <p>{{ ticket.from }}</p>
          <img src="../assets/Divider.svg">
          <p>{{ ticket.to }}</p>
        </div>
        <div class="ticket-price">
          <p>${{ convertPennies(ticket.pennyPrice) }}</p>
        </div>
        <div class="ticket-color"></div>
        <div class="ticket-departure">
          <img src="../assets/plane-departure.svg">
          <p>{{ removeDay(ticket.departure) }}</p>
        </div>
        <div class="ticket-return">
          <img src="../assets/plane-arrival.svg">
          <p>{{ removeDay(ticket.legs[(ticket.legs.length-1)].arrivalTime) }}</p>
        </div>
        <div class="ticket-duration-legs">
          <p>{{ convertSeconds(ticket.duration) }}</p>
          <p>{{ ticket.legs.length }} Legs</p>
        </div>
      </div>
    </div>
    <div v-else-if="isSortDuration && !dispSpinner">
      <div class="ticket" v-for="(ticket,i) in ticketsByDuration" :key="i">
        <div class="ticket-from-to">
          <p>{{ ticket.from }}</p>
          <img src="../assets/Divider.svg">
          <p>{{ ticket.to }}</p>
        </div>
        <div class="ticket-price">
          <p>${{ convertPennies(ticket.pennyPrice) }}</p>
        </div>
        <div class="ticket-color"></div>
        <div class="ticket-departure">
          <img src="../assets/plane-departure.svg">
          <p>{{ removeDay(ticket.departure) }}</p>
        </div>
        <div class="ticket-return">
          <img src="../assets/plane-arrival.svg">
          <p>{{ removeDay(ticket.legs[(ticket.legs.length-1)].arrivalTime) }}</p>
        </div>
        <div class="ticket-duration-legs">
          <p>{{ convertSeconds(ticket.duration) }}</p>
          <p>{{ ticket.legs.length }} Legs</p>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "tickets",
  data() {
    return {
      // Instance(component) bound ticket array
      ticketsByPrice: [],
      ticketsByDuration: [],
      ticketsByDate: [],
      isSortPrice: false,
      isSortDuration: false,
      isSortDate: false,
      dispMessage: true,
      dispSpinner: false,
    };
  },
  mounted() {

    // var moment = require('moment');

    // Sunday, January 13th 2019, 05:45am
    // 'January 13, 2019, 5:45 am'

    this.$root.$on('startedSearch', () => {
      this.dispMessage = false;
      this.dispSpinner = true;
    }); 

    // This block listens for a 'ticketComm' event and then stores the data
    // that was emitted into our local 'tickets' array.
    this.$root.$on("ticketComm", data => {

      this.dispSpinner = false;
      this.ticketsByPrice = [];
      this.ticketsByDuration = [];
      this.ticketsByDate = [];

      this.ticketsByPrice = data.tickets.slice();
      this.ticketsByDuration = data.tickets.slice();
      this.ticketsByDate = data.tickets.slice();

      this.ticketsByPrice.sort(this.comparePrice);
      this.ticketsByDuration.sort(this.compareDuration);

      this.isSortPrice = true;
    });
  },
  methods: {
    // Function to convert the penny price into a real dollar amount
    convertPennies: function(price) {
      return (price / 100).toFixed(2);
    },
    convertSeconds: function(seconds) {
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
      var time = hours + " hours " + minutes + " minutes";

      return time;
    },
    removeDay: function(dateStr) {
      let parts = dateStr.split(",");
      let date = parts[1] + "," + parts[2];
      return date;
    },
    renderTickets: function (x) {
    
      // 1 = price, 2 = duration, 3 = date
      if (x == 1){
        this.isSortPrice = true;
        this.isSortDuration = false;
        this.isSortDate = false;
      }else if (x == 2){
        this.isSortPrice = false;
        this.isSortDuration = true;
        this.isSortDate = false;
      }else if (x == 3){
        this.isSortPrice = false;
        this.isSortDuration = false;
        this.isSortDate = true;
      }else{
        alert('Something went wrong!');
      }

    },
    comparePrice: function(a, b) {
      if (a.pennyPrice < b.pennyPrice) return -1;
      if (a.pennyPrice > b.pennyPrice) return 1;
      return 0;
    },
    compareDuration: function(a, b) {
      if (a.duration < b.duration) return -1;
      if (a.duration > b.duration) return 1;
      return 0;
    },
    compareDate: function(a, b) {

    },
  }
};
</script>
