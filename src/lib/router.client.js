const Router = require('core-routing/dist/router.prod.js')

const navigatePath = path => {
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

const RouterClient = rootComponent => {
  const stateHistory = []

  const routes = rootComponent.props.routes.map(route => {
    return Object.freeze(
      Object.assign({}, route, {
        path: Array.isArray(route.path) ? [...route.path] : [route.path]
      })
    )
  })

  const pushState = routeState => {
    stateHistory.push(routeState)
    rootComponent.update()
  }

  const onNavigate = e => {
    const route = matchRoute(e, routes)
    if (route) {
      const details = e.$tools.process(e.location.path, route.path[0])
      if (route.test) {
        const transition = (path = null) => {
          if (path) {
            navigatePath(route)
          } else {
            pushState(RouteState(route, details))
          }
        }
        route.test({ args: details.variables, qargs: details.args }, transition)
      } else {
        pushState(RouteState(route, details))
      }
    } else {
      stateHistory.push(null)
      if (rootComponent.props.fallback) {
        navigatePath(rootComponent.props.fallback)
      }
    }
  }

  const onStart = e => {
    if (rootComponent.props.default && !e.location.hash) {
      navigatePath(rootComponent.props.default)
    } else {
      onNavigate(e)
    }
  }

  const router = new Router({
    client: {
      onNavigate: onNavigate,
      onStart: onStart
    }
  })

  return {
    router,
    get state() {
      return stateHistory.length ? stateHistory.slice(-1)[0] : null
    },
    stateHistory
  }
}

module.exports = {
  RouterClient
}
