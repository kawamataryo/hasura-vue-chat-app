<template>
  <div>
    <h1>Hello</h1>
    <message-form @submit="addMessage"></message-form>
    <message-card v-for="m in messages" :key="m.id" :message="m" :is-mine="Math.random() >= 0.5"></message-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
import MessageForm from "./MessageForm";
import MessageCard from "./MessageCard";

export default {
  name: "Board",
  components: {
    MessageCard,
    MessageForm
  },
  data() {
    return {
      messages: []
    };
  },
  methods: {
    async addMessage(content) {
      const updateResult = await this.$apollo.mutate({
        mutation: gql`
          mutation($content: String!) {
            insert_messages(objects: { content: $content }) {
              affected_rows
            }
          }
        `,
        variables: {
          content
        }
      });
      console.log(updateResult.data.rowsAffected.messages.length)
    }
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
