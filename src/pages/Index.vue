<template>
  <q-page class="flex flex-center">
    sweet
  </q-page>
</template>
<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    if (!this.$q.localStorage.getItem('auth_token')) {
      this.$router.push('login')
    }
    console.log(this.$q.localStorage.getItem('auth_token'))
    // add method handling if auth token not returning data(expired...)
  }
}
</script>
