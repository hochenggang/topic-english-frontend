<template>
  <div class="recorder">
    <div v-if="recording === 0" class="icon" title="开始录音" @click="startRecording">
      <IconRecorder0 :size="size" />
    </div>
    <div v-if="recording === 1" class="icon" title="正在准备">
      <IconRecorder1 :size="size" />
    </div>
    <div v-if="recording === 2" class="icon" title="停止录音" @click="stopRecording">
      <IconRecorder2 :size="size" />
    </div>
    <div v-if="recording === 3" class="icon breathing-effect" title="播放中">
      <IconRecorder3 :size="size" />
    </div>

    <div v-if="recording === 4" class="icon" title="再次录音" @click="startRecording">
      <IconRecorder0 :size="size" />
    </div>
    
    <span class="loading-text">{{ hintText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';

import IconRecorder0 from './icons/IconRecorder0.vue';
import IconRecorder1 from './icons/IconRecorder1.vue';
import IconRecorder2 from './icons/IconRecorder2.vue';
import IconRecorder3 from './icons/IconRecorder3.vue';

// 定义属性
const props = defineProps<{ size?: number }>();

// 默认尺寸
const size = ref(100);
if (props.size) {
  size.value = props.size;
}

const emit = defineEmits<{
  (e: 'saveTo', blob: Blob): void
}>();

const recording = ref(0);
const hintText = ref('轻触开始录音');
const audioElement = ref<HTMLAudioElement | null>(null);

let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let source: MediaStreamAudioSourceNode | null = null;
let stream: MediaStream | null = null;
let intervalId: number | null = null;
let volume = ref(0);

const startRecording = async () => {
  hintText.value = '正在打开麦克风';
  recording.value = 1;

  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('浏览器不支持录音功能');
    }

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = [];

      hintText.value = null;
      recording.value = 3;

      const localUrl = URL.createObjectURL(blob);
      audioElement.value = new Audio(localUrl);
      audioElement.value.play();

      emit('saveTo', blob);
      hintText.value = '录音完成';

      audioElement.value.onended = () => {
        recording.value = 4;
        hintText.value = '轻触再次录音';
      };
    };

    mediaRecorder.start();
    recording.value = 2;
    hintText.value = '正在录音';

    const dataArray = new Uint8Array(analyser.fftSize);
    intervalId = setInterval(() => {
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0.0;
      for (let i = 0; i < dataArray.length; ++i) {
        sum += (dataArray[i] - 128) ** 2;
      }
      volume.value = Math.sqrt(sum / dataArray.length);
      hintText.value = `正在录音，音量为 ${volume.value.toFixed(2)}`;
    }, 100);
  } catch (error) {
    recording.value = 0;
    alert('抱歉，无法启动录音。\n' + error);
    console.log('无法录音:', error);
    hintText.value = '无法录音';
  }
};

const stopRecording = () => {
  if (mediaRecorder && recording.value === 2) {
    mediaRecorder.stop();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
      source?.disconnect();
      analyser?.disconnect();
      audioContext.close().then(() => {
        audioContext = null;
      });
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value = null;
  }
  console.log('audioElement', '已销毁');
});
</script>

<style scoped>
.recorder {
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