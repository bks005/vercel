<!--Still a WIP-->
<template>
  <div>
    <button type="button" v-on:click="populateTable()">Populate Table</button>
    <div id="calendarCanvas">
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedFilters", "filterData"],
  data() {
    return {
      hour: 0,
      minute: 0,
      position: 0,
      cellSize: 15,
      dayCount: 0
    }
  },
  methods : {
    populateTable() {
      document.getElementById("calendarCanvas").innerHTML = "";
      this.hour = 6;
      this.minute = 0;
      this.position = 100;
      var dayNight = "AM";
      this.dayCount = 0;
      while (this.dayCount < 5) {
        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        var dayDiv = document.createElement('div');
        var dayP = document.createElement('p');
        dayP.textContent = days[this.dayCount];
        dayP.style = "font-weight: bold; font-size: 110%; font-family: Arial, Helvetica, sans-serif; text-align: center;";
        dayDiv.style = "position: absolute; top: 0px; left: " + this.position + "px; height: 100%; width: 235px; margin: 0px; border: 1px; border-style: none solid none solid; z-index: 10;"
        document.getElementById("calendarCanvas").appendChild(dayDiv);
        dayDiv.appendChild(dayP);
        this.position += 236;
        this.dayCount += 1;
      }
      this.position = 50;
      while (this.hour < 13) {
        if (this.hour == 12) {
          dayNight = "PM";
        }
        for (let step = 0; step < 2; step++) {
          var timeDiv = document.createElement('div');
          var timeP = document.createElement('p');

          if (this.minute == 0){
            timeP.textContent = this.hour + ":" + this.minute + "0" + dayNight;
          }
          else {
            timeP.textContent = this.hour + ":" + this.minute + dayNight;
          }

          this.minute += 30;
          document.getElementById("calendarCanvas").appendChild(timeDiv);
          timeDiv.appendChild(timeP);
          timeDiv.style = "position: absolute; top: " + this.position + "px; left: 15px; height: 0px; margin: 0px;"
          timeP.style = "margin: auto; position: absolute; top: -7.5px; font-family: Arial, Helvetica, sans-serif;"
          var beam = document.createElement('div');
          beam.style = "margin: auto; position: absolute; left: 70px; width: 1250px; height: 2px; background: rgb(230, 230, 230);";
          timeDiv.appendChild(beam);
          this.position += this.cellSize*2;
          for (let step2 = 0; step2 < 2; step2++) {
            var divider = document.createElement('div');
            divider.style = "position: absolute; top: " + this.position + "px; left: 25px; width: 1275px; height: 1px; background: rgb(230, 230, 230);";
            document.getElementById("calendarCanvas").appendChild(divider);
            this.position += this.cellSize*2;
            //verticle 100px both sides and 230 width

          }
        }
        this.hour += 1;
        this.minute = 0;
      }
      this.hour = 1;
      while (this.hour < 11) {
        for (let step3 = 0; step3 < 2; step3++) {
          var timeDiv2 = document.createElement('div');
          var timeP2 = document.createElement('p');
          if (this.minute == 0){
            timeP2.textContent = this.hour + ":" + this.minute + "0" + dayNight;
          }
          else {
            timeP2.textContent = this.hour + ":" + this.minute + dayNight;
          }

          this.minute += 30;
          document.getElementById("calendarCanvas").appendChild(timeDiv2);
          timeDiv2.appendChild(timeP2);
          timeDiv2.style = "position: absolute; top: " + this.position + "px; left: 15px; height: 0px; margin: 0px;"
          timeP2.style = "margin: auto; position: absolute; top: -7.5px; font-family: Arial, Helvetica, sans-serif;"
          var beam2 = document.createElement('div');
          beam2.style = "margin: auto; position: absolute; left: 70px; width: 1250px; height: 2px; background: rgb(230, 230, 230);";
          timeDiv2.appendChild(beam2);
          this.position += this.cellSize*2;
          for (let step4 = 0; step4 < 2; step4++) {
            var divider2 = document.createElement('div');
            divider2.style = "position: absolute; top: " + this.position + "px; left: 25px; width: 1275px; height: 1px; background: rgb(230, 230, 230);";
            document.getElementById("calendarCanvas").appendChild(divider2);
            this.position += this.cellSize*2;
            //verticle 100px both sides and 230 width

          }
        }
        this.hour += 1;
        this.minute = 0;
      }
      /*var dragDiv = document.createElement('div');
      var topShift = 50;
       topShift += 48*this.cellSize;
       topShift += 2 * 12*this.cellSize;
       topShift += (35/5)*this.cellSize;
       topShift;
      dragDiv.style = "height: 150px; width: 235px; background: rgba(100, 100, 255, .8); z-index: 3000; position: absolute; top: " + 905 + "px; left: 101px";
      document.getElementById("calendarCanvas").appendChild(dragDiv);*/
      //var dragP = document.createElement('p');
      var y = 10;
      for (var x = 0; x < y; x++){
        //this.$emit('addCard');
        y;
      }
      this.createCards();
    },
    createCards() {
      //console.log(this.filterData);
      //console.log(this.selectedFilters);
      var filteredCards = [];
      var isEmpty = true;
      for (var a in this.selectedFilters) {
        if (this.selectedFilters[a] != null) {
          isEmpty = false;
        }
      }
      for (var b in this.filterData[1]) {
        var filteredCard = [];
        //console.log("Bruh");
        for (var c in this.filterData){
          filteredCard.push(this.filterData[c][b]);
        }
        //console.log(filteredCard);
        filteredCards.push(filteredCard);

      }
      //console.log(filteredCards);

      if (!isEmpty) {
        //console.log("hello?");
        var indexArray = [];
        var filters = [];
        for (var h in this.selectedFilters){
          if (this.selectedFilters[h]) {
            filters.push(this.selectedFilters[h]);
            indexArray.push(h)
          }
        }
        for (var i in filters){
          var filteredCards2 = []
          for (var j in filteredCards){
            if (filters[i] == filteredCards[j][indexArray[i]]) {
              var filteredCard2 = [];
              for (var k in filteredCards[j]){
                //console.log("hello");
                filteredCard2.push(filteredCards[j][k]);
              }
              filteredCards2.push(filteredCard2);
            }
          }
          filteredCards = filteredCards2;
        }
      }
      console.log("filteredCards: ")
      console.log(filteredCards);
      var days = this.findDays(filteredCards);
      var posArray = this.findPosition(filteredCards);
      console.log(posArray);
      this.displayCards(days, posArray)
    },
    findDays(cards) {
      var classesArray = [];
      for (var i in cards) {
        var week = [];
        if (cards[i][7]) {
          var days = [];
          var string = cards[i][7].toUpperCase();
          for (var j in string) {
            if (string[j] == 'M'){
              days.push(0);
            }
            else if (string[j] == 'T'){
              var k = parseInt(j);
              if (string[k+1] == 'H') {
                days.push(3);
              }
              else {
                days.push(1);
              }
            }
            else if (string[j] == 'W'){
              days.push(2);
            }
            else if (string[j] == 'F') {
              days.push(4);
            }
            else if (string[j] == ',') {
              week.push(days);
              days = [];
            }
          }
        }
        week.push(days);
        if (week[0].length) {
          classesArray.push(week);
        }
      }
      console.log("classesArray: ")
      console.log(classesArray);
      return classesArray;
    },
    // Creates array such as the following: {[(height, shift), (height, shift)],[(height, shift), (height, shift)]}
    findPosition(cards) {
      var thirdArray = [];
      for (var i in cards) {
        var secondArray = [];
        var firstArray = [];
        var height = 0;
        var shift = 0;
        var numString = "";
        var firstShift = "";
        var minute = 0;
        if (cards[i][8]) {
          var string = cards[i][8].toUpperCase();
          for (var j in string) {
            if (isNaN(string[j])) {
              if (string[j] == ',') {
                height = shift-firstShift;
                firstArray.push(height);
                firstArray.push(firstShift + 50);
                secondArray.push(firstArray);
                height = firstShift = shift = 0;
                firstArray = [];
              }
              else if (string[j] == 'P'){
                minute = parseInt(numString);
                shift += (minute/5)*this.cellSize;
                shift += 72*this.cellSize;
                numString = "";
              }
              else if (string[j] == 'A'){
                minute = parseInt(numString);
                shift += (minute/5)*this.cellSize;
                shift -= 6 * this.cellSize*12;
                numString = "";
              }
              else if (string[j] == ':') {
                var hour = parseInt(numString);
                if (hour == 12){
                  shift = 0;
                }
                else {
                  shift += hour * this.cellSize*12;
                }
                numString = "";
              }
              else if (string[j] == '-') {
                firstShift = shift;
                shift = 0;
                numString = "";
              }
            }
            else{
              numString += string[j];
            }
          }
          height = shift-firstShift;
          firstArray.push(height);
          firstArray.push(firstShift + 50);
          secondArray.push(firstArray);
          height = firstShift = shift = 0;
          firstArray = [];
          thirdArray.push(secondArray);
          secondArray = [];
        }
      }
      return thirdArray;
    },
    displayCards(unfilteredDays, posArray) {
      var days = unfilteredDays.filter(function (el) {
        return el != null;
      });
      console.log("days: ");
      console.log(days);
      console.log("posArray: ");
      console.log(posArray);

      var colors = ["rgba(100, 100, 255, .8)", "rgba(100, 255, 100, .8)", "rgba(255, 100, 100, .8)", "rgba(100, 255, 255, .8)", "rgba(255, 100, 255, .8)", "rgba(255, 255, 100, .8)"]
      for (var i in posArray) {
        for (var j in posArray[i]) {
          for (var k in days[i]) {
            for (var h in days[i][k]) {
              //console.log(days[i][k][h]);
              var dragDiv = document.createElement('div');
              dragDiv.style = "height: " + posArray[i][j][0] + "px; width: 235px; background: " + colors[i%6] +  " ; z-index: 3000; position: absolute; top: " + posArray[i][j][1] + "px; left: " + ((days[i][k][h]*235)+101+days[i][k][h])+"px";
              document.getElementById("calendarCanvas").appendChild(dragDiv);
              this.$emit('addCard', days);
            }
          }
        }
      }
    }
  }
}
</script>
<style>
#calendarCanvas{
  position: relative;
  width: 1350px;
  padding: 1550px 20px;
  margin: auto;
  border: 3px solid #333;
  background-color: white;
}
</style>
