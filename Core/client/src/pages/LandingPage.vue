<template>
  <div id="page-container">
    <div class="nav">
      <div id="logo-wrap">
        <h1 id="logo">FlyX</h1>
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
        <img src="../assets/phone_radius_search.svg" alt="not working">
      </div>
      <div class="beta-mid">
        <div id="beta-btn" @click="openRegisterModal()">
          <p>Apply For Beta Access</p>
        </div>
      </div>
    </div>

    <sweet-modal ref="tabbedModal" overlay-theme="dark">
      <sweet-modal-tab title="Sign Up" id="tab1">
        <div class="signIn-register-container">
          <div class="left">
            <form id="register-form" @submit.prevent="submitRegister()">
              <input type="text" v-model="registerData.username" class="signIn-register-input" required placeholder="Username">
              <input
                type="email"
                v-model="registerData.emailAddr"
                class="signIn-register-input"
                required
                placeholder="Email Address"
              >
              <input type="password" v-model="registerData.password" class="signIn-register-input" required placeholder="Password">
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
            <img src="../assets/google_sign_in.svg" alt="not working">
            <img src="../assets/google_sign_in.svg" alt="not working">
            <img src="../assets/google_sign_in.svg" alt="not working">
            <img src="../assets/google_sign_in.svg" alt="not working">
          </div>
        </div>
      </sweet-modal-tab>
      <sweet-modal-tab title="Sign In" id="tab2" >
        <div class="signIn-register-container">
          <div class="left">
            <form id="signIn-form" @submit.prevent="submitSignIn()">
              <input
                type="email"
                v-model="signInData.username"
                class="signIn-register-input"
                required
                placeholder="Email Address"
              >
              <input type="password" v-model="signInData.password" class="signIn-register-input" required placeholder="Password">
              <button class="signIn-register-submit-btn" type="submit">Sign In</button>
            </form>
          </div>
          <div class="right">
            <img src="../assets/google_sign_in.svg" alt="not working">
            <img src="../assets/google_sign_in.svg" alt="not working">
            <img src="../assets/google_sign_in.svg" alt="not working">
            <img src="../assets/google_sign_in.svg" alt="not working">
          </div>
        </div>
      </sweet-modal-tab>
    </sweet-modal>
  </div>
</template>

<script>
/* eslint-disable */

import Api from "@/services/Api";
import { SweetModal,SweetModalTab } from "sweet-modal-vue";

export default {
  components: {
    SweetModal,
    SweetModalTab
  },
  data() {
    return {
      registerData: {
        username: '',
        emailAddr: '',
        password: '',
        confirmPassword: ''

      },
      signInData: {
        emailAddr: '',
        password: '',
      }
    };
  },
  methods: {
    openRegisterModal: function () {
      this.$refs.tabbedModal.open('tab1');
    },
    openSignInModal: function () {
      this.$refs.tabbedModal.open('tab2');
    },
    submitRegister: function() {
      // Your firebase code here

      // How to access registration input: 
      this.registerData.username;

      alert('Called "submitRegister()" function');
    },
    submitSignIn: function() {
      // Your firebase code here

      // How to access sign in input: 
      this.signInData.username;

      alert('Called "submitSignIn()" function');
    }
  }
};
</script>

<style lang="scss">
@import "../assets/LandingPageStyles.scss";
</style>

