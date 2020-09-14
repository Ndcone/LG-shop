import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isShowTab: true,
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('../views/classify/classify.vue'),
    meta: {
      isShowTab: true,
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      isShowTab: true,
    }
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    component: () => import('../views/login/child/Loginpage.vue'),
    meta: {
      isShowTab: false,
    }
  }, {
    path: '/datapage',
    name: 'datapage',
    component: () => import('../views/login/child/datapage.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/shopcard',
    name: 'shopcard',
    component: () => import('../views/Shopcard/shopcard.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/submitcard',
    name: 'submitcard',
    component: () => import('../views/Shopcard/child/submitcard.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/address/address.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/area',
    name: 'area',
    component: () => import('../views/address/child/area.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('../views/payment/payment.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/finishpay',
    name: 'finishpay',
    component: () => import('../views/payment/child/finishpay.vue'),
    meta: {
      isShowTab: false,
    }
  },
  {
    path: '/getorderstate',
    name: 'getorderstate',
    component: () => import('../views/payment/child/getorderstate.vue'),
    meta: {
      isShowTab: false,
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
