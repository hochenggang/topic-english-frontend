<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" :width="size"
    :height="size" filter="none">
    <g>
      <path
        d="M10.932 23.111h15.735v-17.778h-21.333v17.778h3.556v1.634l2.043-1.634zM11.556 24.889l-4.444 3.556v-3.556h-1.778c-0.982 0-1.778-0.796-1.778-1.778v-17.778c0-0.982 0.796-1.778 1.778-1.778h21.333c0.982 0 1.778 0.796 1.778 1.778v17.778c0 0.982-0.796 1.778-1.778 1.778h-15.111zM21.14 14.222h0.002c0 2.946-2.345 5.333-5.238 5.333-2.889 0-5.232-2.382-5.238-5.322v-0.004c0-0.491 0.398-0.889 0.889-0.889 0.489 0 0.885 0.394 0.889 0.882 0 1.971 1.556 3.556 3.46 3.556 1.883 0 3.427-1.551 3.46-3.492-0.001-0.017-0.002-0.037-0.002-0.058v0c0-0.491 0.398-0.889 0.889-0.889 0.489 0 0.886 0.395 0.889 0.883zM11.556 8.889c0.491 0 0.889 0.398 0.889 0.889s-0.398 0.889-0.889 0.889-0.889-0.398-0.889-0.889c0-0.491 0.398-0.889 0.889-0.889zM20.444 8.889c0.491 0 0.889 0.398 0.889 0.889s-0.398 0.889-0.889 0.889-0.889-0.398-0.889-0.889c0-0.491 0.398-0.889 0.889-0.889z"
        fill="rgba(52,124,175,1)"></path>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IconPlayer0',
  props: {
    size: {
      type: Number,
      default: 114,
    },
  },
});
</script>