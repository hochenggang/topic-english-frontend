<template>
  <div class="containner">
    <div class="player">




      <div v-show="playStatus == 0" class="icon breathing-effect" title="正在准备">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"
          :width="size" :height="size" style="" filter="none">
          <g>
            <path
              d="M10.932 23.111h15.735v-17.778h-21.333v17.778h3.556v1.634l2.043-1.634zM11.556 24.889l-4.444 3.556v-3.556h-1.778c-0.982 0-1.778-0.796-1.778-1.778v-17.778c0-0.982 0.796-1.778 1.778-1.778h21.333c0.982 0 1.778 0.796 1.778 1.778v17.778c0 0.982-0.796 1.778-1.778 1.778h-15.111zM21.14 14.222h0.002c0 2.946-2.345 5.333-5.238 5.333-2.889 0-5.232-2.382-5.238-5.322v-0.004c0-0.491 0.398-0.889 0.889-0.889 0.489 0 0.885 0.394 0.889 0.882 0 1.971 1.556 3.556 3.46 3.556 1.883 0 3.427-1.551 3.46-3.492-0.001-0.017-0.002-0.037-0.002-0.058v0c0-0.491 0.398-0.889 0.889-0.889 0.489 0 0.886 0.395 0.889 0.883zM11.556 8.889c0.491 0 0.889 0.398 0.889 0.889s-0.398 0.889-0.889 0.889-0.889-0.398-0.889-0.889c0-0.491 0.398-0.889 0.889-0.889zM20.444 8.889c0.491 0 0.889 0.398 0.889 0.889s-0.398 0.889-0.889 0.889-0.889-0.398-0.889-0.889c0-0.491 0.398-0.889 0.889-0.889z"
              fill="rgba(52,124,175,1)"></path>
          </g>
        </svg>
      </div>



      <div v-show="playStatus == 1" class="icon" title="轻触开始播放" v-on:click="playAudio()">


        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"
          :width="size" :height="size" style="" filter="none">

          <g>
            <path
              d="M21.368 16.696l-6.577 5.262c-0.383 0.307-0.943 0.245-1.249-0.139-0.121-0.151-0.195-0.344-0.195-0.555 0 0 0 0 0 0v0-10.523c0-0.491 0.398-0.889 0.889-0.889 0 0 0 0 0 0 0.211 0 0.405 0.073 0.557 0.196l-0.002-0.001 6.577 5.262c0.383 0.307 0.445 0.866 0.139 1.249-0.042 0.052-0.087 0.097-0.137 0.137l-0.002 0.001zM16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855-0-14.222-6.368-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
              fill="rgba(84,188,189,1)"></path>
          </g>
        </svg>
      </div>

      <div v-show="playStatus == 2" class="icon " title="正在载入">
        <svg class="breathing-effect" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32" :width="size" :height="size" style="" filter="none">
          <g>
            <path
              d="M1.333 19.333c0-0.001 0-0.003 0-0.005 0-3.088 1.616-5.799 4.050-7.333l0.036-0.021c0.696-5.279 5.168-9.311 10.581-9.311s9.885 4.032 10.575 9.257l0.006 0.054c2.471 1.555 4.088 4.268 4.088 7.359 0 4.553-3.511 8.286-7.973 8.639l-0.030 0.002-13.333 0.025c-4.475-0.365-8-4.104-8-8.667zM22.464 25.316c3.11-0.246 5.54-2.831 5.54-5.982 0-2.141-1.121-4.020-2.808-5.082l-0.025-0.015-1.076-0.671-0.16-1.256c-0.526-3.956-3.878-6.976-7.935-6.976s-7.409 3.020-7.931 6.935l-0.004 0.041-0.16 1.256-1.073 0.671c-1.712 1.076-2.834 2.955-2.834 5.096 0 3.151 2.43 5.735 5.518 5.981l0.021 0.001 0.231 0.017h12.467l0.231-0.017zM17.333 16h4l-5.333 6.667-5.333-6.667h4v-5.333h2.667v5.333z"
              fill="rgba(52,124,175,0.5)"></path>
          </g>
        </svg>
      </div>

      <div v-show="playStatus == 3" class="icon" title="轻触停止播放" v-on:click="pauseAudio()">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"
          :width="size" :height="size" style="" filter="none">

          <g>
            <path
              d="M13.111 10.667c0.614 0 1.111 0.497 1.111 1.111v8.444c0 0.614-0.497 1.111-1.111 1.111s-1.111-0.497-1.111-1.111v-8.444c0-0.614 0.497-1.111 1.111-1.111zM18.889 10.667c0.614 0 1.111 0.497 1.111 1.111v8.444c0 0.614-0.497 1.111-1.111 1.111s-1.111-0.497-1.111-1.111v-8.444c0-0.614 0.497-1.111 1.111-1.111zM16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855-0-14.222-6.368-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
              fill="rgba(222,134,143,1)"></path>
          </g>
        </svg>
      </div>


      <span class="loading-text" v-if="loadingText">{{ loadingText }}</span>

    </div>
  </div>
</template>

<script lang="ts" setup>

import { defineProps, ref, onMounted, reactive, onUnmounted } from 'vue';

const props = defineProps(['url', 'size'])

const size = ref(114)
if (props.size) {
  size.value = props.size
}

const emit = defineEmits<{
  ended: [],
  start: [url: string]
}>()


const loadingText = ref(null)
const playing = ref(false);
// 0 未开始 1 点击播放 2 正在播放 
const playStatus = ref(0);


onMounted(() => {
  console.log("onMounted:", props.url)
  createAudio(props.url)
})


onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause();
    delete audioElement.value;
  }
  console.log('onUnmounted', '已收尾')
})

const audioElement = ref<HTMLAudioElement>(null)


const createAudio = (url) => {
  emit('start', url)
  playStatus.value = 1
  audioElement.value = new Audio(url);

  // 监听音频播放事件
  audioElement.value.addEventListener('play', () => {
    console.log("Audio start playing.");
    playStatus.value = 2
    // 点击播放按钮，此时显示加载中
  });

  audioElement.value.addEventListener('pause', () => {
    console.log("Audio is paused.");
    // 暂停，此时显示播放按钮
    playStatus.value = 1
  });

  audioElement.value.addEventListener('timeupdate', () => {
    console.log("Current time: " + audioElement.value.currentTime);
    // 正在播放，此时显示暂停按钮
    playStatus.value = 3
  });

  audioElement.value.addEventListener('ended', () => {
    console.log("Audio has ended.");
    playStatus.value = 1
    emit('ended')
  });

  audioElement.value.addEventListener('error', () => {
    console.error("An error occurred while loading the audio.");
  });

}

// 定义播放和暂停方法
const playAudio = () => {
  if (audioElement.value) {
    loadingText.value = null
    audioElement.value.play();
  }
};

const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
};

</script>

<style scoped>
.containner {
  display: inline-block;
}
.player,.icon {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.loading-text {
  font-size: 0.8rem;
}
</style>
