<template>
  <div>
    <h1>Hello</h1>
    <message-form @submit="addMessage"></message-form>
    <ul>
      <li v-for="m in messages" :key="m.id">{{ m.content }}</li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";
import MessageForm from "./MessageForm";

export default {
  name: "Board",
  components: {
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
