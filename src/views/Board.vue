<template>
  <div class="board">
    <div class="flex flex-row flex-start">

      <div class="column" v-for="(column,$columnIndex) of board.columns" :key="$columnIndex">
          <div class="flex items-center mb-2">
            {{column.name}}
          </div>
          <div class="list-reset">
            <div class="task" 
                 v-for="(task, $taskIndex) of column.tasks"
                 :key="$taskIndex"
                 @click="goToTask(task)"
            >
            <span class="w-full flex-no-shrink font-bold">
              {{task.name}}
            </span>
            
            <p v-if="task.description" class="w-full flex-no-shrink font-bold">
              {{task.description}}
            </p>
            </div>
            <input 
              type="text"
              class="block p-2 w-full bg-transparent"
              placeholder="+ Add new tasks"
              @keyup.enter="createTask($event, column.tasks)"
            >
          </div>

          <div 
            class="task-bg"
            v-if="isTaskOpen"
            @click.self="close"
          >
              <router-view />
          </div>
        

      </div>
    </div>


      
  </div>
</template>

<script>
// eslint-disable
import { mapState } from 'vuex'


export default {
  computed:{ 
      ...mapState(['board']),
      isTaskOpen(){
        return this.$route.name === 'task'
      }
    },
    methods:{
      goToTask(task){
        return this.$router.push({name:'task', params: { id : task.id }})
      },
      close(){
        return this.$router.push({name:'Home'})
      },
      createTask(e, tasks){
        this.$store.commit('CREATE_TASK',{
          tasks,
          name: e.target.value
        })
        e.target.value = ''
      }
    }
}

</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
