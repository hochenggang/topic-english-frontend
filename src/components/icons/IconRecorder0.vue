<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" :width="size"
    :height="size" filter="none">
    <g>
      <path
        d="M12.461 11.548h7.111c0.491 0 0.889 0.398 0.889 0.889v7.111c0 0.491-0.398 0.889-0.889 0.889h-7.111c-0.491 0-0.889-0.398-0.889-0.889v-7.111c0-0.491 0.398-0.889 0.889-0.889zM16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855-0-14.222-6.368-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
        fill="rgba(84,188,189,1)"></path>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IconRecorder0',
  props: {
    size: {
      type: Number,
      default: 114,
    },
  },
});
</script>