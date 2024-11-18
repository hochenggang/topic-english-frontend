<template>
  <div class="player">

    <div v-show="playStatus == 0" class="icon breathing-effect" title="正在准备">
      <IconPlayer0 :size="size"/>
    </div>

    <div v-show="playStatus == 1" class="icon" title="轻触开始播放" v-on:click="playAudio()">
      <IconPlayer1 :size="size"/>
    </div>

    <div v-show="playStatus == 2" class="icon " title="正在载入">
      <IconPlayer2 :size="size"/>
    </div>

    <div v-show="playStatus == 3" class="icon" title="轻触停止播放" v-on:click="pauseAudio()">
      <IconPlayer3 :size="size"/>
    </div>

    <span class="loading-text" v-if="loadingText">{{ loadingText }}</span>

  </div>
</template>

<script lang="ts" setup>


import { defineProps, ref, onMounted, reactive, onUnmounted, watch } from 'vue';

import IconPlayer0 from './icons/IconPlayer0.vue'
import IconPlayer1 from './icons/IconPlayer1.vue'
import IconPlayer2 from './icons/IconPlayer2.vue'
import IconPlayer3 from './icons/IconPlayer3.vue'



// 定义属性
const props = defineProps<{ url: string, size?: number }>();

// 默认尺寸
const size = ref(100);
if (props.size) {
  size.value = props.size;
}

// 定义事件
const emit = defineEmits<{
  ended: [],
  start: [url: string]
}>();

// 响应式数据
const loadingText = ref<string | null>(null);
const playStatus = ref(0);
const data = reactive({
  result: null as string | null,
  isLoading: true,
});
const keepFetch = ref<boolean>(true);
let controller: AbortController | null = null;

// 请求数据
async function fetchData(url: string) {
  data.isLoading = true;
  controller = new AbortController();
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (response.status === 200) {
      const responseData = await response.json();
      if (responseData.code === 200) {
        data.result = responseData.result;
        data.isLoading = false;
        loadingText.value = null;
        createAudio(data.result);
      } else {
        loadingText.value = responseData.result;
        if (keepFetch.value) {
          setTimeout(() => fetchData(url), 500);
        }
      }
    } else if (response.status === 429) {
      loadingText.value = "高峰期，请稍后再试";
    } else {
      loadingText.value = "发生预期之外的错误";
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else if (error.message.includes('Failed to fetch')) {
      alert('抱歉\n网络不太好');
    } else {
      alert('抱歉\n' + error.message);
    }
  } finally {
    controller = null;
  }
}

// 生命周期钩子
onMounted(() => {
  if (props.url.includes('blob') || props.url.includes('.mp3') || props.url.includes('dict.youdao.com')) {
    createAudio(props.url);
  } else {
    fetchData(props.url);
  }
});

onUnmounted(() => {
  keepFetch.value = false;
  if (audioElement.value) {
    audioElement.value.pause();
    delete audioElement.value;
  }
  if (controller) {
    controller.abort();
  }
  console.log('onUnmounted', '已收尾');
});

// 监听 props.url 的变化
watch(() => props.url, (newUrl) => {
  if (newUrl.includes('blob') || newUrl.includes('.mp3')) {
    createAudio(newUrl);
  } else {
    fetchData(newUrl);
  }
});

// 音频元素
const audioElement = ref<HTMLAudioElement | null>(null);

// 创建音频对象
const createAudio = (url: string) => {
  emit('start', url);
  playStatus.value = 1;
  audioElement.value = new Audio(url);

  audioElement.value.addEventListener('play', () => {
    console.log("Audio start playing.");
    playStatus.value = 2;
  }, { once: true });

  audioElement.value.addEventListener('pause', () => {
    console.log("Audio is paused.");
    playStatus.value = 1;
  });

  audioElement.value.addEventListener('timeupdate', () => {
    console.log("Current time: " + audioElement.value.currentTime);
    playStatus.value = 3;
  });

  audioElement.value.addEventListener('ended', () => {
    console.log("Audio has ended.");
    playStatus.value = 1;
    emit('ended');
  }, { once: true });

  audioElement.value.addEventListener('error', () => {
    console.error("An error occurred while loading the audio.");
  });
};

// 播放和暂停方法
const playAudio = () => {
  if (audioElement.value) {
    loadingText.value = null;
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
.player {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.loading-text {
  font-size: 0.8rem;
}
</style>
