<template>
  <div>
    <div id="selects"></div><br><br> <!-- Div that holds all the selects -->
  </div>
</template>

<script>
import { bus } from '../main';
export default {
  data() {
    return {
      tempFilterData: [], //a temporary array that is manipulated without changing filterData
      selectIds: [],      //stores the ids of the selects elements
      chosenFilters: []   //stores the chosen filters
    }
  },
  methods : {
    updateFilters(filterData) {
      this.selectIds = []; //clears the array so that we write instead of append

      this.tempFilterData = filterData; //sets tempFilterData to filterData
      this.tempFilterData.shift();      //removes the row array

      var tempFill = new Array(filterData.length).fill(null); //creating an array at length of filterData filled with null
      this.chosenFilters = tempFill;                          //this prepares chosenFilters to be edited

      document.getElementById("selects").innerHTML = "" //clears div so that we write instead of append

      //creates select tags dynamically
      for (var filterIndex in this.tempFilterData){
        //groups the selects into groups of 4
        if (filterIndex != 0){
          if (filterIndex%4 == 0){
            var breakDiv = document.createElement('div');
            breakDiv.innerHTML = "<br>".repeat(3);
            document.getElementById("selects").appendChild(breakDiv);
          }
        }

        //creates new select element and then sets id and adds it to the selectIds array
        var select = document.createElement("select");
        select.id = "select" + filterIndex;
        this.selectIds.push("select" + filterIndex);

        //event listener for when a select's value is chnaged
        select.addEventListener('change', (event) => {
          var value = `${event.target.value}`;
          var targetId = `${event.target.id}`;
          var idIndex = this.selectIds.indexOf(targetId);
          if (value == "null"){
            value = null;
          }
          tempFill[idIndex] = value;
          this.chosenFilters = tempFill;
          this.$emit('changedSelectedFilters', this.chosenFilters);
        });

        //sets filter title
        var titleSpan = document.createElement("span");
        titleSpan.textContent = this.tempFilterData[filterIndex][0] + ": ";

        //adds a little bit of space between selects
        var spaceSpan = document.createElement("span");
        spaceSpan.textContent = "   ";

        //colors every other select a different color
        if (filterIndex%2 == 0){
          titleSpan.style = " padding-top:5px; padding-bottom:5px; "
          select.style = "background:#e6e6e6; width:20%; max-width:10%; padding-top:5px; padding-bottom:5px;"
        }
        else{
          titleSpan.style = " padding-top:5px; padding-bottom:5px;"
          select.style = "background:#c9c9c9; width:20%; max-width:10%; padding-top:5px; padding-bottom:5px;"
        }

        //adds the elements to the page
        document.getElementById("selects").appendChild(titleSpan);
        document.getElementById("selects").appendChild(select);
        document.getElementById("selects").appendChild(spaceSpan);

        //removes first element of array which is the title
        this.tempFilterData[filterIndex].shift()

        //removes duplicate items and then sorts
        let options = this.tempFilterData[filterIndex].filter((item, i, ar) => ar.indexOf(item) === i);
        options.sort()

        //removes the null value
        for (var index in options){
          if (!options[index]){
            options.splice(index, 1);
          }
        }

        //adds first option to select with null value
        var option = document.createElement("option");
        option.text = "Not Selected";
        option.value = null;
        select.add(option);

        //adds the rest of the options
        index = 0;
        for (index in options) {
          option = document.createElement("option");
          option.text = options[index];
          option.value = options[index];
          select.add(option);
        }
      }
      //Updates filterData and chosenFilters
      this.$emit('changedFilterData', filterData);
      this.$emit('changedSelectedFilters', this.chosenFilters);

    }
  },
  created(){
    bus.$on('filterDataChanged', (data) => {
      this.updateFilters(data);
    })
  }

}
</script>
<style>
/* This is so the white space inbetween the selects doesn't get ignored */
span {
  white-space: pre-wrap;
}
</style>
