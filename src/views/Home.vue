<template>
  <div class="home">
    <Figma :figma="figmaFile" v-model="viewModel"/>
  </div>
</template>

<script>
import Vue from "vue";
import Figma from 'vue-low-code'
Vue.use(Figma);

export default {
  name: 'Home',
  data: function () {
    return {
      figmaConfig: {
        figmaFile: '',
        figmaAccessKey: '',
      },
      viewModel: {
      }
    }
  },
  components: {
  },
  methods: {
  }
}
</script>
