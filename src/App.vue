<template>
  <!-- This is the entire page -->
  <div id="app">
    <!-- Notice bound data and event functions -->
    <app-controls></app-controls>

    <app-filters
    v-bind:selectedFilters="selectedFilters"
    v-on:changedSelectedFilters="updateSelectedFilters($event)"
    v-on:changedFilterData="updateFilterData($event)"
    ></app-filters>

    <app-card v-on:addCard="addCard($event)"></app-card>

    <div ref="container"></div>

    <app-table
    v-bind:filterData="filterData"
    v-bind:selectedFilters="selectedFilters"
    v-on:addCard="addCard($event)"
    ></app-table>

  </div>
</template>

<script>
import Vue from 'vue'
import Card from './components/Card.vue'
export default {
  data() {
    return {
      filterData: [],
      selectedFilters: [],
      name: "Added"
    }
  },
  methods: {
    //this is the event trigger from the emit in Filters
    updateSelectedFilters: function(updatedSelectedFilters) {
      this.selectedFilters = updatedSelectedFilters;
      console.log(this.selectedFilters);

    },
    updateFilterData: function(updatedFilterData){
      this.filterData = updatedFilterData;
      console.log(this.filterData);
    },
    addCard: function(days) {
      var ComponentClass = Vue.extend(Card);
      var instance = new ComponentClass({
        propsData: { name: 'Added' }
      })
      try {instance.term = this.filterData[1][1];}
      catch{return;}
      try{instance.course = this.filterData[2][1];}
      catch{return;}
      try{instance.title1 = this.filterData[3][1];}
      catch{return;}
      try{instance.title2 = this.filterData[4][1];}
      catch{return;}
      try{instance.cred = this.filterData[5][1];}
      catch{return;}
      try{instance.enrolled = this.filterData[6][1];}
      catch{return;}
      try{instance.maxCap = this.filterData[7][1];}
      catch{return;}
      try{instance.day = this.filterData[8][1];}
      catch{return;}
      try{instance.time = this.filterData[9][1];}
      catch{return;}
      try{instance.room = this.filterData[10][1];}
      catch{return;}
      try{instance.name = this.filterData[11][1];}
      catch{return;}
      try{instance.preReq = this.filterData[12][1];}
      catch{return;}
      try{instance.notes = this.filterData[13][1];}
      catch{return;}
      try{instance.memo = this.filterData[14][1];}
      catch{return;}
      try{instance.icPreReq = this.filterData[15][1];}
      catch{return;}

      console.log(this.$refs.container)
      instance.$mount();
      this.$refs.container.appendChild(instance.$el)
      console.log(days);
    }
  }
}
</script>

<style>

</style>
