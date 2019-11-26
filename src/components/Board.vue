<template>
  <div>
    <div class="messages-wrapper">
      <v-container>
        <message-card
          v-for="m in messages"
          :key="m.id"
          :message="m"
          :is-mine="Math.random() >= 0.5"
        ></message-card>
      </v-container>
    </div>
    <v-card class="message-from-wrapper">
      <message-form @submit="addMessage"></message-form>
    </v-card>
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
      await this.$apollo.mutate({
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
    }
  },
  watch: {
    async messages() {
      await this.$nextTick();
      window.scrollTo(0, document.body.scrollHeight);
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
              id
              content
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          return subscriptionData.data;
        }
      }
    }
  }
};
</script>

<style scoped>
.messages-wrapper {
  margin-bottom: 100px;
}
.message-from-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
