<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2 class="font-weight-black">
        <v-icon class="mr-1">mdi-comment-processing-outline</v-icon>Simple chat
      </h2>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <board></board>
    </v-content>
  </v-app>
</template>

<script>
import Board from "./components/Board";

export default {
  name: "App",

  components: {
    Board
  },

  data: () => ({
    //
  })
};
</script>
