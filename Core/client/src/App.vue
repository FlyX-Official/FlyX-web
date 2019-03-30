<template>
  <div id="app">
    <LandingPage/>

    <!--<router-view/>-->
    <!--  <div class="grid-container">
      <Nav />
      <Tickets />
      <Map />
    </div>-->
  </div>
</template>

<script>
/* import Nav from './components/Nav'
import Tickets from './components/Tickets'
import Map from './components/Map' */
import LandingPage from "./pages/LandingPage";

export default {
  name: "App",
  components: {
    LandingPage
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
