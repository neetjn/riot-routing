const Router = require('core-routing/dist/router.prod.js')

const navigatePath = (path) => {
  window.location.hash = `#!${path}`
}

const matchRoute = (e, routes) => {
  return routes.find(r => {
    return r.path.find(path => {
      return e.$tools.match(e.location.path, path)
    })
  })
}

const RouteState = (route, details) => {
  return {
    source: route,
    args: details.variables,
    qargs: details.args
  }
}

class RouterClient {

  // public $root: Component
  // public state: Array<RouteState>
  // public routes: Array<Object>

  constructor (root) {
    this.$root = root
    this.state = []
    this.routes = root.props.routes.map(route => {
      return Object.freeze(
        Object.assign({}, route, {
          path: Array.isArray(route.path) ? [...route.path] : [route.path],
        })
      )
    })
    this.router = new Router({
      client: {
        onNavigate: this.onNavigate.bind(this),
        onStart: this.onStart.bind(this)
      }
    })
  }

  get route() {
    return this.state.length ? this.state.slice(-1)[0] : null
  }

  set route(routeState) {
    this.state.push(routeState)
    this.$root.update()
  }

  onNavigate(e) {
    const route = matchRoute(e, this.routes)
    if (route) {
      const details = e.$tools.process(e.location.path, route.path[0])
      if (route.test) {
        const transition = (path = null) => {
          if (path) {
            navigatePath(route)
          } else {
            this.route = RouteState(route, details)
          }
        }
        route.test({args: details.variables, qargs: details.args}, transition)
      } else {
        this.route = RouteState(route, details)
      }
    } else {
      this.state.push(null)
      if (this.$root.props.fallback) {
        navigatePath(this.$root.props.fallback)
      }
    }
  }

  onStart(e) {
    if (this.$root.props.default && !e.location.hash) {
      navigatePath(this.$root.props.default)
    } else {
      this.onNavigate(e)
    }
  }

}

module.exports = {
  RouterClient
}
