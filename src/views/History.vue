<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Close from '../components/Close.vue'

// 初始化历史记录
if (!localStorage.getItem('inputs')) {
  localStorage.setItem('inputs', JSON.stringify([]))
}

const router = useRouter()

const title = ref("历史话题")


const lines = ref(JSON.parse(localStorage.getItem('inputs')))
console.log('lines:',lines.value)
const toTopic = (text) => {
  router.push({
    name: 'detail',
    query: {
      'text': text,
    },
  })
}

</script>

<template>
  <div class="main">

    <div class="items step-body" >

      <Close @go="router.push('/')" :text="title" />

      <ul>
        <li class="item " v-for="text in lines" :key="text">
          <div class="item-text">
            
            <span class="item-text-zh">{{ text }}</span>

          </div>


          <svg class="item-icon" title="继续" v-on:click="toTopic(text)" xmlns="http://www.w3.org/2000/svg"
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
        <span class="item " v-if="lines.length == 0">Nothing here.</span>
      </ul>
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
