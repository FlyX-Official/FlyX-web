<template>
  <div class="grid-container">
    <Nav/>
    <Tickets/>
    <Map/>
  </div>
</template>

<script>
/* eslint-disable */
import Nav from "@/components/Nav";
import Tickets from "@/components/Tickets";
import Map from "@/components/Map";

export default {
  name: "AppPage",
  components: {
    Nav,
    Tickets,
    Map
  }
};
</script>

<style lang="scss">
@import "@/assets/AppPageStyles.scss";
</style>
