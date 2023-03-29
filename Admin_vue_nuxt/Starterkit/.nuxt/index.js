import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_103cd318 from 'nuxt_plugin_plugin_103cd318' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_f0ecc32c from 'nuxt_plugin_bootstrapvue_f0ecc32c' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_pluginclient_8f623064 from 'nuxt_plugin_pluginclient_8f623064' // Source: .\\content\\plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_1e085956 from 'nuxt_plugin_pluginserver_1e085956' // Source: .\\content\\plugin.server.js (mode: 'server')
import nuxt_plugin_fakeauth_71f68924 from 'nuxt_plugin_fakeauth_71f68924' // Source: ..\\plugins\\fakeauth.js (mode: 'all')
import nuxt_plugin_fireauth_22211b23 from 'nuxt_plugin_fireauth_22211b23' // Source: ..\\plugins\\fireauth.js (mode: 'all')
import nuxt_plugin_i18n_1fba523a from 'nuxt_plugin_i18n_1fba523a' // Source: ..\\plugins\\i18n.js (mode: 'all')
import nuxt_plugin_simplebar_28d69fac from 'nuxt_plugin_simplebar_28d69fac' // Source: ..\\plugins\\simplebar.js (mode: 'all')
import nuxt_plugin_vueclickoutside_6e1f4574 from 'nuxt_plugin_vueclickoutside_6e1f4574' // Source: ..\\plugins\\vue-click-outside.js (mode: 'all')
import nuxt_plugin_vueapexcharts_7410a43a from 'nuxt_plugin_vueapexcharts_7410a43a' // Source: ..\\plugins\\vue-apexcharts.js (mode: 'all')
import nuxt_plugin_vuelidate_4be431c8 from 'nuxt_plugin_vuelidate_4be431c8' // Source: ..\\plugins\\vuelidate.js (mode: 'all')
import nuxt_plugin_vueslidebar_42b261f8 from 'nuxt_plugin_vueslidebar_42b261f8' // Source: ..\\plugins\\vue-slidebar.js (mode: 'all')
import nuxt_plugin_vuelightbox_36530636 from 'nuxt_plugin_vuelightbox_36530636' // Source: ..\\plugins\\vue-lightbox.js (mode: 'all')
import nuxt_plugin_vuechartist_55dc628e from 'nuxt_plugin_vuechartist_55dc628e' // Source: ..\\plugins\\vue-chartist.js (mode: 'all')
import nuxt_plugin_vuemask_08817de4 from 'nuxt_plugin_vuemask_08817de4' // Source: ..\\plugins\\vue-mask.js (mode: 'all')
import nuxt_plugin_vuegooglemap_75fccaf1 from 'nuxt_plugin_vuegooglemap_75fccaf1' // Source: ..\\plugins\\vue-googlemap.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Responsive Bootstrap 5 Admin Dashboard"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_103cd318 === 'function') {
    await nuxt_plugin_plugin_103cd318(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_f0ecc32c === 'function') {
    await nuxt_plugin_bootstrapvue_f0ecc32c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_8f623064 === 'function') {
    await nuxt_plugin_pluginclient_8f623064(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_1e085956 === 'function') {
    await nuxt_plugin_pluginserver_1e085956(app.context, inject)
  }

  if (typeof nuxt_plugin_fakeauth_71f68924 === 'function') {
    await nuxt_plugin_fakeauth_71f68924(app.context, inject)
  }

  if (typeof nuxt_plugin_fireauth_22211b23 === 'function') {
    await nuxt_plugin_fireauth_22211b23(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_1fba523a === 'function') {
    await nuxt_plugin_i18n_1fba523a(app.context, inject)
  }

  if (typeof nuxt_plugin_simplebar_28d69fac === 'function') {
    await nuxt_plugin_simplebar_28d69fac(app.context, inject)
  }

  if (typeof nuxt_plugin_vueclickoutside_6e1f4574 === 'function') {
    await nuxt_plugin_vueclickoutside_6e1f4574(app.context, inject)
  }

  if (typeof nuxt_plugin_vueapexcharts_7410a43a === 'function') {
    await nuxt_plugin_vueapexcharts_7410a43a(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_4be431c8 === 'function') {
    await nuxt_plugin_vuelidate_4be431c8(app.context, inject)
  }

  if (typeof nuxt_plugin_vueslidebar_42b261f8 === 'function') {
    await nuxt_plugin_vueslidebar_42b261f8(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelightbox_36530636 === 'function') {
    await nuxt_plugin_vuelightbox_36530636(app.context, inject)
  }

  if (typeof nuxt_plugin_vuechartist_55dc628e === 'function') {
    await nuxt_plugin_vuechartist_55dc628e(app.context, inject)
  }

  if (typeof nuxt_plugin_vuemask_08817de4 === 'function') {
    await nuxt_plugin_vuemask_08817de4(app.context, inject)
  }

  if (typeof nuxt_plugin_vuegooglemap_75fccaf1 === 'function') {
    await nuxt_plugin_vuegooglemap_75fccaf1(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
