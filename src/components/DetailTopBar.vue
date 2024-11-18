<template>
  <div class="back">
    <div class="star">
      <svg v-if="!isStar" @click="addItem" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="64 64 896 896" width="29" height="29" style="" filter="none">
        <g>
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
            fill="rgba(206,206,206,1)"></path>
        </g>
      </svg>


      <svg v-if="isStar"  @click="removeItem" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="64 64 896 896" width="29" height="29" style="" filter="none">

        <g>
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
            fill="rgba(84,188,189,1)"></path>
        </g>
      </svg>
    </div>

    <svg v-on:click="$emit('go')" class="icon" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="38" height="38" style="" filter="none">

      <g>
        <path
          d="M22.72 6.624c-2.080 2.080-4.128 4.192-6.208 6.304-0.288 0.288-0.736 0.288-0.992 0-2.080-2.112-4.16-4.224-6.24-6.304-0.256-0.288-0.704-0.288-0.992 0-0.48 0.512-0.992 1.024-1.504 1.536-0.119 0.136-0.192 0.316-0.192 0.512s0.073 0.376 0.193 0.513l-0.001-0.001 6.208 6.304c0.288 0.288 0.256 0.736 0 1.024l-6.24 6.336c-0.256 0.288-0.256 0.736 0 0.992l1.536 1.536c0.288 0.288 0.736 0.288 0.992 0l6.24-6.304c0.256-0.288 0.704-0.288 0.992 0 2.048 2.112 4.128 4.192 6.208 6.304 0.256 0.288 0.704 0.288 0.992 0 0.512-0.512 0.992-1.024 1.504-1.536 0.133-0.13 0.216-0.311 0.216-0.512s-0.083-0.382-0.216-0.512l-0-0c-2.016-2.080-4.096-4.16-6.208-6.304-0.119-0.136-0.192-0.316-0.192-0.512s0.073-0.376 0.193-0.513l-0.001 0.001 6.24-6.336c0.119-0.136 0.192-0.316 0.192-0.512s-0.073-0.376-0.193-0.513l0.001 0.001-1.536-1.536c-0.288-0.256-0.736-0.256-0.992 0.032z"
          fill="rgba(206,206,206,1)"></path>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed,ref } from 'vue'

const props = defineProps({
  item: Array<string>
})
const emit = defineEmits<{
  (e: 'go'): void
}>()

// 初始化历史记录
if (!localStorage.getItem('history')) {
  localStorage.setItem('history', JSON.stringify({}))
}

const addItem = () => {
  console.log("addItem",props.item)
  const history = JSON.parse(localStorage.getItem('history'))
  history[props.item[0]] = props.item[1]
  localStorage.setItem('history', JSON.stringify(history))
  isStar.value = true

}

const removeItem = () => {
  console.log("removeItem",props.item)
  const history = JSON.parse(localStorage.getItem('history'))
  delete history[props.item[0]]
  localStorage.setItem('history', JSON.stringify(history))
  isStar.value = false
}

const getStarStatus = () => {
  const history = JSON.parse(localStorage.getItem('history'))
  console.log("isStar","props.item[0]",props.item[0],history.hasOwnProperty(props.item[0]))
  return history.hasOwnProperty(props.item[0])
}

const isStar = ref(getStarStatus())

</script>

<style scoped>
.back {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  width: 100%;
  border-bottom: 1px dashed #dfdfdf;
}

.icon {
  width: 2rem;
  height: 2rem;
}

.back-text {
  display: flex;
  align-items: center;
  color: #6C6C6C;
  font-size: 1.5rem;
  font-weight: bold;
  width: 80%;
}</style>
