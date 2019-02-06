<template>
  <div id="app" class="container">

    <form @submit.prevent="search()">
      <input type="text" 
        v-model="searchData.query" />
        <input type="number" 
        v-model="searchData.radius" />
        <input type="submit" value="Go">
      </form>
    
    <div v-if="data" v-for="(value, index) in data" 
      :key="index"
      :ref="`card_${index}`"
         class="card">

         <div class="location">
           <p>Location: {{value._source.Origin}}</p>
           <p>Geohash: {{value._source.location}}</p>

           <p>AirportCode: {{value._source.AirportCode}}</p>
         </div>
    </div>
</div>
</template>


<script>
/* eslint-disable */
export default {
  data() {
    return {
      searchData:{
        query: '',
        radius:'',
      },
      data: []
    }
  },
  methods: {
    search() {
        this.axios.post('http://localhost:5000/search', this.searchData)
              .then(response => {
                this.data = response.data;
                console.log(this.data);
          })
    }
  }
}
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
}
body {
  width: 100vw;
  height: 100vh;
}
form{
  margin-bottom: 100px;
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  overflow: scroll;
}
.card{
  width: 400px;
  border: 1px solid black;
  margin: 5px;
}
p{
  font-size: 20px;
}

</style>

