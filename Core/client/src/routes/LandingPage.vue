<template>
  <div id="page-container">
    <div class="nav">
      <div id="logo-wrap">
        <a href="/">
          <h1 id="logo">FlyX</h1>
          <!-- <img src="@/assets/logo-hexagon.svg" alt=""> -->
        </a>
      </div>
      <div id="nav-link-wrap">
        <h2>How It Works</h2>
        <h2>Get Started</h2>
        <h2 @click="openSignInModal()">Sign In</h2>
      </div>
    </div>
    <div class="top-grid-container">
      <div class="text-left">
        <h1>Multiple Days.</h1>
        <h1>Multiple Airports.</h1>
        <h1>One Search.</h1>
      </div>
      <div class="phone-graphic-right">
        <img src="@/assets/phone_radius_search.svg" alt="not working">
      </div>
      <div class="beta-mid">
        <div id="beta-btn" @click="openRegisterModal()">
          <p>Apply For Beta Access</p>
        </div>
      </div>
      <div class="wave-container">
        <img src="@/assets/wave.svg" alt>
      </div>
    </div>
    <div class="ticker-grid-container">
      <div id="ticker1-wrap" class="ticker-wrap">
        <PriceTicker id="ticker1" from="LAX" to="JFK"></PriceTicker>
      </div>
      <div id="ticker2-wrap" class="ticker-wrap">
        <PriceTicker id="ticker2" from="LGA" to="ORD"></PriceTicker>
      </div>
      <div id="ticker3-wrap" class="ticker-wrap">
        <PriceTicker id="ticker3" from="SFO" to="LAX"></PriceTicker>
      </div>
      <div id="ticker-info-wrap">
        <!--<h1>This is a title</h1>-->
      </div>
    </div>

    <sweet-modal ref="tabbedModal" overlay-theme="dark">
      <sweet-modal-tab title="Sign Up" id="tab1">
        <div class="signIn-register-container">
          <div class="left">
            <form id="register-form" @submit.prevent="submitRegister()">
              <input
                type="text"
                v-model="registerData.name"
                class="signIn-register-input"
                required
                placeholder="Full Name"
              >
              <input
                type="email"
                v-model="registerData.email"
                class="signIn-register-input"
                required
                placeholder="Email Address"
              >
              <input
                type="password"
                v-model="registerData.password"
                class="signIn-register-input"
                required
                placeholder="Password"
              >
              <input
                type="password"
                v-model="registerData.confirmPassword"
                class="signIn-register-input"
                required
                placeholder="Re-Type Password"
              >
              <button class="signIn-register-submit-btn" type="submit">Register</button>
            </form>
          </div>
          <div class="right">
            <img @click="submitSignInSocial('google')" src="@/assets/google_sign_in.svg">
            <img @click="submitSignInSocial('facebook')" src="@/assets/facebook_sign_in.svg">
            <img @click="submitSignInSocial('twitter')" src="@/assets/twitter_sign_in.svg">
            <img @click="submitSignInSocial('github')" src="@/assets/github_sign_in.svg"> 
          </div>
        </div>
      </sweet-modal-tab>
      <sweet-modal-tab title="Sign In" id="tab2">
        <div class="signIn-register-container">
          <div class="left">
            <form id="signIn-form" @submit.prevent="submitSignIn()">
              <input
                type="email"
                v-model="signInData.email"
                class="signIn-register-input"
                required
                placeholder="Email Address"
              >
              <input
                type="password"
                v-model="signInData.password"
                class="signIn-register-input"
                required
                placeholder="Password"
              >
              <button class="signIn-register-submit-btn" type="submit">Sign In</button>
            </form>
          </div>
          <div class="right">
            <img @click="submitSignInSocial('google')" src="@/assets/google_sign_in.svg">
            <img @click="submitSignInSocial('facebook')" src="@/assets/facebook_sign_in.svg">
            <img @click="submitSignInSocial('twitter')" src="@/assets/twitter_sign_in.svg">
            <img @click="submitSignInSocial('github')" src="@/assets/github_sign_in.svg"> 
          </div>
        </div>
      </sweet-modal-tab>
    </sweet-modal>
  </div>
</template>

<script>
/* eslint-disable */

import Api from "@/services/Api";
import PriceTicker from "@/components/PriceTicker";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
import firebase, { functions } from "firebase/app";
import "firebase/auth";

export default {
  name: "LandingPage",
  components: {
    SweetModal,
    SweetModalTab,
    PriceTicker
  },
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      signInData: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    
  },
  methods: {
    openRegisterModal: function() {
      this.$refs.tabbedModal.open("tab1");
    },

    openSignInModal: function() {
      this.$refs.tabbedModal.open("tab2");
    },

    submitRegister: function() {
      this.$refs.tabbedModal.close();
      this.$store.dispatch('register', this.registerData);
    },

    submitSignIn: function() {
      this.$refs.tabbedModal.close();
      this.$store.dispatch('signIn', this.signInData);
    },
    submitSignInSocial: function(social) {
      this.$refs.tabbedModal.close();
      this.$store.dispatch('signInWithSocial', social);
    },
    alertVerifyEmail: function() {
      this.$snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/LandingPageStyles.scss";
</style>

