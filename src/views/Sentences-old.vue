<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import initRecorder from '@/recorder';

const route = useRoute();
const router = useRouter();

const sentences = ref<[number, string, string][]>();
const currentStatus = ref(0);
const currentVolume = ref(0);
const currentSentenceZh = ref("");
const currentSentenceEnList = ref<string[]>();


// const host = ref("http://localhost:5000");
// const host = ref("");
const host = ref("https://english.imhcg.cn");

const requestSentences = async (tag: string) => {
  try {
    const response = await fetch(`${host.value}/api/sentences?${new URLSearchParams({ tag }).toString()}`);
    const jsonData = await response.json();
    // if (jsonData) {
    //   sentences.value = jsonData.sort(() => Math.random() - 0.5);
    // }
    sentences.value = jsonData
  } catch (error) {
    console.error('Failed to fetch sentences:', error);
  }
};

const playAudio = async (url: string) => {
  const audio = new Audio(url);
  await audio.play();
  return new Promise(resolve => audio.addEventListener('ended', () => {
    audio.remove()
    URL.revokeObjectURL(url)
    setTimeout(() => resolve(true), 100)
  }));
};


const play = async (id: number) => {
  // 播放句子
  currentStatus.value = 1;
  await playAudio(`${host.value}/api/tts/${id}.mp3`);

  // 录音
  currentStatus.value = 2;
  const blob = await initRecorder((volume: number) => {
    currentVolume.value = volume
  })
  currentStatus.value = 3;
  await playAudio(URL.createObjectURL(blob))
  // 播放提示音
  await playAudio(`${host.value}/static/didu.mp3`);
};

const quited = ref(false);

const getHistory = (id:number)=>{
  let history_text = localStorage.getItem("history")
  let history = {}
  if (history_text){
      history = JSON.parse(history_text)
  }
  return history[String(id)]
}

const setHistory = (id:number,data:string[])=>{
  let history_text = localStorage.getItem("history")
  let history = {}
  if (history_text){
      history = JSON.parse(history_text)
  }
  history[String(id)] = data
  localStorage.setItem("history",JSON.stringify(history))
}

onMounted(async () => {
  const tag = route.query.tag as string;
  if (tag) {
    await requestSentences(tag);
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
        if (!getHistory(id)){
          await play(id);
          setHistory(id,[en,zh])
        }
        else{
          continue
        }
      } catch (error) {
        console.log(error);
        alert("抱歉，\n" + error);
        router.push("/#/");
        break;
      }
    }

    // 显示重置按钮
  } else {
    router.push("/#/");
  }
});

onUnmounted(() => {
  quited.value = true;
  sentences.value = undefined;
  currentSentenceEnList.value = undefined;
  currentSentenceZh.value = "";
  currentStatus.value = 0;
  currentVolume.value = 0;
});

const colorBlueMain = '#9accff';
const colorGreenMain = '#55ffb3';

import IconSpeaker from '@/components/icons/IconSpeaker.vue';
import IconRecorder from '@/components/icons/IconRecorder.vue';
</script>

<template>
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
      <div v-show="currentStatus == 3" class="icon breathing-effect" title="播放">
        <IconSpeaker :size="50" :fillColor="colorGreenMain" />
      </div>
    </footer>
  </div>
</template>

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
</style>