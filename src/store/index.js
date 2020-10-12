import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board.js'
import { saveStatePlugin, uuid } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin] ,
  state: {
    board,
  },
  mutations: {
    CREATE_TASK (state,{tasks,name}){
      tasks.push({
          name,
          id: uuid(),
          userAssigned: null
        })
    },
    UPDATE_TASK (state, { task, key, value }) {
      //console.log(state,key,value)
      //Vue.set(task)
      task[key] = value 
    }
  },
  getters:{
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) { 
              console.log(task)
              return task
            }
          }
        }
      } 
    }
  },
  actions: {
  },
  modules: {
  }
})
