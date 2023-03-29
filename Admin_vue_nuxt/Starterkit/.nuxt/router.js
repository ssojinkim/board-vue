import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3cf09a4b = () => interopDefault(import('..\\pages\\Board.vue' /* webpackChunkName: "pages/Board" */))
const _6b882bfc = () => interopDefault(import('..\\pages\\BoardDetail.vue' /* webpackChunkName: "pages/BoardDetail" */))
const _d0ad5f18 = () => interopDefault(import('..\\pages\\BoardUpdate.vue' /* webpackChunkName: "pages/BoardUpdate" */))
const _67401304 = () => interopDefault(import('..\\pages\\BoardWrite.vue' /* webpackChunkName: "pages/BoardWrite" */))
const _973a2d76 = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages/test/index" */))
const _78c7fd83 = () => interopDefault(import('..\\pages\\account\\forgot-password.vue' /* webpackChunkName: "pages/account/forgot-password" */))
const _54ed5f32 = () => interopDefault(import('..\\pages\\account\\login.vue' /* webpackChunkName: "pages/account/login" */))
const _34b49b15 = () => interopDefault(import('..\\pages\\account\\register.vue' /* webpackChunkName: "pages/account/register" */))
const _341d972b = () => interopDefault(import('..\\pages\\auth\\lock-screen.vue' /* webpackChunkName: "pages/auth/lock-screen" */))
const _001fccac = () => interopDefault(import('..\\pages\\auth\\login-1.vue' /* webpackChunkName: "pages/auth/login-1" */))
const _33de308c = () => interopDefault(import('..\\pages\\auth\\recoverpwd.vue' /* webpackChunkName: "pages/auth/recoverpwd" */))
const _4ab6a5ba = () => interopDefault(import('..\\pages\\auth\\register-1.vue' /* webpackChunkName: "pages/auth/register-1" */))
const _0e1edbd7 = () => interopDefault(import('..\\pages\\utility\\404.vue' /* webpackChunkName: "pages/utility/404" */))
const _c0970e26 = () => interopDefault(import('..\\pages\\test\\_id.vue' /* webpackChunkName: "pages/test/_id" */))
const _15cc4352 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Board",
    component: _3cf09a4b,
    name: "Board"
  }, {
    path: "/BoardDetail",
    component: _6b882bfc,
    name: "BoardDetail"
  }, {
    path: "/BoardUpdate",
    component: _d0ad5f18,
    name: "BoardUpdate"
  }, {
    path: "/BoardWrite",
    component: _67401304,
    name: "BoardWrite"
  }, {
    path: "/test",
    component: _973a2d76,
    name: "test"
  }, {
    path: "/account/forgot-password",
    component: _78c7fd83,
    name: "account-forgot-password"
  }, {
    path: "/account/login",
    component: _54ed5f32,
    name: "account-login"
  }, {
    path: "/account/register",
    component: _34b49b15,
    name: "account-register"
  }, {
    path: "/auth/lock-screen",
    component: _341d972b,
    name: "auth-lock-screen"
  }, {
    path: "/auth/login-1",
    component: _001fccac,
    name: "auth-login-1"
  }, {
    path: "/auth/recoverpwd",
    component: _33de308c,
    name: "auth-recoverpwd"
  }, {
    path: "/auth/register-1",
    component: _4ab6a5ba,
    name: "auth-register-1"
  }, {
    path: "/utility/404",
    component: _0e1edbd7,
    name: "utility-404"
  }, {
    path: "/test/:id",
    component: _c0970e26,
    name: "test-id"
  }, {
    path: "/",
    component: _15cc4352,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
