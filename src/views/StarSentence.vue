<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, handleError, onActivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DetailHead from '../components/DetailHead.vue'
import Close from '../components/Close.vue'
import PlayAudio from '../components/PlayAudio.vue'
import BottomBar from '../components/BottomBar.vue'
import Recorder from '../components/Recorder.vue'
import Loading from '../components/Loading.vue'
import BottomBarFinal from '../components/BottomBarFinal.vue'
import Sentence from '../components/Sentence.vue'
import DetailTopBar from '../components/DetailTopBar.vue'


// 初始化历史记录
if (!localStorage.getItem('history')) {
  localStorage.setItem('history', JSON.stringify({}))
}


const route = useRoute()
const router = useRouter()

const step = ref(0)
const current = ref([])
const currentIndex = ref(0)

const title = ref("星标句子")
const loadingText = ref('')




// 创建响应式数据
const data = reactive({
  result: Object.entries(JSON.parse(localStorage.getItem('history'))),
  isLoading: false,
});

const interId =  setInterval(() => {
  console.log("刷新收藏数据")
  data.result = Object.entries(JSON.parse(localStorage.getItem('history')))
}, 500)

onUnmounted(()=>{
  clearInterval(interId)
})

interface LLMResponse {
  code: number,
  result: string | [string, string][]
}


const errorHandler = (msg) => {
  console.log('error:', msg)
  loadingText.value = msg
  // router.push("/#/")
}


const toStepOne = (item: [string, string], index: number) => {
  console.log('toStepOne')
  step.value = 1
  current.value = item
  currentIndex.value = index
  stepOneIsPlayed.value = false
}

const stepOneIsPlayed = ref(false)

const toStepTwo = (item: [string, string]) => {
  console.log('toStepTwo')
  step.value = 2
}

const ttsUrl = ref<string>(null)

const voice = ref<Blob>(null)
const voiceUrl = ref<string>(null)

const saveRecordVoice = (blob: Blob) => {
  voice.value = blob
  voiceUrl.value = URL.createObjectURL(blob);

}
const toStepThree = (item: [string, string]) => {
  console.log('toStepThree')
  step.value = 3
}

const stepThreeIsPlayed1 = ref(false)
const stepThreeIsPlayed2 = ref(false)


const toFinish = () => {
  console.log('toFinish')
  toStepZero()
  setTimeout(() => {
    console.log('before the delete', currentIndex.value, data.result)
    data.result.splice(currentIndex.value, 1)
    console.log('after the deleted', currentIndex.value, data.result)
  }, 150)
}


const toStepZero = () => {
  console.log('toStepZero')
  step.value = 0
  current.value = []
  stepOneIsPlayed.value = false
  voice.value = null
  voiceUrl.value = null
  stepThreeIsPlayed1.value = false
  stepThreeIsPlayed2.value = false
}

// onMounted(()=>{
//   data.result = Object.entries(JSON.parse(localStorage.getItem('history')))
// })

</script>

<template>
  <div class="main">


    <Loading v-show="data.isLoading" :text="loadingText" />
    <div class="items step-body" v-if="!data.isLoading && step == 0">

      <Close @go="router.push('/')" :text="title" />

      <ul >
        <li class="item " v-for="item, index in data.result" :key="item">
          <div class="item-text">
            <!-- <span class="item-text-en">{{ item[0] }}</span> -->
            <Sentence class="item-text-en" :text="item[0]" />
            <span class="item-text-zh">{{ item[1] }}</span>

          </div>

          <!-- <svg class="item-icon" title="继续" v-on:click="toStepOne(item, index)" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="40" height="40"
            style="transform:rotate(90deg);" filter="none">
            <g>
              <path
                d="M16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855 0-14.222-6.367-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
                fill="rgba(84,188,189,1)"></path>
              <path
                d="M16.051 8.876l5.657 5.657c0.347 0.347 0.347 0.91 0 1.257s-0.91 0.347-1.257 0l-3.574-3.574v9.994c0 0.491-0.398 0.889-0.889 0.889s-0.889-0.398-0.889-0.889v-9.867l-3.448 3.448c-0.347 0.347-0.91 0.347-1.257 0s-0.347-0.91 0-1.257l5.657-5.657z"
                fill="rgba(84,188,189,1)"></path>
            </g>
          </svg> -->

          <svg class="item-icon" title="继续" v-on:click="toStepOne(item, index)" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="33" height="33" style="" filter="none">

            <g>
              <rect width="48" height="48" fill="rgba(84,188,189,1)" fill-opacity="0.01" stroke="none"></rect>
              <path
                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                fill="none" stroke="rgba(84,188,189,1)" stroke-width="4" stroke-linejoin="round"></path>
              <path d="M14.4917 24.5H32.4917" stroke="rgba(84,188,189,1)" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" fill="none"></path>
              <path d="M23.4917 15.5L32.4917 24.5L23.4917 33.5" stroke="rgba(84,188,189,1)" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
            </g>
          </svg>

        </li>
        <span class="item " v-if="!data.result.length" >Nothing here.</span>
      </ul>
    </div>

    <div v-if="step == 1" class="step-body">
      <DetailTopBar @go="toStepZero" :text="' '" :item="current" />
      <DetailHead :item="current" />
      <PlayAudio :url="'https://ai.imhcg.cn/tts?text=' + encodeURIComponent(current[0])" @ended="(stepOneIsPlayed = true)"
        @start="(url) => { ttsUrl = url }" />
      <BottomBar :ok="stepOneIsPlayed" @go="toStepTwo" :text="'细看再听，读懂每个单词'" />

    </div>

    <div v-if="step == 2" class="step-body">
      <DetailTopBar @go="toStepZero" :text="' '" :item="current" />
      <DetailHead :item="current" />
      <Recorder @saveTo="saveRecordVoice" />
      <BottomBar :ok="voice" @go="toStepThree" :text="'反复朗读录制，直到状态最好'" />

    </div>

    <div v-if="step == 3" class="step-body">
      <DetailTopBar @go="toStepZero" :text="' '" :item="current" />
      <DetailHead :item="current" />
      <div class="colunm-center">

        <span class="note-text">AI的发音</span>
        <PlayAudio :url="ttsUrl" @ended="stepThreeIsPlayed1 = true" />
        <span class="note-text">你的发音</span>
        <PlayAudio :url="voiceUrl" @ended="stepThreeIsPlayed2 = true" />
      </div>
      <BottomBarFinal :ok="stepThreeIsPlayed1 && stepThreeIsPlayed2" @go="toFinish" :text="'对比认真听，找可能的提升'" />

    </div>



  </div>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  width: 100%;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.items {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 0;
  margin: 0;

}

.item {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1.25rem;
  border-bottom: 1px dashed #dfdfdf;

}

.item-text {
  display: flex;
  flex-direction: column;
  width: 80%;

}

.item-text-zh {
  color: #6C6C6C;
  font-size: 1rem;
  font-weight: bold;
}

.item-text-en {
  color: #347CAF;
  font-size: 1.15rem;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
}


.step-body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: auto;
  padding-bottom: 3rem;
}


.note-text {
  padding: 0 2rem;
  color: #6C6C6C;
  font-size: 1rem;
  font-weight: bold;
}

.colunm-center {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
