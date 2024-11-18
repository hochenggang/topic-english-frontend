<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import KeywordInputer from '../components/KeywordInputer.vue'

const router = useRouter()

class History {
  
  constructor(key: string) {
    this.key = key
    this.initHistoryStorage()
  }

  initHistoryStorage() {
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]))
    }
  }

  getAllHistoryRecord() {
    return JSON.parse(localStorage.getItem(this.key)) as string[]
  }

  insertHistoryRecord(value: string) {
    const inputs = this.getAllHistoryRecord()
    if (!inputs.includes(value)) {
      inputs.unshift(value)
    }
    localStorage.setItem(this.key, JSON.stringify(inputs))
    console.log("add history", value.value)
  }
}

const history = new History("inputs")


const go = (topicName:string) => {
  if (topicName.length >= 2) {
    console.log('go', topicName)
    history.insertHistoryRecord(topicName)
    router.push({
      name: 'detail',
      query: {
        'topic': topicName,
      },
    })
  }
}

</script>

<template>
  <div class="main">
    <div class="main full z2">
      <KeywordInputer :go="go" />
    </div>
    <div class="footer">
      <span class="small-link" @click="router.push('/star-sentence')">星标句子</span>
      <span class="small-link" @click="router.push('/history')">历史话题</span>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.full {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;

}

.z1 {
  z-index: 1;
  padding: 2rem;
}

.z2 {
  z-index: 2;
  pointer-events: none;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}


.small-link {
  cursor: pointer;
  color: #54BCBD;
  border-bottom: 1px dashed #999;
  margin: 0.5rem;
  font-weight: lighter;
}
</style>
