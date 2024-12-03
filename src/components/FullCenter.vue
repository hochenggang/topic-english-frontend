<template>
  <div class="full" :style="`z-index:${zIndex};`">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  zIndex: {
    type: Number,
    default: 2,
  }
})

</script>

<style scoped>
.full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
