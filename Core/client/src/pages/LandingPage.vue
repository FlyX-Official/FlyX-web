<template>
  <div id="page-container">
    <div class="nav">
      <div id="logo-wrap">
        <h1 id="logo">FlyX</h1>
      </div>
      <div id="nav-link-wrap">
        <h2>How It Works</h2>
        <h2>Get Started</h2>
        <h2 @click="signIn()">Sign In</h2>
      </div>
    </div>
    <div class="top-grid-container">
      <div class="text-left">
        <h1>Multiple Days.</h1>
        <h1>Multiple Airports.</h1>
        <h1>One Search.</h1>
      </div>
      <div class="phone-graphic-right">
        <img src="../assets/phone_radius_search.svg" alt="not working">
      </div>
      <div class="beta-mid">
        <div id="beta-btn" @click="register()">
          <p>Apply For Beta Access</p>
        </div>
      </div>
    </div>


    <sweet-modal title="Sign Up" ref="registerModal" overlay-theme="dark">
      <div class="register-container">

      </div>
      <template slot="box-action">
        <a class="alt-option" @click="signIn()">Already Registered?</a>
      </template>
    </sweet-modal>

    <sweet-modal title="Sign In" ref="signInModal" overlay-theme="dark">
      <div class="signIn-container">
        
      </div>
      <template slot="box-action">
        <a class="alt-option" @click="register()">Not Registered?</a>
      </template>
    </sweet-modal>


  </div>
</template>

<script>
/* eslint-disable */


  import Api from '@/services/Api'
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: {
      SweetModal
    },
    data() {
      return {
      }
    },
    methods: {
      // This is the function that sends a post request containing 'searchData' to the server
      send: function () {
        

        // do post request
        Api().post('/search', this.searchData)
          .then(response => {

            console.log(response.data.data);

            // This line sends(emits) the ticket data as an event. Other components
            // can listen for this event to have access to the data that is sent.
            this.$root.$emit('ticketComm', response.data.data);
          })
          .catch(error => {
            // This catches any error the server would send back
            console.log(error);
          });
      }, 
      register: function () {
        this.$refs.signInModal.close();
        this.$refs.registerModal.open();
      },
      signIn: function () {
        this.$refs.registerModal.close();
        this.$refs.signInModal.open();
      },
    }
  }
</script>

<style lang="scss">
@import "../assets/LandingPageStyles.scss";
</style>

