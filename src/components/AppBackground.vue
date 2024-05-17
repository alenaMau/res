<template>
  <div class="background" :style="{ backgroundColor: backgroundColor }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppBackground",
  props: {
    backgroundColor: {
      type: String,
      default: "var(--color-background-described)",
    }
  }
}
</script>

<style scoped>
.background {
  max-width: 90%;
  display: flex;
  flex-flow: wrap;
  height: fit-content;
  border-radius: 48px;
  padding: 40px;
  margin: 20px;
  justify-content: center;
}

@media screen  and (max-width: 768px) {
  .background {
    padding-right: 40px;
    padding-left: 40px;
  }
}

@media screen  and (max-width: 1024px) {
  .background {
    padding-right: 40px;
    padding-left: 40px;
  }
}

</style>