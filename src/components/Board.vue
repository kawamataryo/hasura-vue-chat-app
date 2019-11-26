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
  data() {
    return {
      messages: []
    };
  },
  apollo: {
    messages: {
      query: gql`
        query {
          messages {
            content
            id
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            messages {
              content
              id
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          console.log(subscriptionData.data);
          return subscriptionData.data;
        }
      }
    }
  }
};
</script>

<style scoped></style>
