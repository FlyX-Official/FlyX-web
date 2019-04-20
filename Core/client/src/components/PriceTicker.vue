<template>
  <div class="ticker" v-bind:id="this.id">
    <div class="ticker-head">
      <h1>{{this.from}}</h1>
      <img src="@/assets/plane.svg" alt>
      <h1>{{this.to}}</h1>
    </div>
    <div class="ticker-body">
      <div class="ticker-ticket" v-for="(ticket,i) in tickets" :key="i">
        <div id="ticker-ticket-info">
          <p>{{ticket.flyFrom}}</p>
          <img src="@/assets/arrow-right-solid.svg" alt>
          <p>{{ticket.flyTo}}</p>
        </div>
        <div id="ticker-ticket-price">
          <p>${{ticket.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

// We have to import our base URL connection to the server first.
// (This is done using Axios...view the Api.js file to see this)
import Api from "@/services/Api";
var moment = require("moment");

export default {
  props: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      searchData: {
        oneWay: true,
        from: "Los Angeles - LAX",
        to: "New York - JFK",
        radiusFrom: "50",
        radiusTo: "50",
        departureWindow: {
          start: "2019-4-20",
          end: "2019-4-20"
        },
        returnDepartureWindow: {
          start: new Date(),
          end: new Date()
        }
      },
      tickets: []
    };
  },
  mounted() {
    this.send();
  },
  methods: {
    // This is the function that sends a post request containing 'searchData' to the server
    send: function() {
      // do post request
      Api()
        .get("/priceticker?airportFrom=" + this.from)
        .then(response => {
          this.tickets = response.data.data;
        })
        .catch(error => {
          // This catches any error the server would send back
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.ticker {
  display: grid;
  width: 300px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 20px 15px -6px rgba(0, 0, 0, 0.19);
  background-color: #fff;
  grid-template-columns: 1fr;
  grid-auto-rows: 80px 370px;
  grid-template-areas:
    "head"
    "body";

  .ticker-head {
    grid-area: head;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2ed199;
    color: #fff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    h1 {
      font-size: 40px;
      font-family: 'Nunito', sans-serif;
    }
    img {
      width: 30px;
      margin: 0 20px;
    }
  }
  .ticker-body {
    grid-area: body;

    .ticker-ticket {
      display: grid;
      grid-template-columns: 0.7fr 0.3fr;
      grid-template-rows: 1fr;
      grid-template-areas: "info price";
      width: 100%;
      height: 35px;
      border-bottom: 1px solid #d8d8d8;
      cursor: not-allowed;

      &:last-child{
        border: none;
      }
      &:hover{
        background-color: #f9f9f9;
      }

      #ticker-ticket-info {
        grid-area: info;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 20px;
        user-select: none;
        img {
          height: 20px;
          margin: 0 10px;
        }
        p {
          font-size: 25px;
          font-weight: 800;
        }
      }
      #ticker-ticket-price {
        grid-area: price;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;
        user-select: none;
        p{
          font-size: 25px;
          font-weight: 600;
          color: #FF6B6B;
        }
      }
    }
  }
}
</style>

