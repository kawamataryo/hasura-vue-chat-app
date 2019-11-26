<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>GraphQL chat app</h1>
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
