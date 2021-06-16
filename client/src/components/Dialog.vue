<template>
<div v-if="isOpen" class="window-wrapper">
  <div  class="dialog-wrapper">
    <div class="title-wrapper">
      <p>{{ exchangeId ? 'Update' : 'Create'}} Exchange</p>
    </div>
    <div class="input-wrapper">
      <input
        type="text"
        placeholder="Insert base currency"
        v-model="baseCur"
      />
      <input
        type="text"
        placeholder="Insert target currency"
        v-model="targetCur"
      />
      <input
        type="number"
        placeholder="Insert currency ratio"
        v-model="ratio"
      />
    </div>
     <p
      v-if="showError"
      class="error">
      Input fields should not be empty.
    </p>
    <div class="actions-wrapper">
      <button class="cancel-button" @click="toggleDialog">Cancel</button>
      <button class="submit-button" @click="submit">Submit</button>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Dialog',
  setup () {
    const store = useStore()
    const isOpen = ref(false)
    const baseCur = ref('')
    const targetCur = ref('')
    const ratio = ref(null)
    const exchangeId = ref(false)
    const showError = ref(false)

    // EXCHANGE PARAM IS PASSED ALONG FROM MANAGE COMPONENT VIA REF.FALLBACK VALUE IS FALSE IN CASE EXCHANGE DOES NOT EXIST E.G : WHEN CREATEING.
    const toggleDialog = (exchange = false) => {
      isOpen.value = !isOpen.value
      baseCur.value = exchange?.from
      targetCur.value = exchange?.to
      ratio.value = exchange?.ratio
      exchangeId.value = exchange?._id
    }
    const submit = async () => {
      // EMPTY INPUT VALUE VALIDATION.
      if (baseCur.value && targetCur.value && ratio.value) {
        exchangeId.value
          ? await store.dispatch('updateExchange', {
            from: baseCur.value,
            to: targetCur.value,
            ratio: ratio.value,
            id: exchangeId.value
          })
          // APPROPRIATE ACTION IS DISPATCHED DEPENDING ON THE EXISTANCE OF ID E.G : WHEN CREATING ID PARAM IS ABCENT
          : await store.dispatch('createExchange', {
            from: baseCur.value,
            to: targetCur.value,
            ratio: ratio.value,
            id: exchangeId.value
          })
        isOpen.value = false
      } else {
        showError.value = true
        setTimeout(() => {
          showError.value = false
        }, 1500)
      }
    }
    // WATCHER RESETS ALL THE LOCAL DATA AS SOON AS DIALOG CLOSES.
    watch(isOpen, (newValue) => {
      if (newValue === false) {
        baseCur.value = ''
        targetCur.value = ''
        ratio.value = null
        exchangeId.value = false
      }
    })

    return {
      isOpen,
      toggleDialog,
      baseCur,
      targetCur,
      ratio,
      submit,
      exchangeId,
      showError
    }
  }
}
</script>

<style scoped>
.error {
  color: #5893D4;
  font-weight: 700;
  align-self: center;
}
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
  position: fixed;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
