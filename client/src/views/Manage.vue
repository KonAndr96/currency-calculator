<template>
<div>
  <div class="manager-window">
    <div
    class="list-banner"
    >
    <div class="properties">
      <p>No.</p>
      <p class="item-title">Title</p>
      <p>Ratio</p>
      </div>
      <div class="options">
        <CreateIcon
          @click="openDialog"
          class="add-icon"
        />
      </div>
    </div>
    <div
    v-for="(exchange,index) in exchanges"
    :key="exchange._id"
    class="list-item">
    <div class="properties">
      <p>{{index+1}}</p>
      <p class="item-title">{{exchange.from}} => {{exchange.to}}</p>
      <p>{{exchange.ratio}}</p>
      </div>
      <div class="options">
        <UpdateIcon
          @click="openDialog(exchange)"
          class="option"
        />
         <DeleteIcon
          @click="deleteExchange(exchange._id)"
          class="option"
        />
      </div>
    </div>
  </div>
<!-- COMPONENT REF IS USED  -->
<Dialog ref="dialog" />
</div>
</template>

<script>
import CreateIcon from '../components/Icons/CreateIcon.vue'
import UpdateIcon from '../components/Icons/UpdateIcon.vue'
import DeleteIcon from '../components/Icons/DeleteIcon.vue'
import Dialog from '../components/Dialog.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Manage',
  components: { DeleteIcon, CreateIcon, UpdateIcon, Dialog },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchExchanges')
    })
    const dialog = ref(null)
    const exchanges = computed(() => store.state.exchanges)

    // REMOTELY FIRES 'TOGGLE DIALOG' METHOD FROM REFERENCED COMPONENT. REF IS USED FOR ADDED REUSABILITY OF THE COMPONENT.
    const openDialog = (exchange) => {
      dialog.value.toggleDialog(exchange)
    }

    // DISPATCHES VUEX ACTION ALONG WITH NEEDED PARAMS. ACCESS TO 'ID' PARAM IS GAINED FROM V-FOR DIRECTIVE USED IN THE TEMPLATE ---^
    const deleteExchange = (id) => {
      store.dispatch('deleteExchange', id)
    }

    return {
      exchanges,
      dialog,
      openDialog,
      deleteExchange
    }
  }
}
</script>

<style scoped>
p {
  font-weight: 700;
}
.add-icon {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}
.manager-window {
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 0 auto;
  max-width: 60vw;
  max-height: 60vh;
  width: 60vw;
  height: auto;
  overflow: auto;
  background-color: #CEDDEF;
  border: solid #070D59;
  border-radius: 16px;
}
.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
  background-color: #5893D4;
  color: #CEDDEF;
  border-top: 1px solid #070D59
}
.list-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
  background-color: #070D59;
  color: #CEDDEF;
}
.properties {
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  padding-left: .5rem;
}
.options {
  padding-right: .5rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  width: 8%;
}
.option {
    width: 1.25rem;
    height: 1.25rem;
    color:#070D59;
    cursor: pointer;
}
.option:hover {
    transform: scale(120%);
}
</style>
