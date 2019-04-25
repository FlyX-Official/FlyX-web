<template>
  <div @click="clickTicket(ticketData)" class="ticket">
    <div class="ticket-hover-color"></div>
    <div class="ticket-short-route">
      <p>{{ticketData.flyFrom}}</p>
      <img v-if='oneway' src="../assets/oneway-icon.svg">
      <img v-else src="../assets/round-trip-icon.svg">
      <p>{{ticketData.flyTo}}</p>
    </div>
    <div class="ticket-full-route"></div>
    <div class="ticket-airlines"></div>
    <div class="ticket-price">
      <h1>${{appendDecimalNumbers(ticketData.price)}}</h1>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Api from "@/services/Api";

export default {
  props: {
    ticketData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      query: '',
      results: [],
      isOpen: false,
      oneway: Boolean,
    };
  },
  mounted() {
    if (this.ticketData.routes.length == 1){
      this.oneway = true;
    }else{
      this.oneway = false;
    }

    console.log(this.ticketData.routes.length);
  },
  methods: {
    appendDecimalNumbers: function (price) {
      var char_array = price.toString().split(""); // split every single char
      var not_decimal = char_array.lastIndexOf(".");
      var numDecimals = (not_decimal<0)?0:char_array.length - not_decimal;

      if (numDecimals == 0){
        return price + '.00';
      }

      if (numDecimals == 1){
        return price + '0';
      }
      return price;
    },
    clickTicket: function (ticket) {
      this.$root.$emit("ticketDetails", ticket);
    }
  }
};
</script>