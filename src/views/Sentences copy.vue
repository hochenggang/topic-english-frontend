<template>
  <FullCenter style="padding: 1rem;" v-if="!currentSentenceEnList">
    <h3>{{ currentTag }}</h3>
    <iconStart class="margin-10" :fillColor="colorBlueMain" @click="startPlay" title="开始" />
    <span class="note-text">点击开始后，<br>将会播放句子的发音，<br>然后自动录制你的跟读并回放。</span>
  </FullCenter>

  <div class="main" v-if="currentSentenceEnList">
    <section>
      <h2>{{ currentSentenceEnList.join(" ") }}</h2>
      <h3>{{ currentSentenceZh }}</h3>
    </section>
    <footer
      :class="{ 'bg-red': (currentStatus == 2), 'bg-blue': (currentStatus == 1), 'bg-green': (currentStatus == 3) }">
      <div v-show="currentStatus == 1" class="icon breathing-effect" title="正在播放">
        <IconSpeaker :size="50" :fillColor="colorBlueMain" />
      </div>
      <div v-show="currentStatus == 2" class="icon" title="正在录音">
        <IconRecorder :wave="currentVolume" :size="50" />
      </div>
      <div v-show="currentStatus == 3" @click="" class="icon breathing-effect" title="播放">
        <IconSpeaker :size="50" :fillColor="colorGreenMain" />
      </div>

    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { initRecorder, recorder } from '@/recorder';
import FullCenter from '@/components/FullCenter.vue';

const route = useRoute();
const router = useRouter();

const sentences = ref<[number, string, string][]>();
const currentTag = ref<string>()
const currentStatus = ref(0);
const currentVolume = ref(0);
const currentSentenceZh = ref("");
const currentSentenceEnList = ref<string[]>();
const currentAudio = ref<HTMLAudioElement>()
const currentRecordBlob = ref<Blob>()

const quited = ref(false);
const autoPlayStatus = ref(true);


const host = ref("https://english.imhcg.cn");
// const host = ref("");

const requestSentences = async (tag: string) => {
  try {
    const response = await fetch(`${host.value}/api/sentences?${new URLSearchParams({ tag }).toString()}`);
    const jsonData = await response.json();
    sentences.value = jsonData;
  } catch (error) {
    console.error('Failed to fetch sentences:', error);
  }
};

const stopAudio = (audio: HTMLAudioElement) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

const blobToBase64 = (blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


const playAudio = async (url: string | Blob) => {
  let data = ""
  if (typeof url == 'string') {
    data = url;
  } else {
    data = await blobToBase64(url);
  }
  if (currentAudio.value) {
    stopAudio(currentAudio.value)
    currentAudio.value.src = data
  } else {
    currentAudio.value = new Audio(data)
  }
  await currentAudio.value.play();
  return new Promise(resolve => currentAudio.value.addEventListener('ended', () => {
    currentAudio.value.remove();
    currentAudio.value = null
    if (typeof url == 'string') {
      URL.revokeObjectURL(url);
    }
    setTimeout(() => resolve(true), 100);
  }));
};

const play = async (id: number, stage: number = 1) => {

  currentStatus.value = 1;
  if (stage <= currentStatus.value) {
    await playAudio(`${host.value}/api/tts/${id}.mp3`);
  }

  currentStatus.value = 2;
  if (stage <= currentStatus.value) {
    currentRecordBlob.value = await initRecorder((volume: number) => {
      currentVolume.value = volume;
    });
  }

  currentStatus.value = 3;
  if (stage <= currentStatus.value) {
    if (currentRecordBlob.value) {
      await playAudio(currentRecordBlob.value);
    }
  }
  await playAudio(`${host.value}/static/didu.mp3`);
};

const getHistory = (id: number) => {
  let history_text = localStorage.getItem("history");
  let history = {};
  if (history_text) {
    history = JSON.parse(history_text);
  }
  return history[String(id)];
};

const setHistory = (id: number, data: string[]) => {
  let history_text = localStorage.getItem("history");
  let history = {};
  if (history_text) {
    history = JSON.parse(history_text);
  }
  history[String(id)] = data;
  localStorage.setItem("history", JSON.stringify(history));
};



onMounted(async () => {
  const tag = route.query.tag as string;
  if (tag) {
    currentTag.value = tag
    await requestSentences(tag);
  } else {
    router.push("/#/");
  }
});


onUnmounted(() => {
  if (recorder) {
    recorder.stop()
  }
  if (currentAudio.value) {
    stopAudio(currentAudio.value)
  }
  quited.value = true;
  sentences.value = undefined;
  currentSentenceEnList.value = undefined;
  currentSentenceZh.value = "";
  currentStatus.value = 0;
  currentVolume.value = 0;
});

const startPlay = async () => {
  for (let [id, en, zh] of sentences.value!) {
    if (quited.value) {
      break;
    }
    if (typeof JSON.parse(en) == 'string') {
      currentSentenceEnList.value = [JSON.parse(en)];
    } else {
      currentSentenceEnList.value = JSON.parse(en);
    }
    currentSentenceZh.value = zh;
    try {
      if (!getHistory(id)) {
        await play(id);
        setHistory(id, [en, zh]);
      } else {
        continue;
      }
    } catch (error) {
      console.log(error);
      alert("抱歉，自动播放失败\n" + error + "\n请点击图标来继续");
      // router.push("/#/");
      break;
    }
  }
};

const colorBlueMain = '#9accff';
const colorGreenMain = '#55ffb3';

import IconSpeaker from '@/components/icons/IconSpeaker.vue';
import IconRecorder from '@/components/icons/IconRecorder.vue';
import iconStart from '@/components/icons/iconStart.vue';
</script>


<style scoped>
header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 10%;
  width: 100%;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 80%;
  width: 100%;
  padding: 1rem;
  background-color: #fffee0;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 80%;
  left: 0;
  height: 20%;
  width: 100%;
}

.bg-red {
  background-color: #ffb9cb;
}

.bg-blue {
  background-color: #c3e1ff;
}

.bg-green {
  background-color: #baffe0;
}

h2 {
  text-align: center;
}

h3 {
  text-align: center;
  font-size: 1.2rem;
  font-weight: lighter;
}

.note-text {
  font-size: 0.8rem;
  font-weight: lighter;
  color: #676767;
  text-align: center;
}

.margin-10 {
  margin: 10rem 0;
}
</style>