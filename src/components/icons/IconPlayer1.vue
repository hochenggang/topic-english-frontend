<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" :width="size"
    :height="size" style="" filter="none">

    <g>
      <path
        d="M21.368 16.696l-6.577 5.262c-0.383 0.307-0.943 0.245-1.249-0.139-0.121-0.151-0.195-0.344-0.195-0.555 0 0 0 0 0 0v0-10.523c0-0.491 0.398-0.889 0.889-0.889 0 0 0 0 0 0 0.211 0 0.405 0.073 0.557 0.196l-0.002-0.001 6.577 5.262c0.383 0.307 0.445 0.866 0.139 1.249-0.042 0.052-0.087 0.097-0.137 0.137l-0.002 0.001zM16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855-0-14.222-6.368-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
        fill="rgba(84,188,189,1)"></path>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IconPlayer1',
  props: {
    size: {
      type: Number,
      default: 114,
    },
  },
});
</script>