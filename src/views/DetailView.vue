<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, handleError } from 'vue'
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

const route = useRoute()
const router = useRouter()

const step = ref(0)
const current = ref([])
const currentIndex = ref(0)

const title = ref(route.query.text)
const loadingText = ref('')

// 创建响应式数据
const data = reactive({
  result: [],
  isLoading: true,
});

interface LLMResponse {
  code: number,
  result: string | [string, string][]
}


const errorHandler = (msg) => {
  console.log('error:', msg)
  loadingText.value = msg
  // router.push("/#/")
}

const createTopic = (text) => {
  // 异步的去请求并更新数据至 reactive 的 data
  fetch('https://ai.imhcg.cn/llm/topic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(responseData => {
      const llm = responseData as LLMResponse
      console.log("response:", llm);
      if (llm.code == 201) {
        // 说明已经返回了结果，直接使用
        data.result = llm.result;
        data.isLoading = false;
        loadingText.value = null
      } else if (llm.code == 202) {
        loadingText.value = llm.result as string
        // 说明结果正在生成，需要持续请求更新状态
        setTimeout(() => getTopic("https://ai.imhcg.cn/llm/topic?text=" + text), 500)
      } else {
        // 非[201,202]的状态码视为报错
        errorHandler(llm.result)
      }

    })
    .catch(error => {
      if (error.message.includes('Failed to fetch')) {
        errorHandler('抱歉\n网络不太好')
      } else {
        errorHandler('抱歉\n' + error.message)
      }
    });
}


const keepFetch = ref<boolean>(true)


function getTopic(url: string) {
  data.isLoading = true;
  const realUrl = ref("")
  fetch(url).then(response => {
    // 请求成功后保存一下URL，便于后续重试时使用
    realUrl.value = response.url
    return response.json()
  })
    .then(responseData => {
      const llm = responseData as LLMResponse
      console.log("getTopic", url, llm)
      if (llm.code == 201) {
        data.result = llm.result;
        data.isLoading = false;
        loadingText.value = null
      } else if (llm.code == 202) {
        // 如果TTSResponse返回一个非200的状态，需要设置一个定时器不断去请求
        loadingText.value = llm.result as string;
        if (keepFetch.value) {
          // 在组件未关闭的情况下,请求至 TTSResponse 的状态码为200
          if (keepFetch.value) {
            setTimeout(() => getTopic(realUrl.value), 500)
          }
        }
      } else {
        errorHandler(llm.result)
      }
    })

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

onMounted(() => {
  if (route.query.text) {
    createTopic(route.query.text)
  } else {
    router.push("/#/")
  }
})

onUnmounted(() => {
  keepFetch.value = false
})

</script>

<template>
  <div class="main">


    <Loading v-show="data.isLoading" :text="loadingText" />
    <div class="items step-body" v-if="!data.isLoading && step == 0">

      <Close @go="router.push('/')" :text="title" />

      <TransitionGroup name="list" tag="ul">
        <li class="item " v-for="item, index in data.result" :key="item">
          <div class="item-text">
            <Sentence class="item-text-en" :text="item[0]"/>
            <span class="item-text-zh">{{ item[1] }}</span>

          </div>

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
      </TransitionGroup>
    </div>

    <div v-if="step == 1" class="step-body">
      <DetailTopBar @go="toStepZero" :text="' '" :item="current" />
      <DetailHead :item="current" />
      <PlayAudio :url="'https://dict.youdao.com/dictvoice?type=1&audio=' + encodeURIComponent(current[0])" @ended="(stepOneIsPlayed = true)"
        @start="(url) => { ttsUrl = url }" />
      <BottomBar :ok="stepOneIsPlayed" @go="toStepTwo" :text="'细看再听，读懂每个单词'" />

    </div>

    <div v-if="step == 2" class="step-body">
      <DetailTopBar @go="toStepZero" :text="' '" :item="current"/>
      <DetailHead :item="current" />
      <Recorder @saveTo="saveRecordVoice" />
      <BottomBar :ok="voice" @go="toStepThree" :text="'反复朗读录制，直到状态最好'" />

    </div>

    <div v-if="step == 3" class="step-body">
      <DetailTopBar @go="toStepZero" :text="' '" :item="current"/>
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
  border-top: 1px dashed #dfdfdf;
}

.item-text {
  display: flex;
  flex-direction: column;
  width: 80%;

}

.item-icon {
  flex-shrink: 0;
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
