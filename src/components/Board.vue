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
import ls from "local-storage";

const generateColor = () =>
  "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

const UID_STORAGE_KEY = "hasura-chat-uid";
const COLOR_STORAGE_KEY = "hasura-chat-color";

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
  computed: {
    userId: () => ls.get(UID_STORAGE_KEY),
    iconColor: () => ls.get(COLOR_STORAGE_KEY)
  },
  methods: {
    async addMessage(content) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($content: String!, $userId: String!, $iconColor: String!) {
            insert_messages(
              objects: {
                content: $content
                user_id: $userId
                icon_color: $iconColor
              }
            ) {
              affected_rows
            }
          }
        `,
        variables: {
          content,
          userId: this.userId,
          iconColor: this.iconColor
        }
      });
    },
    isMine(userId) {
      return this.userId === userId;
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
            userId: user_id
            iconColor: icon_color
            id
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            messages {
              id
              userId: user_id
              iconColor: icon_color
              content
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          return subscriptionData.data;
        }
      }
    }
  },
  mounted() {
    if (!ls.get(UID_STORAGE_KEY)) {
      ls.set(UID_STORAGE_KEY, uuid());
    }
    if (!ls.get(COLOR_STORAGE_KEY)) {
      ls.set(COLOR_STORAGE_KEY, generateColor());
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
