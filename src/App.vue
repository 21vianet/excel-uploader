<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ExcelEditor></ExcelEditor>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import ExcelEditor from '@21vianet/excel-editor'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ExcelEditor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
