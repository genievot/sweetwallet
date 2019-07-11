// import something here
var steemconnect = require('steemconnect')
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  var client = new steemconnect.Client({
    app: 'staging.app',
    callbackURL: 'http://localhost:3000/login',
    scope: ['vote', 'comment']
  })
  Vue.prototype.$steemconnectClient = client
}
