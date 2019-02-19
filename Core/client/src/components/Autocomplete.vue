<template>
  <div class="autocomplete" v-bind:id="this.id">
    <input type="text" v-model="query" @input="isOpen=true" @blur="closeSuggestions" @keyup.prevent="autocomplete()" v-bind:placeholder="this.placeholder">
    <ul class="autocomplete-results" v-show="isOpen">
      <li class="autocomplete-result" v-for="(result, i) in results" :key="i" @click="setResult(result)">
          {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
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
          this.results = response.data.map(a => a._source.Combined);
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

<style>
.autocomplete-results {
  padding: 0;
  margin: 0;
  margin-top: -5px;
  overflow: scroll;
  background-color: #fff;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #fd6b6d;
  color: white;
}
</style>