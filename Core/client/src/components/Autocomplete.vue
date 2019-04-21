<template>
  <div class="autocomplete" v-bind:id="this.id">
    <input type="text" v-model="query" @input="isOpen=true" @blur="closeSuggestions" @keyup.prevent="autocomplete()" v-bind:placeholder="this.placeholder">
    <ul class="autocomplete-results" v-show="isOpen">
      <li class="autocomplete-result" v-for="(result, i) in results" :key="i" @click="setResult(result)">
         <p> {{ result }} </p>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import Api from "@/services/Api";

export default {
  props: {
    show: {
      type: Number,
      required: false,
      default: () => 5
    },
    value: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: false,
        default: () => ''
    }
  },
  data() {
    return {
      query: '',
      results: [],
      isOpen: false
    };
  },
  methods: {
    autocomplete: function() {
      Api()
        .get("/autocomplete?q=" + this.query)
        .then(response => {
          this.results = response.data.map(a => a.Combined);
        });
    },
    closeSuggestions: function () {
        var $this = this;
        this.counter({
            close() { $this.isOpen = false; }
            });
    },
    counter: function (x) {
        setTimeout(()=>{
            x.close();
        },150)
    },
    setResult: function (result) {
        this.query = result;
        this.isOpen = false;

        this.returnResult();
    },
    returnResult: function (event) {
        this.$emit("input", this.query) ;
    }
  }
};
</script>

<style lang="scss">
.autocomplete-results {
  position: absolute;
  width: 300px;
  margin-top: 5px;
  overflow: scroll;
  background-color: #fff;
  border-radius: 10px;
}

.autocomplete-result {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  text-align: left;
  height: 35px;
  cursor: pointer;

  p{
    margin: 5px;
  }
}

.autocomplete-result:hover {
  background-color: #22B4DE;
  color: white;
}
</style>