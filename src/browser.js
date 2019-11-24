import Router from './components/router.riot'
import LinkTo from './components/link-to.riot'

const RiotRouting = {
  install: register => {
    register('router', Router)
    register('link-to', LinkTo)
  }
}

module.exports = RiotRouting
