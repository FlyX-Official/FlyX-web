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
        <h1>One Click.</h1>
      </div>
      <div class="phone-graphic-right">
        <img src="@/assets/phone_radius_search.svg" alt="not working" />
      </div>
      <div class="beta-mid">
        <div id="beta-btn" @click="openRegisterModal()">
          <p>Apply For Beta Access</p>
        </div>
      </div>
      <div class="wave-container">
        <img src="@/assets/wave.svg" alt />
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

    <sweet-modal ref="tabbedModal" width="350px" overlay-theme="dark">
      <sweet-modal-tab title="Sign Up" id="tab1">
        <div class="signIn-register-container">
          <form id="register-form" @submit.prevent="submitRegister()">
            <b-field>
              <b-input
                placeholder="Full Name"
                v-model="registerData.name"
                type="text"
                icon="user-edit"
                required
              ></b-input>
            </b-field>
            <b-field>
              <b-input
                placeholder="Email"
                v-model="registerData.email"
                required
                type="email"
                icon="envelope"
              ></b-input>
            </b-field>
            <b-field
              :type="{ 'is-danger': isPasswordErr }"
              :message="[
                { 'Password must have at least 8 characters': minLengthErr },
                { 'Password must have at most 50 characters': maxLengthErr },
                { 'Password must contain uppercase letters': hasUppercaseErr },
                { 'Password must contain lowercase letters': hasLowercaseErr },
                { 'Password must contain digits': hasDigitsErr },
                { 'Password must not contain spaces': noSpacesErr },
                { 'Your password has been blacklisted': blacklistErr },
            ]"
            >
              <b-input
                type="password"
                v-model="registerData.password"
                required
                placeholder="Password"
                icon="key"
                password-reveal
              ></b-input>
            </b-field>
            <b-field
              :type="{ 'is-danger': passwordsNoMatchErr}"
              :message="{ 'Passwords do not match': passwordsNoMatchErr }"
            >
              <b-input
                type="password"
                v-model="registerData.confirmPassword"
                required
                placeholder="Confirm Password"
                icon="key"
                password-reveal
              ></b-input>
            </b-field>
            <b-field>
              <b-button
                class="is-fullwidth is-secondary"
                size="is-medium"
                native-type="submit"
              >Register</b-button>
            </b-field>
          </form>
          <div class="provider-btn-wrap">
            <b-button
              @click="submitSignInSocial('google')"
              class="provider-btn is-google"
              size="is-medium"
              icon-left="google"
              icon-pack="fab"
            ></b-button>
            <b-button
              @click="submitSignInSocial('facebook')"
              class="provider-btn is-facebook"
              size="is-medium"
              icon-left="facebook"
              icon-pack="fab"
            ></b-button>
            <b-button
              @click="submitSignInSocial('twitter')"
              class="provider-btn is-twitter"
              size="is-medium"
              icon-left="twitter"
              icon-pack="fab"
            ></b-button>
            <b-button
              @click="submitSignInSocial('github')"
              class="provider-btn is-github"
              size="is-medium"
              icon-left="github"
              icon-pack="fab"
            ></b-button>
          </div>
        </div>
      </sweet-modal-tab>
      <sweet-modal-tab title="Sign In" id="tab2">
        <div class="signIn-register-container">
          <form id="signIn-form" @submit.prevent="submitSignIn()">
            <b-field>
              <b-input
                placeholder="Email"
                v-model="signInData.email"
                required
                type="email"
                icon="envelope"
              ></b-input>
            </b-field>
            <b-field>
              <b-input
                type="password"
                v-model="signInData.password"
                required
                placeholder="Password"
                icon="key"
                password-reveal
              ></b-input>
            </b-field>
            <b-field>
              <b-button
                class="is-fullwidth is-secondary"
                size="is-medium"
                native-type="submit"
              >Sign In</b-button>
            </b-field>
            <!-- <input
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
            <button class="signIn-register-submit-btn" type="submit">Sign In</button>-->
          </form>
          <div class="provider-btn-wrap">
            <b-button
              @click="submitSignInSocial('google')"
              class="provider-btn is-google"
              size="is-medium"
              icon-left="google"
              icon-pack="fab"
            ></b-button>
            <b-button
              @click="submitSignInSocial('facebook')"
              class="provider-btn is-facebook"
              size="is-medium"
              icon-left="facebook"
              icon-pack="fab"
            ></b-button>
            <b-button
              @click="submitSignInSocial('twitter')"
              class="provider-btn is-twitter"
              size="is-medium"
              icon-left="twitter"
              icon-pack="fab"
            ></b-button>
            <b-button
              @click="submitSignInSocial('github')"
              class="provider-btn is-github"
              size="is-medium"
              icon-left="github"
              icon-pack="fab"
            ></b-button>
          </div>
          <a id="sign-in-forgot-password" @click="clickResetPasswordLink()">Forgot Password?</a>

          <hr v-if="isResetPassword" style="border-top: 1px solid #979797" />
          <form v-if="isResetPassword" @submit.prevent="submitResetPassword()">
            <b-field>
              <b-input
                placeholder="Email"
                v-model="resetPasswordEmail"
                required
                type="email"
                icon="envelope"
                expanded
              ></b-input>
            </b-field>

            <b-field>
              <b-button class="is-fullwidth is-accent" native-type="submit">Reset Password</b-button>
            </b-field>
          </form>
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
import passwordValidator from 'password-validator';

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
      },
      resetPasswordEmail: "",
      minLengthErr: false,
      maxLengthErr: false,
      hasUppercaseErr: false,
      hasLowercaseErr: false,
      hasDigitsErr: false,
      noSpacesErr: false,
      blacklistErr: false,
      passwordsNoMatchErr: false,
      schema: null,
      isPasswordErr: false,
      isResetPassword: false
    };
  },
  mounted() {
    // Create a password schema
    this.schema = new passwordValidator();

    // Add properties to it
    this.schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(50) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(["Passw0rd", "Password1", "Password12", "Password123"]); // Blacklist these values

    // console.log(this.schema.validate("Passw0rd", { list: true }));
  },
  methods: {
    openRegisterModal: function() {
      this.$refs.tabbedModal.open("tab1");
    },

    openSignInModal: function() {
      this.$refs.tabbedModal.open("tab2");
    },

    submitRegister: function() {
      // Get list of error that password triggers (validate password)
      var errList = this.schema.validate(this.registerData.password, {
        list: true
      });

      console.log(errList);

      // if password & confirm password do not match
      if (this.registerData.password != this.registerData.confirmPassword) {
        this.passwordsNoMatchErr = true;
      } else {
        this.passwordsNoMatchErr = false;
      }

      // if password contains no errors && confirmPassword matches
      if (errList.length == 0 && !this.passwordsNoMatchErr) {
        this.resetPasswordErrors();
        this.$refs.tabbedModal.close();
        this.$store.dispatch("register", this.registerData);
        this.registerData = {};
        this.signInData = {};
      } else {
        this.isPasswordErr = true;
        this.triggerPasswordErrors(errList);
      }
    },

    submitSignIn: function() {
      this.$refs.tabbedModal.close();
      this.$store.dispatch("signIn", this.signInData);
      this.registerData = {};
      this.signInData = {};
    },
    submitSignInSocial: function(social) {
      this.$refs.tabbedModal.close();
      this.$store.dispatch("signInWithSocial", social);
      this.registerData = {};
      this.signInData = {};
    },
    triggerPasswordErrors: function(errList) {
      if (errList.includes("min")) {
        this.minLengthErr = true;
      } else {
        this.minLengthErr = false;
      }

      if (errList.includes("max")) {
        this.maxLengthErr = true;
      } else {
        this.maxLengthErr = false;
      }

      if (errList.includes("uppercase")) {
        this.hasUppercaseErr = true;
      } else {
        this.hasUppercaseErr = false;
      }

      if (errList.includes("lowercase")) {
        this.hasLowercaseErr = true;
      } else {
        this.hasLowercaseErr = false;
      }

      if (errList.includes("digits")) {
        this.hasDigitsErr = true;
      } else {
        this.hasDigitsErr = false;
      }

      if (errList.includes("spaces")) {
        this.noSpacesErr = true;
      } else {
        this.noSpacesErr = false;
      }

      if (errList.includes("oneOf")) {
        this.blacklistErr = true;
      } else {
        this.blacklistErr = false;
      }
    },
    resetPasswordErrors: function() {
      this.minLengthErr = false;
      this.maxLengthErr = false;
      this.hasUppercaseErr = false;
      this.hasLowercaseErr = false;
      this.hasDigitsErr = false;
      this.noSpacesErr = false;
      this.blacklistErr = false;
      this.passwordsNoMatchErr = false;
      this.isPasswordErr = false;
    },
    clickResetPasswordLink: function() {
      if (this.isResetPassword) {
        this.isResetPassword = false;
      } else {
        this.isResetPassword = true;
      }
    },
    submitResetPassword: function() {
      this.$refs.tabbedModal.close();
      this.$store.dispatch("resetPassword", this.resetPasswordEmail);
      this.resetPasswordEmail = "";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/LandingPageStyles.scss";
</style>

