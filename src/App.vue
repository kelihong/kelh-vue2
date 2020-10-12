<template>
  <div id="app">
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

  
</style>
