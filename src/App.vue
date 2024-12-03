<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <div class="background"></div>
  <RouterView />
</template>

<style>

:root {
  --color-grey: #BEBEBE;
  --color-main: #54BCBD;
  --color-main-bg: #54BCBD67;
}


* {
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  background: transparent;
  list-style: none;
}

body {
  font-family: "LXGW WenKai Screen R", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    background-image: linear-gradient(rgba(200, 200, 200, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: -1; /* 确保背景在内容之下 */
}



@keyframes breathe {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

.breathing-effect {
  animation: breathe 1.5s ease-in-out infinite;
}

</style>
