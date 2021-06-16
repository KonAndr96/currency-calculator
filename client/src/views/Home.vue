<template>
  <div>
    <div class="calc-window">
      <div class="left-side">
        <p class="medium-text dark">Please choose the desired amount and currency</p>
        <div class="first-row">
          <select class="select-exchange" v-model="currentExchange">
            <option default>Select an exchange option.</option>
            <option
              v-for="exchange in exchanges"
              :value="exchange"
              :key="exchange._id"
              >
              {{exchange.from}} => {{exchange.to}}
            </option>
          </select>
          <div class="second-row">
            <input
              class=""
              v-model="amount"
              type="number"
              placeholder="Insert currency amount"
            />
            <button
              class="calculate-button"
              @click="calculate"
            >
              <span style="margin: auto auto;">
                Calculate
              </span>
            </button>
          </div>
          <p
            v-if="showError"
            class="error">
            Amount and exchange option should not be empty.
          </p>
        </div>
      </div>
      <div class="right-side">
        <p class="medium-text light">
          {{ calculationData ?  'The result is : ' : 'No results yet!' }}
          </p>
        <p class="large-text light">
          {{ calculationData && `${calculationData.result.toFixed(4)} ${calculationData.to}`}}
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const calculationData = computed(() => store.state.calculationData)
    const exchanges = computed(() => store.state.exchanges)
    const currentExchange = ref('Select an exchange option.')
    const amount = ref(null)
    const showError = ref(false)

    const calculate = async () => {
      // TYPE VALIDATION BEFORE INPUT
      if (currentExchange.value.ratio && amount.value !== null && amount.value !== '0') {
        await store.dispatch('calculate', {
          exchange: currentExchange.value,
          amount: amount.value
        })
        currentExchange.value = 'Select an exchange option.'
        amount.value = null
      } else {
        // SHOW ERROR IF VALIDATION FAILS
        showError.value = true
        setTimeout(() => {
          showError.value = false
        }, 1500)
      }
    }
    // CALLS ASYCHRONOUS ACTION FROM VUEX STORE WHICH FETCHES DATA FROM API
    onMounted(() => {
      store.dispatch('fetchExchanges')
    })
    return {
      calculationData,
      exchanges,
      currentExchange,
      amount,
      calculate,
      showError
    }
  }
}
</script>

<style scoped>
.error {
  color: #5893D4;
  font-weight: 700;
}
.second-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 1%;
}
.calculate-button {
  width: 38%;
  height: 4vh;
  color: #CEDDEF;
  background-color: #1f3c88;
  border: none;
  border-radius: 8px;
  cursor:pointer;
}
.calculate-button:hover {
  background-color: #5893D4;
}
input {
  width: 38%;
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
.calc-window {
  width: 50vw;
  height: 50vh;
  background-color: #CEDDEF;
  border: solid;
  border-color: #070D59;
  border-radius: 16px;
  align-self: center;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.right-side {
  background-color: #1F3C88;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.left-side {
  width: 50%;
  height: 100%;
  border-right: solid;
  border-right-color: #070D59;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 .5rem;
}
p {
  text-align: center;
  flex-wrap: wrap;
}
.large-text {
  font-size: 2.5rem;
  flex-wrap: wrap;
  overflow-wrap: break-word;
}
.medium-text {
  font-size: 2rem;
}
.light {
  color: #CEDDEF;
}
.dark {
  color: #1F3C88;
}
.select-exchange:focus {
  outline:none;
}
.select-exchange {
  width: 80%;
  height: 4vh;
  align-self: center;
  border-color: #1F3C88;
  border-width: 2px;
  border-radius: 16px;
  padding: .25rem .5rem;
  color: #1F3C88;
}
.first-row {
  display: flex;
  flex-direction: column;
}
</style>
