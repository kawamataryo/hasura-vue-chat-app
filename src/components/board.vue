<template>
  <h1>board</h1>
  <li v-for="(m, i) in messages" :key="i">{{m.content}}</li>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";

export default {
  name: "board",
  data() {
    return {
      messages: {}
    };
  },
  apollo: {
    messages: gql`
      query {
        messages {
          content
        }
      }
    `
  }
};
</script>

<style scoped></style>
