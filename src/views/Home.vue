<template>

<div class="home">
    <Figma :figma="figmaConfig" v-model="viewModel" :config="config"/>
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
            config: {
                components: {
                  'imagecustom':imagecustom
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
     createNewVaper (e) {
       console.debug('Home.createNewVaper()', e.viewModel.newVaper.name)
       MainService.create(e.viewModel.newVaper)
       e.viewModel.newVaper={}
       return 'Home'
     },
     updateVaper (e) {
       console.debug('Home.updateVaper()', e.viewModel.selectedVaper.name, e.viewModel.selectedVaper.id)
       MainService.update(e.viewModel.selectedVaper)
       return 'Home'
     },
     deleteVaper (e) {
       console.debug('Home.deleteVaper()', e.viewModel.selectedVaper.name, e.viewModel.selectedVaper.id)
       MainService.delete(e.viewModel.selectedVaper._id)
       return 'Home'
     },
     filterVaper (e) {
       console.debug('Home.filterVaper()', e.viewModel.searchFilter)
       this.viewModel.vapers = MainService.findByFilter(e.viewModel.searchFilter)
     },
     login (e) {
       MainService.login(e.viewModel.username, e.viewModel.password)
       return false;
     }
   }
}

</script>
