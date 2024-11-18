<template>
  <div class="sentence">
    <span v-for="w in words" class="word" @click="handleWordClick(w)">{{ w }}</span>
    <div class="word-detail-bg" v-if="detail" @click="clearDetail">
      <div class="word-detail" @click.stop="console.log('word-detail')">

        <span class="word">{{ detail[0] }}</span>
        <div class="audios">
          <span class="audio" v-for="audio in detail[1][1]">{{ audio[0] }}:/{{ audio[2] }}/
            <Audio :url="`https://dict.youdao.com/dictvoice?type=${audio[0].startsWith('us') ? 2 : 1 }&audio=${detail[0]}`" :size="25" :title="audio[2]"/>
          </span>
        </div>
        <div class="translates">
          <span class="translate" v-for="trans in detail[1][0]">{{ trans }}</span>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { defineProps, ref, onMounted, reactive, onUnmounted, h } from 'vue';
import Audio from '../components/Audio.vue'

const props = defineProps({ 'text': String })
const words = ref<string[]>(props.text.split(" "))
const detail = ref(null)

const queryWord = (text) => {

  fetch("https://ai.imhcg.cn/word?text=" + text)
    .then(resp => {
      if (resp.status == 200) {
        return resp.json()
      } else {
        return null
      }
    })
    .then(result => {
      console.log("query result:", result)
      detail.value = result
    })
}

const handleWordClick = (text) => {
  detail.value = null
  console.log("handleWordClick", text)
  queryWord(text)

}

const clearDetail = (e) => {
  detail.value = null
  e.stopPropagation()
  console.log("clearDetail")
}
</script>

<style scoped>
.word {
  margin-right: 0.35rem;
  cursor: pointer;
}

.word-detail-bg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 6;
  background: rgba(0, 0, 0, .1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.word-detail {

  width: 95%;
  height: 30%;
  opacity: 0.95;
  overflow: auto;
  background: #fff;
  /* border-radius: 5px; */
  padding: 1.5rem 1rem;
  border-top: 2px dashed rgba(84,188,189,1);
}

.translate,
.audio {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #333333;
  display: flex;
  align-items: center;
}

.audio {
  font-weight: lighter;
}
.translate {
  font-weight: bold;
}

.translates,.audios {
  margin-top: 0.75rem;
}
</style>