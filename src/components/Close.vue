<template>
  <div class="back">
    <div class="back-text">{{ props.text }}</div>


    <svg v-on:click="$emit('go')" class="icon" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="38" height="38" style="" filter="none">

      <g>
        <path
          d="M22.72 6.624c-2.080 2.080-4.128 4.192-6.208 6.304-0.288 0.288-0.736 0.288-0.992 0-2.080-2.112-4.16-4.224-6.24-6.304-0.256-0.288-0.704-0.288-0.992 0-0.48 0.512-0.992 1.024-1.504 1.536-0.119 0.136-0.192 0.316-0.192 0.512s0.073 0.376 0.193 0.513l-0.001-0.001 6.208 6.304c0.288 0.288 0.256 0.736 0 1.024l-6.24 6.336c-0.256 0.288-0.256 0.736 0 0.992l1.536 1.536c0.288 0.288 0.736 0.288 0.992 0l6.24-6.304c0.256-0.288 0.704-0.288 0.992 0 2.048 2.112 4.128 4.192 6.208 6.304 0.256 0.288 0.704 0.288 0.992 0 0.512-0.512 0.992-1.024 1.504-1.536 0.133-0.13 0.216-0.311 0.216-0.512s-0.083-0.382-0.216-0.512l-0-0c-2.016-2.080-4.096-4.16-6.208-6.304-0.119-0.136-0.192-0.316-0.192-0.512s0.073-0.376 0.193-0.513l-0.001 0.001 6.24-6.336c0.119-0.136 0.192-0.316 0.192-0.512s-0.073-0.376-0.193-0.513l0.001 0.001-1.536-1.536c-0.288-0.256-0.736-0.256-0.992 0.032z"
          fill="rgba(206,206,206,1)"></path>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['text'])
const emit = defineEmits<{
  (e: 'go'): void
}>()

</script>

<style scoped>
.back {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.25rem;
  width: 100%;
  border-bottom: 1px dashed #dfdfdf;
}

.icon {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.back-text {
  display: flex;
  align-items: center;
  color: #6C6C6C;
  font-size: 1.5rem;
  font-weight: bold;
  width: 80%;
}</style>
