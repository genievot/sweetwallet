// import something here
const SSC = require('sscjs')
// "async" is optional
const ssc = new SSC('https://api.steem-engine.com/rpc')
export default async ({ Vue }) => {
  Vue.prototype.$ssc = ssc
}
