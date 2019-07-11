// import something here
var steem = require('steem')
// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$steem = steem
}
