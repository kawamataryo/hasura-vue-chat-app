<template>
  <v-form
    class="pa-5"
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submit"
  >
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
  </v-form>
</template>

<script>
export default {
  name: "MessageForm",
  data: () => ({
    content: "",
    valid: true
  }),
  methods: {
    submit() {
      if (this.content.length === 0) return;

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
