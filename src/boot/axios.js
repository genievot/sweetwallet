// import something here
const axios = require('axios')
// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}
