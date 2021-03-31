import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('./views/Login.vue')
const Home = () => import('./views/Home.vue')
const Bill = () => import('./views/Bill.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home/Login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'bill',
        name: 'Bill',
        component: Bill
      }]
    }
  ]
})
