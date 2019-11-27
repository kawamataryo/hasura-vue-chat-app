<template>
  <div class="pa-5">
    <v-text-field
      v-model="content"
      required
      label="message"
      outlined
      hide-details
    >
      <template v-slot:append>
        <v-icon @click="submit" color="primary">
          mdi-send
        </v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "MessageForm",
  data: () => ({
    content: ""
  }),
  methods: {
    submit() {
      this.$emit("submit", this.content);
      this.clean();
    },
    clean() {
      this.content = "";
    }
  }
};
</script>

<style scoped></style>
