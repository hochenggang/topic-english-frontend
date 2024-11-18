<template>
  <div class="keyword-inputer">
    <input class="keyword-inputer-input" type="text" placeholder="在此输入话题" v-model="inputTopicName" autofocus
      @keyup.enter="validateAndEmit" :class="{ 'invalid': isInvalid }">
    <button class="keyword-inputer-button" @click="validateAndEmit">Go</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputTopicName = ref('');
const isInvalid = ref(false);

const emit = defineEmits<{
  (e: 'go', keyword: string): void
}>();

const validateAndEmit = () => {
  if (inputTopicName.value.length < 3 || inputTopicName.value.length > 50) {
    isInvalid.value = true;
    const savedKyword = inputTopicName.value
    inputTopicName.value = inputTopicName.value.length < 3 ? "至少要 3 个字喔":"最多50个字喔";
    // 进行错误提示，500ms 后恢复
    setTimeout(() => {
      isInvalid.value = false;
      inputTopicName.value = savedKyword;
    }, 500);
  } else {
    emit('go', inputTopicName.value);
  }
};
</script>

<style scoped>
.keyword-inputer {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
}

.keyword-inputer-input {
  display: flex;
  align-items: center;
  border: 2px solid #54BCBD;
  border-right: none;
  background-color: rgba(251, 255, 255, 0.87);
  padding: 0.75rem;
  outline: none;
  border-radius: 15px 0px 0px 15px;
  font-size: 1rem;
  transition: color 0.5s;
}

.keyword-inputer-input::placeholder {
  color: #bebebe;
  opacity: 1;
}

.keyword-inputer-button {
  border: 2px solid #54BCBD;
  border-left: none;
  padding: 0.75rem;
  background-color: #54bbbd67;
  color: #FFFFFF;
  font-weight: bold;
  border-radius: 0px 15px 15px 0px;
  font-size: 1rem;
}

.invalid {
  animation: blink 0.5s;
}

@keyframes blink {

  0%,
  100% {
    color: inherit;
  }

  50% {
    color: red;
  }
}
</style>