<template>
  <div v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppValidate",
  props: {
    formData: {
      type: Object,
      required: true
    },
    validate: {
      type: Object,
      required: true
    }
  },
  computed: {
    errors() {
      const errors = [];
      for (let field in this.validate) {
        if (!this.formData[field]) {
          errors.push(this.validate[field]);
        }
      }
      return errors;
    }
  },
  watch: {
    errors() {
      if (this.errors.length > 0) {
        this.$emit('validation-error', this.errors);
      }
    }
  }
}
</script>

<style scoped>

</style>