<template>

<div class="home">
    <Figma :figma="figmaConfig" v-model="viewModel" />
</div>

</template>

<script>

import Vue from "vue";
import Figma from 'vue-low-code'
import MainService from './../js/MainService'
import imagecustom from '../components/imagecustom.vue'
Vue.use(Figma);


// import JSON file for deployment
// import app from './app.json'

export default {
    name: 'Home',
    data: function() {
        return {
            // figmaJSON: app,
            figmaConfig: {
                figmaFile: 'HOj2i7P5nczItTfOL16vHM',
                figmaAccessKey: '63130-a6c6d21d-8655-4284-ac5e-5ed9e659b025',
            },
            viewModel: {
              username:'',
              password:'',
              searchFilter: '',
              vapers: [],
              newVaper: {
                name: "",
                price: ""
              },
              selectedVaper: {
                name: "",
                price: ""
              },
            },
            components: {
              imagecustom
            },
            config: {
                components: {
                  imagecustom
                }
            }
        }
    },
    components: {},
    methods: {
     onHomeLoad () {
       console.debug('Home.onHomeLoad()')
       MainService.findAll(this.viewModel)
     },
     createNewTodo (e) {
       console.debug('Home.createNewTodo()', e.viewModel.newTodo.name, e.viewModel.newTodo.details)
       MainService.create(e.viewModel.newTodo.name, e.viewModel.newTodo.details)
       e.viewModel.newTodo.name = ''
       e.viewModel.newTodo.details = ''
       return 'Home'
     },
     updateTodo (e) {
       console.debug('Home.updateTodo()', e.viewModel.selectedTodo.name, e.viewModel.selectedTodo.id)
       MainService.update(e.viewModel.selectedTodo.id, e.viewModel.selectedTodo.name, e.viewModel.selectedTodo.details)
       return 'Home'
     },
     deleteTodo (e) {
       console.debug('Home.deleteTodo()', e.viewModel.selectedTodo.name, e.viewModel.selectedTodo.id)
       MainService.delete(e.viewModel.selectedTodo.id)
       return 'Home'
     },
     filterTodo (e) {
       console.debug('Home.filterTodo()', e.viewModel.searchFilter)
       this.viewModel.todos = MainService.findByFilter(e.viewModel.searchFilter)
     },
     login (e) {
       MainService.login(e.viewModel.username, e.viewModel.password)
       return false;
     }
   }
}

</script>
