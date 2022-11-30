<template>
  <a-layout class="layout">
    <TheNavbar/>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <TheFooter/>
  </a-layout>
</template>

<script setup>
import TheNavbar from './TheNavbar'
import TheFooter from './TheFooter'

</script>

<style scoped>

</style>