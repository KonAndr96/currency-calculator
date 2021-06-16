<template>
<Header />
<div class="main-view">
<transition name="drawer-slide">
<MenuDrawer
  v-if="isDrawerOpen"
/>
</transition>
<router-view
  class="router-view"
  :style="isDrawerOpen ?
  'width: 85vw;' :
  'width: 100vw;' "
/>
</div>
</template>

<script>
import Header from './components/Header.vue'
import MenuDrawer from './components/MenuDrawer.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  components: { Header, MenuDrawer },
  setup () {
    const store = useStore()
    const isDrawerOpen = computed(() => store.state.isDrawerOpen)
    return {
      isDrawerOpen
    }
  }
}
</script>

<style>
.main-view {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
.router-view {
  display: flex;
  flex-direction: row;
  align-self:flex-end;
  transition: all .6s ease-in-out;
  min-height: calc(100vh - 130px);
}
body {
  margin: 0;
  font-family: sans-serif;
}
.drawer-slide-enter-active,
  .drawer-slide-leave-active {
    transition: all .6s ease-in-out;
  }
    .drawer-slide-enter-from {
   transform: translateX(-15vw);
  }
  .drawer-slide-enter-to {
   transform: translateX(0px);
  }
  .drawer-slide-leave-from {
    transform: translateX(0px);
  }
  .drawer-slide-leave-to {
    transform: translateX(-15vw);
  }
</style>
