<template>
  <FullCenter style="padding: 1rem;" v-if="currentSentenceIndex < 0">
    <h3>{{ currentTag }}</h3>
    <iconStart class="margin-10" :fillColor="colorBlueMain" @click="startPlay" title="开始" />
    <span class="note-text">点击开始后，<br>你可以播放句子的发音，<br>然后录制你的跟读并回放。</span>
  </FullCenter>

  <div class="main" v-if="currentSentenceIndex >= 0">
    <div style="position: fixed;top: 0;width: 100%;height: 2px;z-index: 1;"
      :style="`background-color:var(--bg-green);`">
      <div style="position: fixed;top: 0;height: 2px;z-index: 2;"
        :style="`background-color:var(--color-green);width: ${currentSentenceIndex / sentences.length}%;`">
      </div>
    </div>
    <section>
      <h2>{{ currentSentenceEnList.join(" ") }}</h2>
      <h3>{{ currentSentenceZh }}</h3>
    </section>
    <!--  -->
    <footer
      :class="{ 'bg-red': (currentStatus == 2), 'bg-blue': (currentStatus <= 1), 'bg-green': (currentStatus >= 3) }">

      <div v-show="currentStatus == 0" class="icon" title="正在加载语音">
        <IconSpeaker3 :size="50" />
      </div>
      <div v-show="currentStatus == 1" class="icon breathing-effect" title="正在播放语音">
        <IconSpeaker3 :size="50" />
      </div>
      <div v-show="currentStatus == 2" class="icon" title="点击开始录音" @click="doStage3()">
        <iconRecorder3 :wave="1" :size="50" />
      </div>
      <div v-show="currentStatus == 3" class="icon" title="正在录音">
        <iconRecorder3 :wave="currentVolume" :size="50" />
      </div>
      <div v-show="currentStatus == 4" class="icon" title="轻触以开始回放" @click="doStage4()">
        <IconPlay3 :size="50" />
      </div>
      <div v-show="currentStatus == 5" @click="" class="icon breathing-effect" title="正在回放">
        <IconSpeaker3 :size="50" :styleIndex="2" />
      </div>

    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { initRecorder, recorder } from '@/recorder';
import FullCenter from '@/components/FullCenter.vue';
import IconSpeaker from '@/components/icons/IconSpeaker.vue';
import IconRecorder from '@/components/icons/IconRecorder.vue';
import iconStart from '@/components/icons/iconStart.vue';
import iconPlay3 from '@/components/icons/iconPlay3.vue';
import IconSpeaker3 from '@/components/icons/IconSpeaker3.vue';
import iconRecorder3 from '@/components/icons/iconRecorder3.vue';
import IconPlay3 from '@/components/icons/iconPlay3.vue';

const colorBlueMain = '#9accff';
const colorGreenMain = '#55ffb3';
const colorGreenBg = '#baffe0';


const route = useRoute();
const router = useRouter();


const currentTag = ref<string>()
type typeSentence = [number, string, string]
const sentences = ref<typeSentence[]>()
const currentSentenceIndex = ref<number>(-1)
const currentStatus = ref(0)
// currentStatus 0 正在预加载 TTS
// currentStatus 1 正在播放TTS
// currentStatus 2 TTS播放完毕
// currentStatus 3 正在录音
// currentStatus 4 录音结束 
// currentStatus 5 正在回放

const currentVolume = ref(0)
const currentSentenceZh = ref("")
const currentSentenceEnList = ref<string[]>()

const currentTtsUrl = ref<string>()
const currentAudio = ref<HTMLAudioElement>()
const currentRecordBlob = ref<Blob>()

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


const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


const initCurrentAudio = async (src: string | Blob) => {
  // 使用传入的 src 创建一个 Audio 对象并存入 currentAudio
  let tempSrc = ""
  if (typeof src == 'string') {
    tempSrc = src;
  } else {
    tempSrc = await blobToBase64(src);
  }
  if (currentAudio.value) {
    stopAudio(currentAudio.value)
    currentAudio.value.src = tempSrc
  } else {
    currentAudio.value = new Audio(tempSrc)
  }
  return currentAudio.value
};



