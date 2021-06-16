import { createStore } from 'vuex'
import axios from 'axios'

// ESTABLISHES BASE URL FOR AXIOS LIBRARY AND LOCAL STORAGE API.
axios.defaults.baseURL = 'http://localhost:5000'
const localStorage = window.localStorage
const token = localStorage.getItem('jwt')

export default createStore({
  state: {
    isAuthorized: false,
    isDrawerOpen: false,
    exchanges: [],
    calculationData: null,
    jwt: token ?? false
  },
  mutations: {
    UNAUTHORIZE (state) {
      state.isAuthorized = false
      state.isDrawerOpen = false
      state.jwt = false
      localStorage.clear()
    },
    AUTHORIZE (state, jwt) {
      // JWT IS SAVED TEMPORARILY IN LOCAL STORAGE TO PREVENT APP BREAKING ON PAGE RELOAD.
      state.isAuthorized = true
      state.jwt = jwt
      localStorage.setItem('jwt', jwt)
    },
    TOGGLE_DRAWER (state) {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    SET_EXCHANGES (state, exchanges) {
      state.exchanges = exchanges
    },
    SET_CALCULATION_DATA (state, calculationData) {
      state.calculationData = calculationData
    },
    ADD_EXCHANGE (state, exchange) {
      state.exchanges.push(exchange)
    },
    UPDATE_EXCHANGE (state, { data, id }) {
      const index = state.exchanges.findIndex(exchange => exchange._id === id)
      state.exchanges[index] = data
    },
    DELETE_EXCHANGE (state, id) {
      const index = state.exchanges.findIndex(exchange => exchange._id === id)
      state.exchanges.splice(index, 1)
    }
  },
  actions: {

    async login ({ commit }, { username, password }) {
      try {
        const response = await axios.post('/auth/login', { username, password })
        commit('AUTHORIZE', response.data.token)
      } catch (err) {
        console.log(err)
      }
    },

    async fetchExchanges ({ commit }) {
      try {
        const response = await axios.get('/exchanges')
        commit('SET_EXCHANGES', response.data)
      } catch (err) {
        console.log(err)
      }
    },

    async calculate ({ commit }, { exchange, amount }) {
      try {
        const response = await axios.post('/calculate', {
          from: exchange.from,
          to: exchange.to,
          ratio: exchange.ratio,
          amount: Number(amount)
        })
        commit('SET_CALCULATION_DATA', response.data)
      } catch (err) {
        console.log(err)
      }
    },

    async createExchange ({ commit, state }, { from, to, ratio }) {
      // PROTECTED ROUTE.JWT IN REQUEST HEADERS IS NEEDED FOR THE SERVER TO AUTHORIZE THE REQUEST.
      try {
        const response = await axios.post('/exchange/create',
          {
            from: from,
            to: to,
            ratio: ratio
          },
          {
            headers:
             {
               Authorization: `Bearer ${state.jwt}`
             }
          }
        )
        // NEW  EXCHANGE OBJECT IS PUSHED TO EXCHANGES PIECE OF STATE FOR REAL-TIME UPDATE IN UI
        commit('ADD_EXCHANGE', response.data)
      } catch (err) {
        console.log(err)
      }
    },

    async updateExchange ({ commit, state }, { from, to, ratio, id }) {
      // PROTECTED ROUTE.JWT IN REQUEST HEADERS IS NEEDED FOR THE SERVER TO AUTHORIZE THE REQUEST.
      try {
        const response = await axios.patch(`/exchange/update/${id}`,
          {
            from: from,
            to: to,
            ratio: ratio
          },
          {
            headers:
              {
                Authorization: `Bearer ${state.jwt}`
              }
          })
        // NEW UPDATED VALUE OF EXCHANGE OBJECT IS SAVED IN EXCHANGES PIECE OF STATE FOR REAL-TIME UPDATE IN UI
        commit('UPDATE_EXCHANGE', { data: response.data, id: id })
      } catch (err) {
        console.log(err)
      }
    },

    deleteExchange ({ commit, state }, id) {
      // PROTECTED ROUTE.JWT IN REQUEST HEADERS IS NEEDED FOR THE SERVER TO AUTHORIZE THE REQUEST.
      axios.delete(`/exchange/delete/${id}`, {
        headers:
          {
            Authorization: `Bearer ${state.jwt}`
          }
      })
        .then(() => {
          // TARGETED EXCHANGE IS INSTANTLY REMOVED FROM THE TABLE IN REAL-TIME
          commit('DELETE_EXCHANGE', id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {}
})
