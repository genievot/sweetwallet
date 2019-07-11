<template>
  <q-page class="flex flex-center">
    <q-btn color="green-6" label="Login" @click="doLogin()" />
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    doLogin () {
      function uuidv4 () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
      }
      let stateid = uuidv4
      let url = this.$steemconnectClient.getLoginURL(stateid)
      // console.log(uuidv4())
      // save state token in local storage...
      this.$q.localStorage.set('state', stateid)
      var win = window.open(url, '_blank')
      win.focus()
      // close the app here
    }
  },
  mounted () {
    if (this.$q.localStorage.getItem('state')) {
      // call axios function to get access token
    }
  }
}
</script>

<style>
</style>
