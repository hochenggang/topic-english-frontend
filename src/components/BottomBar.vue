<template>
  <div class="bottom-bar">
    <span class="bottom-bar-text">{{ props.text }}</span>

    <!-- <svg title="未就绪" v-show="!props.ok" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32" width="45" height="45" style="transform:rotate(90deg);" filter="none">

      <g>
        <path
          d="M16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855 0-14.222-6.367-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
          fill="rgba(206,206,206,1)"></path>
        <path
          d="M16.051 8.876l5.657 5.657c0.347 0.347 0.347 0.91 0 1.257s-0.91 0.347-1.257 0l-3.574-3.574v9.994c0 0.491-0.398 0.889-0.889 0.889s-0.889-0.398-0.889-0.889v-9.867l-3.448 3.448c-0.347 0.347-0.91 0.347-1.257 0s-0.347-0.91 0-1.257l5.657-5.657z"
          fill="rgba(206,206,206,1)"></path>
      </g>
    </svg> -->



    <svg title="未就绪" v-show="!props.ok" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48" width="51" height="51" style="" filter="none">

      <g>
        <rect width="48" height="48" fill="rgba(206,206,206,1)" fill-opacity="0.01" stroke="none"></rect>
        <path
          d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
          fill="none" stroke="rgba(206,206,206,1)" stroke-width="4" stroke-linejoin="round"></path>
        <path d="M14.4917 24.5H32.4917" stroke="rgba(206,206,206,1)" stroke-width="4" stroke-linecap="round"
          stroke-linejoin="round" fill="none"></path>
        <path d="M23.4917 15.5L32.4917 24.5L23.4917 33.5" stroke="rgba(206,206,206,1)" stroke-width="4"
          stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
      </g>
    </svg>



    <!-- <svg class="breathing-effect" title="已就绪" v-show="props.ok" v-on:click="$emit('go')"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="45"
      height="45" style="transform:rotate(90deg);" filter="none">

      <g>
        <path
          d="M16 28.444c6.873 0 12.444-5.572 12.444-12.444s-5.572-12.444-12.444-12.444c-6.873 0-12.444 5.572-12.444 12.444s5.572 12.444 12.444 12.444zM16 30.222c-7.855 0-14.222-6.367-14.222-14.222s6.367-14.222 14.222-14.222 14.222 6.367 14.222 14.222-6.367 14.222-14.222 14.222z"
          fill="rgba(84,188,189,1)"></path>
        <path
          d="M16.051 8.876l5.657 5.657c0.347 0.347 0.347 0.91 0 1.257s-0.91 0.347-1.257 0l-3.574-3.574v9.994c0 0.491-0.398 0.889-0.889 0.889s-0.889-0.398-0.889-0.889v-9.867l-3.448 3.448c-0.347 0.347-0.91 0.347-1.257 0s-0.347-0.91 0-1.257l5.657-5.657z"
          fill="rgba(84,188,189,1)"></path>
      </g>
    </svg> -->


    <svg class="breathing-effect" title="已就绪" v-show="props.ok" v-on:click="$emit('go')"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="51"
      height="51" style="" filter="none">

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



  </div>
</template>

<script lang="ts" setup>

const props = defineProps(['ok', 'text'])
const emit = defineEmits<{
  (e: 'go'): void
}>()

</script>

<style scoped>
.back {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  padding-bottom: 5rem;
}

.bottom-bar-text {
  font-size: 1rem;
  font-weight: bold;
  color: #6C6C6C;
}</style>
