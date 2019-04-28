<template>
  <a :href="ticketData.deep_link" target="_blank" @click="clickTicket(ticketData)" class="ticket">
    <div class="ticket-hover-color"></div>
    <div class="ticket-short-route">
      <p>{{ticketData.flyFrom}}</p>
      <img v-if="oneway" src="../assets/oneway-icon.svg">
      <img v-else src="../assets/round-trip-icon.svg">
      <p>{{ticketData.flyTo}}</p>    
    </div>

    <div class="ticket-vertical-divider"><div></div></div>

    <div class="ticket-full-route">
      <div class="full-route-box">
        <div class="full-route-departure-wrap">
          <p class="full-route-airport">{{ticketData.flyFrom}}</p>
          <p class="full-route-short-date">{{sliceShortDate(convertUTC(dTimeDepart))}}</p>
        </div>
        <img class="full-route-arrow" src="../assets/arrow-circle-right-solid.svg">
        <div class="full-route-stops-duration-wrap">
          <div class="full-route-stops">
            <p>{{getNumberOfStops(ticketData)}}</p>
          </div>
          <p class="full-route-duration">{{convertSeconds(ticketData.duration.departure)}}</p>
        </div>
        <img class="full-route-arrow" src="../assets/arrow-circle-right-solid.svg">
        <div class="full-route-arrival-wrap">
          <p class="full-route-airport">{{ticketData.flyTo}}</p>
          <p class="full-route-short-date">{{sliceShortDate(convertUTC(aTimeDepart))}}</p>
        </div>
      </div>
      
      <hr v-if="oneway == false" class="full-route-box-divider">
      <div v-if="oneway == false" class="full-route-box">
        <div class="full-route-departure-wrap">
          <p class="full-route-airport">{{ticketData.flyTo}}</p>
          <p class="full-route-short-date">{{sliceShortDate(convertUTC(dTimeReturn))}}</p>
        </div>
        <img class="full-route-arrow" src="../assets/arrow-circle-right-solid.svg">
        <div class="full-route-stops-duration-wrap">
          <div class="full-route-stops">
            <p>{{getNumberOfStopsReturn(ticketData)}}</p>
          </div>
          <p class="full-route-duration">{{convertSeconds(ticketData.duration.return)}}</p>
        </div>
        <img class="full-route-arrow" src="../assets/arrow-circle-right-solid.svg">
        <div class="full-route-arrival-wrap">
          <p class="full-route-airport">{{ticketData.flyFrom}}</p>
          <p class="full-route-short-date">{{sliceShortDate(convertUTC(aTimeReturn))}}</p>
        </div>
      </div>
    </div>

    <div class="ticket-airlines">
      <div class="ticket-airline" v-for="(airline,i) in airlines.slice(0, 5)" :key="i"><p>{{airline}}</p></div>
    </div>
    <div class="ticket-price">
      <h1>${{ticketData.price}}</h1>
    </div>
  </a>
</template>

<script>
/* eslint-disable */
import Api from "@/services/Api";
import { functions } from "firebase";

export default {
  props: {
    ticketData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      query: "",
      results: [],
      isOpen: false,
      oneway: Boolean,
      airlines: [],
    };
  },
  computed: {
    dTimeDepart(){
      return this.ticketData.route[0].dTime;
    },
    aTimeDepart(){
      if (this.oneway){
        return this.ticketData.route[this.ticketData.route.length-1].aTime;
      }
      var i = 0;
      while (this.ticketData.route[i].return != 1){
        i++;
      }
      return this.ticketData.route[i-1].aTime;
    },
    dTimeReturn(){
      var i = this.ticketData.route.length-1;
      while (this.ticketData.route[i].return != 0){
        i--;
      }
      return this.ticketData.route[i+1].dTime;
    },
    aTimeReturn(){
      return this.ticketData.route[this.ticketData.route.length-1].aTime;
    }
  },
  mounted() {

    const airlinesCodes = require('airlines-iata-codes');

    this.ticketData.airlines.forEach(element => {
      let airlineString = airlinesCodes.getAirlineName(element);
      airlineString = airlineString.replace('Airlines','');
      this.airlines.push(airlineString);
    });
    this.airlines = this.airlines.filter(function(item, idx) {
      return item != "";
    })
    console.log(this.airlines);

    if (this.ticketData.routes.length == 1) {
      this.oneway = true;
    } else {
      this.oneway = false;
    }

    console.log(this.ticketData.routes.length);
  },
  methods: {
    appendDecimalNumbers: function(price) {
      var char_array = price.toString().split(""); // split every single char
      var not_decimal = char_array.lastIndexOf(".");
      var numDecimals = not_decimal < 0 ? 0 : char_array.length - not_decimal;

      if (numDecimals == 0) {
        return price + ".00";
      }

      if (numDecimals == 1) {
        return price + "0";
      }
      return price;
    },
    clickTicket: function(ticket) {
      this.$root.$emit("ticketDetails", ticket);
    },
    convertUTC: function(utc) {
      return new Date(utc * 1000).toUTCString();
    },
    sliceShortDate: function(dateStr) {
      let parts = dateStr.split(" ");
      let date = parts[2] + " " + parts[1];
      return date;
    },
    getNumberOfStops: function(ticket) {
      var i = 0;

      ticket.route.forEach(element => {
        if (element.return == 0) {
          i++;
        }
      });
      i--;

      if (i == 0) {
        return "Direct";
      } else if (i == 1) {
        return i + " stop";
      } else {
        return i + " stops";
      }
    },
    getNumberOfStopsReturn: function(ticket) {
      var i = 0;

      ticket.route.forEach(element => {
        if (element.return == 1) {
          i++;
        }
      });
      i--;
      if (i == 0) {
        return "Direct";
      } else if (i == 1) {
        return i + " stop";
      } else {
        return i + " stops";
      }
    },
    convertSeconds: function(seconds) {
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
      var time = hours + "h " + minutes + "m";

      return time;
    },
  }
};
</script>