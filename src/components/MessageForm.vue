<template>
  <v-form class="pa-5" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="content"
      :rules="contentRules"
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
  </v-form>
</template>

<script>
export default {
  name: "MessageForm",
  data: () => ({
    content: "",
    valid: true
  }),
  computed: {
    contentRules: () => [v => !!v || "Message is required"]
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;

      this.$emit("submit", this.content);
      this.clean();
    },
    clean() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped></style>
