<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()


// 理想情况是呈现多个图画，呈现一系列的场景，例如果园、森林、城市，水果市场
// 每个画面利用场景信息，包含多个句子结构
// 点击画面，有一个展开动画，然后直接TTS读句子，然后播放滴，然后开始录音，检测录音音量持续低于2秒后，停止录音重新播放录音，然后加载下一句。
// 但现在先跑起来再说


const tags = ref<string[]>()

onMounted(async () => {
  // const resp = await fetch("/api/tags")
  const resp = await fetch("https://english.imhcg.cn/api/tags")
  const jsonData = await resp.json()
  tags.value = jsonData
})

</script>

<template>
  <div class="main">
    <h1>Let's Start.</h1>
    <h3 v-if="!tags">Loading...</h3>
    <ul class="tags" v-if="tags">
      <li class="tag" v-for="tag in tags" @click="router.push({
        name: 'sentences',
        query: {
          'tag': tag,
        },
      })">
        <div class="tag-text">{{ tag }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.tags {
  padding: 1rem 0;
}

.tag {
  margin: 0.5rem;
  padding: 1rem;
  background-color: #dcdcdc65;
  cursor: pointer;
}

.tag-text {
  font-size: 1rem;
  font-weight: normal;
  color: #2b2b2b;
}

h1 {
  margin: 1rem 0;
}

h2 {
  font-size: 1.2rem;
}

h3 {
  font-weight: lighter;
  font-size: 0.8rem;
}
</style>
