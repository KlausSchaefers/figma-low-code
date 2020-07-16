<template>
  <div class="home">
    <Figma :figma="figmaConfig" v-model="viewModel"/>
  </div>
</template>

<script>
import Vue from "vue";
import Figma from 'vue-low-code'
Vue.use(Figma);

// import JSON file for deployment
// import app form './app.json'

export default {
  name: 'Home',
  data: function () {
    return {
      figmaConfig: {
        figmaFile: '',
        figmaAccessKey: '',
      },
      // pass figmaFile for deployment
      // figmaFile: app
      viewModel: {
        // add your data model here
      },
      config: {
        components: {
          // register custom components here
        }
      }
    }
  },
  components: {
  },
  methods: {
  }
}
</script>
