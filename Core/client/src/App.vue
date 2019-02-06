<template>
  <div id="app">
    <!--<router-view/>-->
    <div class="grid-container">
      <Nav />
      <Tickets />
      <Map />
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Tickets from './components/Tickets'
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Nav, Tickets, Map
  }
}

</script>

<style lang="scss">
  @import './assets/styles.scss';

</style>
