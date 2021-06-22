<template>
<div class="window-wrapper">
  <div  class="dialog-wrapper">
    <div class="title-wrapper">
      <p>Login</p>
    </div>
    <div class="input-wrapper">
      <input
        type="text"
        placeholder="Username"
        v-model="username"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <div class="actions-wrapper">
      <button
        @click="handleCancel"
        class="cancel-button">
        Cancel
      </button>
      <button
        @click="handleLogin"
        class="submit-button">
        Login
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    // const jwt = computed(() => store.state.jwt)

    //  STRIPS THE USER OF ANY AUTHORIZING PARAMS. RELOGIN IS NEEDED TO REGAIN AUTHORIZATION.
    onMounted(() => {
      store.commit('UNAUTHORIZE')
    })

    // FALLBACK TO HOME PAGE.NO AUTH NEEDED FOR SIMPLE CALCULATIONS.
    const handleCancel = () => {
      username.value = ''
      password.value = ''
      router.push('/')
    }

    //  CALLS ASYNCHRONOUS ACTION FROM VUEX STORE THAT ATTEMPS FETCHING OF JWT.
    const handleLogin = async () => {
      await store.dispatch('login', {
        username: username.value,
        password: password.value
      })
      username.value = ''
      password.value = ''
      router.push('/')
      // IF JWT IS FOUND , USER IS AUTHORIZED AND REDIRECTED TO HOME PAGE WITH ADMIN PRIVILAGES.
      // if (jwt.value) {
      //   store.commit('AUTHORIZE')
      // }
    }
    return {
      handleCancel,
      username,
      password,
      handleLogin
    }
  }
}
</script>

<style scoped>
.submit-button {
  width: 38%;
  height: 4vh;
  color: #CEDDEF;
  background-color: #070D59;
  border: none;
  border-radius: 8px;
  cursor:pointer;
}
.submit-button:hover {
  background-color: #1f3c88;
}
.cancel-button {
  width: 38%;
  height: 4vh;
  color: #070D59;
  background-color: #CEDDEF;
  border: 2px solid #070D59;
  border-radius: 8px;
  cursor:pointer;
}
.cancel-button:hover {
  background-color: white;
}
.actions-wrapper {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5rem;
}
.title-wrapper {
  background-color: #070D59;
  color: #CEDDEF;
  text-align: center;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: .5;
}
.window-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: auto auto;
}
.dialog-wrapper {
  width: 30vw;
  height: 35vh;
  background-color: #CEDDEF;
  border: solid;
  border-color: #070D59;
  border-radius: 16px;
  margin: 20vh 31vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
input {
  width: 80%;
  height: 3.5vh;
  justify-self: center;
  margin-right: 2%;
  border-radius: 16px;
  border-style: solid;
  border-color: #1F3C88;
  color: #1F3C88;
  text-align: center;
}
input:focus {
  outline: none;
}
</style>
