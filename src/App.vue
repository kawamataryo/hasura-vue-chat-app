<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Hasura real time Chat</h1>
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <board></board>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "@/components/board.vue";

export default Vue.extend({
  name: "App",
  components: {
    Board
  },
  data: () => ({
    //
  })
});
</script>
