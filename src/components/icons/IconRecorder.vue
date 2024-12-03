<template>
  <svg
    t="1732134605074"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1528"
    :width="iconSize"
    :height="iconSize"
    :style="{ transform: `scale(${scale})` }"
  >
    <path
      d="M588.8 204.8C660.48 204.8 716.8 261.12 716.8 332.8l-15.36 199.68c0 71.68-40.96 138.24-112.64 138.24s-71.68 25.6-92.16 0c-20.48-20.48-35.84-51.2-35.84-87.04v-256C460.8 261.12 517.12 204.8 588.8 204.8z"
      fill="#fa5a5a"
      p-id="1529"
    ></path>
    <path
      d="M486.4 972.8v-128c-174.08-15.36-307.2-158.72-307.2-332.8 0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6c0 153.6 128 281.6 281.6 281.6s281.6-128 281.6-281.6c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6c0 174.08-133.12 317.44-307.2 332.8V972.8h153.6c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6h-358.4c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h153.6zM512 51.2C424.96 51.2 358.4 117.76 358.4 204.8v307.2c0 87.04 66.56 153.6 153.6 153.6s153.6-66.56 153.6-153.6V204.8c0-87.04-66.56-153.6-153.6-153.6z m0-51.2c112.64 0 204.8 92.16 204.8 204.8v307.2c0 112.64-92.16 204.8-204.8 204.8s-204.8-92.16-204.8-204.8V204.8c0-112.64 92.16-204.8 204.8-204.8z"
      fill=""
      p-id="1530"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'IconRecorder',
  props: {
    size: {
      type: Number,
      default: 100,
    },
    wave: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const iconSize = ref(props.size);
    const scale = ref(1);

    watch(() => props.wave, (newWave) => {
      // 根据 wave 值调整图标的缩放比例
      scale.value = 1 + newWave * 0.02; // 你可以根据需要调整这个公式
    });

    return {
      iconSize,
      scale,
    };
  },
});
</script>

<style scoped>
.icon {
  transition: transform 0.1s ease-in-out;
}
</style>