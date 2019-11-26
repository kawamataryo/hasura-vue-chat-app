<template>
  <div>
    <div class="messages-wrapper">
      <v-container>
        <message-card
          v-for="m in messages"
          :key="m.id"
          :message="m"
          :is-mine="isMine(m.userId)"
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
import { scrollTo } from "scroll-js";
import uuid from "uuid/v1";

export default {
  name: "Board",
  components: {
    MessageCard,
    MessageForm
  },
  data() {
    return {
      messages: [],
      userId: uuid()
    };
  },
  methods: {
    async addMessage(content) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($content: String!, $userId: String!) {
            insert_messages(objects: { content: $content, user_id: $userId }) {
              affected_rows
            }
          }
        `,
        variables: {
          content,
          userId: this.userId
        }
      });
    },
    isMine(userId) {
      return this.userId === userId
    }
  },
  watch: {
    async messages() {
      await this.$nextTick();
      await scrollTo(window, {
        top: document.body.scrollHeight,
        duration: 1000,
        easing: "ease-in"
      });
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
