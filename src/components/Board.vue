<template>
  <div>
    <h1>Hello</h1>
    <ul>
      <li v-for="m in messages" :key="m.id">{{ m.content }}</li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Board",
  data: () => ({
    messages: []
  }),
  apollo: {
    messages: gql`
      query messages {
        messages {
          id
          content
        }
      }
    `
  }
};
</script>

<style scoped></style>
