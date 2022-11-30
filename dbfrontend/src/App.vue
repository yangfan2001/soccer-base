<template>
  <!--The back to  top button-->
  <a-back-top style="font-size: 40px">
    <up-square-outlined/>
  </a-back-top>

  <TheLayout/>
</template>

<script setup>
import {UpSquareOutlined} from "@ant-design/icons-vue";
import TheLayout from './layout/TheLayout'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
