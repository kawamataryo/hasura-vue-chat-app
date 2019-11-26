<template>
  <form>
    <v-text-field
        v-model="content"
        required
        label="content"
    >
    </v-text-field>
    <v-btn @click="submit">submit</v-btn>
  </form>
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
    }
  }
};
</script>

<style scoped>

</style>
