<template>
  <div>
    <!-- Logo -->
    <img src="../assets/MsideLogo.png" alt="Morningside College" id="MsideLogo"><br>
    <!-- File Upload Drop -->
    <div id="drop">
      <img src="../assets/xlogo.png" alt="Excel" id="xLogo"><br>
      <input type="file" id="fileUpload" accept=".xls,.xlsx" @change="fileUpload($event.target.files)"/>
    </div>
    <br/>
    <!-- Select which sheet to use from file -->
    <span>     Select Sheet </span><select name="sheetSelect" id="sheets" @change="setSheet()">
    </select><br/><br/>
    <!-- Hidden input that holds the JSON as a string -->
    <input id="jsonData" v-model="json" style="visibility:hidden; position:absolute;">
  </div>
</template>
<script>
import { bus } from '../main';
import XLSX from "xlsx";
export default {
  data() {
    return {
      json: "",
      sheetArray: [],
      dataArray: [],
      selectedFile: ""
    }
  },
  methods : {
    convert() {
      this.dataArray = []
      // Fills dataArray[] with data from JSON ========================
      const jsonData = JSON.parse(this.json);
      for (var x in jsonData){
        var keys = Object.keys(jsonData[x]);
        for (var key in keys){
          var newkey = true;
          for (var y in this.dataArray) {if (this.dataArray[y][0] == keys[key]) {newkey = false;}}
          if (newkey){
            this.dataArray.splice(key, 0, [keys[key]]);
            for (var i = 0; i < x; i++) {this.dataArray[key].push(undefined);}
          }
        }
        for (y in this.dataArray) {this.dataArray[y].push(jsonData[x][this.dataArray[y][0]]);}
      }
      //Checks the data and makes sure it has the correct format
      this.dataArray = this.checkData()
      //this sends the data to the filters component
      var sendArray = [];
      for (var j in this.dataArray) {sendArray.push(this.dataArray[j]);} //Creating a new array this way because binding will cause it to break
      bus.$emit('filterDataChanged', sendArray);
      //===============================================================
    },
    checkData() {
      //This is the format for the sheet
      var checkArray = ["ROW", "TERM", "COURSE", "TITLE.1",
                        "TITLE.2", "O.CRED", "ENROLLED", "MAX.CAP",
                        "O.DAY", "O.TIME", "O.BLDG.ROOM", "INSTR.NAME",
                        "PRE.REQ", "FREE.SCHED.NOTES", "REG.MEMO", "IC.PRE.REQ"];
      //This will be returned and replace dataArray with a sorted version
      var newDataArray = [];
      //Holds boolean values to determine whether the columns exist
      var boolArray = [];
      for (var i = 0; i < 16; i++) boolArray.push(false);
      for (var j in this.dataArray) {
        for (var k in checkArray) {
          //If they exist, change bool to true and push onto newDataArray
          if (this.dataArray[j][0].toUpperCase() == checkArray[k]) {
            newDataArray.push(this.dataArray[k]);
            boolArray[k] = true;
          }
        }
      }
      //In the case that there are missing columns, an alert will be sent telling the user
      var alertString = "";
      for (var l in boolArray) {
        if (boolArray[l] == false) {
          alertString += checkArray[l];
          alertString += " ";
        }
      }
      if (alertString != "") {
        alert("Your sheet is missing the following item(s): " + alertString);
      }
      //Returning the sorted array
      return newDataArray;
    },

    fileUpload() {
      var selectedFile = event.target.files[0];
      var sheetArray = [];
      if (selectedFile) {

        //Empties the #sheets select and adds first option
        var length = document.getElementById("sheets").options.length;
        for (var i = length-1; i >= 0; i--) {document.getElementById("sheets").options[i] = null;}
        var option = document.createElement("option");
        option.text = "None Selected";
        option.value = null;
        document.getElementById("sheets").add(option);

        //Now it does other stuff, I can add more comments if you guys want
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          var data = event.target.result;
          var workbook = XLSX.read(data, {
            type: "binary"
          });
          var i = 0;
          for (var sheetName in workbook.SheetNames){
            option = document.createElement("option");
            option.text = workbook.SheetNames[sheetName];
            option.value = i;
            document.getElementById("sheets").add(option);
            i += 1;
          }
          workbook.SheetNames.forEach(sheet => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            let jsonObject = JSON.stringify(rowObject);
            sheetArray.push(jsonObject)
            console.log("Parsed sheet!");
            document.getElementById("jsonData").value = sheetArray[document.getElementById("sheets").value];
            var inputEvent = new Event('input', { bubbles: true, cancelable: true,});
            document.getElementById("jsonData").dispatchEvent(inputEvent);
          });
        };
        fileReader.readAsBinaryString(selectedFile);
      }
      this.sheetArray = sheetArray;
    },
    setSheet(){

        //This sets which JSON object we will use and then calls convert()
        if (document.getElementById("sheets").value != "null"){
          document.getElementById("jsonData").value = this.sheetArray[document.getElementById("sheets").value];
          var inputEvent = new Event('input', { bubbles: true, cancelable: true,});
          document.getElementById("jsonData").dispatchEvent(inputEvent);
          this.convert();
        }
      }
  }
}
</script>
<style>
/* CSS for logo and file upload drop */
  #MsideLogo {
    width: 40%;
    padding: 8px;
  }
  #xLogo {
    width: 10%;
    padding: 8px;
  }
  #drop{
        border:4px dashed #60121A;
        -moz-border-radius:5px;
        -webkit-border-radius:5px;
        border-radius:5px;
        padding:25px;
        text-align:center;
        font:20pt bold,"Vollkorn";color:green;
        background-color: #8AB880;

    }
</style>
