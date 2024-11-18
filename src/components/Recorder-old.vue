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
import { ref, onUnmounted, watch } from 'vue';
import Recorder from 'recorder-core';
import 'recorder-core/src/engine/mp3-engine.js';
import 'recorder-core/src/engine/mp3';

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

let recorder: Recorder | null = null;

const startRecording = () => {
  hintText.value = '正在打开麦克风';
  recording.value = 1;

  recorder = new Recorder({
    type: 'mp3',
    sampleRate: 16000,
    bitRate: 16,
    onProcess: (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) => {
      recording.value = 2;
      hintText.value = `正在录音，音量为 ${powerLevel}`;
    }
  });

  recorder.open(() => {
    console.log('录音已打开');
    recorder.start();
  }, (msg, isUserNotAllow) => {
    recording.value = 0;
    alert('抱歉，无法启动录音。\n' + msg);
    console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
    hintText.value = '无法录音';
  });
};

const stopRecording = () => {
  if (recorder && recording.value === 2) {
    recorder.stop((blob, duration) => {
      recorder.close();
      recorder = null;
      console.log("录音成功", blob, "时长:" + duration + "ms");

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
    });
  }
};

// watch(recording, (newRecording) => {
//   if (newRecording === 4) {
//     hintText.value = '轻触再次录音';
//   }
// });

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