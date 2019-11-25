const Router = require('./components/router.riot')
const LinkTo = require('./components/router.riot')

const RiotRouting = {
  install: register => {
    register('router', Router)
    register('link-to', LinkTo)
  }
}

module.exports = RiotRouting
