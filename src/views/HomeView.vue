<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import KeywordInputer from '../components/KeywordInputer.vue'

const router = useRouter()

const keyword = ref('')

class History {
  constructor(key:string) {
    this.key = key
    this.initHistoryStorage()
  }

  initHistoryStorage(){
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]))
    }
  }

  getAllHistoryRecord(){
    return JSON.parse(localStorage.getItem(this.key)) as string[]
  }

  insertHistoryRecord(value:string){
    const inputs = this.getAllHistoryRecord()
    if (!inputs.includes(value)) {
      inputs.unshift(value)
    }
    localStorage.setItem(this.key, JSON.stringify(inputs))
    console.log("add history", keyword.value)
  }
}

const history = new History("inputs")

const go = () => {
  if (keyword.value.length >= 2) {
    console.log('go', keyword.value)
    history.insertHistoryRecord(keyword.value)
    router.push({
      name: 'detail',
      query: {
        'text': keyword.value,
      },
    })
  }
}

</script>

<template>
  <div class="main">
    <div class="main full z2">
      <KeywordInputer v-model="keyword" @go="go" />
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
