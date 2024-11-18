<template>
  <div class="detail-head">
    <Sentence class="detail-head-en" :text="props.item[0]"/>
    <span class="detail-head-zh">{{props.item[1]}}</span>
  </div>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue';
import Sentence from '../components/Sentence.vue'

const props = defineProps(['item'])

</script>

<style scoped>

.detail-head {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem 2rem;
  
}
.detail-head-zh {
  font-size: 1rem;
  padding: 1rem 0;
  color: #6C6C6C;
  font-weight: bold;
}
.detail-head-en {
  font-size: 1.5rem;
  font-weight: bold;
  color: #347CAF;
  display: flex;
  flex-wrap: wrap;
  
}


</style>
