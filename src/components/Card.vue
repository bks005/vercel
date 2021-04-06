<!--Still a WIP-->
<template>
  <div>
    <button type="button" v-on:click="addCard()">Button</button>
    <p>{{ term }}</p>
    <p>{{ course }}</p>
    <p>{{ title1 }}</p>
    <p>{{ title2 }}</p>
    <p>{{ cred }}</p>
    <p>{{ enrolled }}</p>
    <p>{{ maxCap }}</p>
    <p>{{ day }}</p>
    <p>{{ time }}</p>
    <p>{{ room }}</p>
    <p>{{ preReq }}</p>
    <p>{{ notes }}</p>
    <p>{{ memo }}</p>
    <p>{{ icPreReq }}</p>
  </div>
</template>

<script>
export default {
  props: ['filterData'],
  data() {
    return {
      term: "",
      course: "",
      title1: "",
      title2: "",
      cred: "",
      enrolled: "",
      maxCap: "",
      day: "",
      time: "",
      room: "",
      name: "",
      preReq: "",
      notes: "",
      memo: "",
      icPreReq: ""
    }

  },
  methods: {
    addCard() {
      this.$emit('addCard');
    }
  }
}
</script>
<style>

</style>
