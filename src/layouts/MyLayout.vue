<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-white" style="background-color: navy" align="center">
      <q-toolbar>
           <q-avatar>
            <img src="statics/swapsteem.jpg">
          </q-avatar>
        <q-toolbar-title class="text-overline">
          SWEET WALLET
        </q-toolbar-title>
                   <q-avatar>
            <q-btn color="indigo" round icon="menu"/>
          </q-avatar>
      </q-toolbar>
    </q-header>
    <q-separator inset/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
