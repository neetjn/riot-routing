import Router from './components/router.riot'
import LinkTo from './components/link-to.riot'

export {
  Router,
  LinkTo
}

export const install = register => {
  register('router', Router);
  register('link-to', LinkTo);
}

