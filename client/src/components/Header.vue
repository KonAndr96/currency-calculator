<template>
  <div class="header">
  <h1>Currency Calculator</h1>
  <div
    :style="!isAuthorized && 'justify-content: flex-end;'"
    class="nav-buttons"
  >
    <BurgerIcon
      class="burger"
      v-if="isAuthorized"
      @click="toggleDrawer"
    />
    <button
      @click="handleLogin"
      v-if="!isAuthorized && route.path !== '/login'"
    >
      <span>
      Login
      </span>
      <LogoutIcon class="logout" />
    </button>
  </div>
  </div>
</template>

<script>
import BurgerIcon from './Icons/BurgerIcon.vue'
import LogoutIcon from './Icons/LogoutIcon.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Header',
  components: { BurgerIcon, LogoutIcon },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // GETS GLOBAL VUEX STATE.
    const isAuthorized = computed(() => store.state.isAuthorized)
    const toggleDrawer = () => {
      store.commit('TOGGLE_DRAWER')
    }
    // SIMPLY REDIRECTS USER TO THE LOGIN PAGE.
    const handleLogin = () => {
      router.push('/login')
    }
    return {
      isAuthorized,
      toggleDrawer,
      handleLogin,
      route
    }
  }
}
</script>

<style scoped>
span {
  color: #ceddef;
  align-self: center;
  font-size: 1rem;
}

.logout {
  width: 2vh;
  height: 2vh;
  color: #ceddef;
  align-self: center;
  margin-left: .3rem;
  min-height: 1.5rem;
  min-width: 1rem;
}
button {
  display: flex;
  flex-direction: row;
  background-color: #1f3c88;
  padding: 0 .75rem;
  border: none;
  border-radius: 8px;
  cursor:pointer;
  height: 4vh;
  min-height: 1.5rem;
}
button:focus {
  outline: none;
}
button:hover {
  background-color: #5893d4;
}
.burger:hover {
  background-color: #5893d4;
}
.burger {
  width: 3vh;
  height: 3vh;
  color:  #ceddef;
  align-self: center;
  background-color: #1f3c88;
  border-radius: 100%;
  padding: .25rem;
  cursor: pointer;
  min-width: 1rem;
  min-height: 1rem;
}
h1 {
  color:  #ceddef;
  align-self: center;
  text-align: center;
}
.header {
  background-color: #070d59;
  height: 130px;
  display: flex;
  flex-direction: column;
}
.nav-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 1rem;
  margin-bottom: 1rem;
}
</style>
