<template>
  <button :class="computedClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClasses() {
      return {
        'btn': true,
        [`btn-${this.type}`]: true,
        'btn-disabled': this.disabled
      };
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.btn {
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-text-secondary);
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  padding: 14px 20px;
  font-size: 1rem;
}

@media screen  and (max-width: 320px) {
  .btn {
    padding: 10px 10px;
  }
}


.btn-primary {
 background-color: var(--color-primary-hover);
}

.btn-disabled {
  background-color: var(--color-primary-active);
}
</style>