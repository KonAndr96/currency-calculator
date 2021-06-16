<template>
  <div class="drawer">
    <div class="menu-wrapper">
      <router-link to="/" class="link">
      <div class="menu-option">
        <p>CALCULATOR</p>
      </div>
      </router-link>
      <router-link to="/admin/manage" class="link">
      <div class="menu-option">
        <p>MANAGE EXCHANGES</p>
      </div>
      </router-link>
      <div @click="logout" class="menu-option">
        <p>LOGOUT</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'MenuDrawer',
  setup () {
    const router = useRouter()
    const logout = async () => {
      router.push('/login')
    }
    return { logout }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
.drawer {
  height:calc(100vh - 130px);
  background-color: #1f3c88;
  position: absolute;
  width: 15vw;
  z-index: 999;
}
.menu-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
}
.menu-option {
  background-color: #070D59;
  padding: 1rem;
  cursor: pointer;
}
.menu-option:hover {
  background-color: #5893D4;
}
p {
  color: #CEDDEF;
  font-weight: 700;
  text-align: center;
}
</style>