const playCurrentAudio = async () => {
  if (currentAudio.value) {
    // 播放 currentAudio 并设置异步回调进行资源清理
    await currentAudio.value.play();
    return new Promise(resolve => currentAudio.value.addEventListener('ended', () => {
      currentAudio.value.remove();
      currentAudio.value = null
      // 延迟100毫秒再异步结束，防止音频无法播放完毕
      setTimeout(() => resolve(true), 100);
    }));
  }
};




const doStage1 = async () => {
  // 预加载TTS
  currentStatus.value = 0
  await initCurrentAudio(currentTtsUrl.value)
  // 播放TTS
  currentStatus.value = 1
  await playCurrentAudio()
  // 播放提示音，表面录音要开始了
  await initCurrentAudio(`${host.value}/static/di.mp3`)
  await playCurrentAudio()
  // TTS播放完毕
  currentStatus.value = 2
  // 尝试开始录音
  try {
    await doStage3()
  } catch (error) {
    console.log("自动录音失败，请手动录音")
  }
}


const doStage3 = async () => {
  try {
    // 正在录音
    currentStatus.value = 3
    currentRecordBlob.value = await initRecorder((volume: number) => {
      // console.log('volume:',volume)
      currentVolume.value = volume;
    });
    await initCurrentAudio(currentRecordBlob.value)
    // 录音完毕
    currentStatus.value = 4
    try {
      await doStage4()
    } catch (error) {
      console.log('自动播放失败，请手动点击播放')
    }
  } catch (error) {
    // 如果没有麦克风
    // 就跳到下一个句子，至少可以让人听句子
    currentSentenceIndex.value += 1
  }
}


const doStage4 = async () => {
  // 开始回放
  currentStatus.value = 5
  await playCurrentAudio()
  await initCurrentAudio(`${host.value}/static/hu.mp3`)
  await playCurrentAudio()
  currentSentenceIndex.value += 1
}


const initSentence = async (sentence: typeSentence) => {
  let [id, en, zh] = sentence
  if (typeof JSON.parse(en) == 'string') {
    currentSentenceEnList.value = [JSON.parse(en)];
  } else {
    currentSentenceEnList.value = JSON.parse(en);
  }
  currentSentenceZh.value = zh;
  currentTtsUrl.value = `${host.value}/api/tts/${id}.mp3`;
  await doStage1()
}

const startPlay = () => {
  currentSentenceIndex.value = 0
}




// const getHistory = (id: number) => {
//   let history_text = localStorage.getItem("history");
//   let history = {};
//   if (history_text) {
//     history = JSON.parse(history_text);
//   }
//   return history[String(id)];
// };

// const setHistory = (id: number, data: string[]) => {
//   let history_text = localStorage.getItem("history");
//   let history = {};
//   if (history_text) {
//     history = JSON.parse(history_text);
//   }
//   history[String(id)] = data;
//   localStorage.setItem("history", JSON.stringify(history));
// };



onMounted(async () => {
  const tag = route.query.tag as string;
  if (tag) {
    currentTag.value = tag
    await requestSentences(tag);
    watch(currentSentenceIndex, () => {
      if (currentSentenceIndex.value + 1 == sentences.value.length) {
        currentSentenceIndex.value = -1
      }
      if (currentSentenceIndex.value >= 0) {
        initSentence(sentences.value[currentSentenceIndex.value])
      }
    })
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
  sentences.value = undefined;
  currentSentenceEnList.value = undefined;
  currentSentenceZh.value = "";
  currentStatus.value = 0;
  currentVolume.value = 0;
});





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


.color-red {
  background-color: var(--color-red);
}

.color-blue {
  background-color: #91c8ff;
}

.color-green {
  background-color: #83ffc7;
}


.bg-red {
  background-color: var(--bg-red);
}

.bg-blue {
  background-color: var(--bg-blue);
}

.bg-green {
  background-color: var(--bg-green);
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