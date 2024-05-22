import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta:{
      requireAuth:true,
    }
  },
  {
    path: '/indexManager',
    name: 'indexManager',
    component: () => import('../views/indexManager'),
  },
  {
    path: '/market',
    name: 'indexManager',
    component: () => import('../views/market'),
  },
  {
    path: '/mygoods',
    name: 'mygoods',
    component: () => import('../views/mygoods'),
  },
  {
    path: '/market',
    name: 'market',
    component: () => import('../views/market'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users'),
  },
  {
    path: '/managers',
    name: 'managers',
    component: () => import('../views/managers'),
  },
  {
    path: '/goodsManage',
    name: 'goodsManage',
    component: () => import('../views/goodsManage'),
  },
]

localStorage.setItem("baseURL", "http://127.0.0.1:8000/")


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("session_id")) {
    console.log(sessionStorage.getItem("session_id"))
    if (to.path === '/') {
      alert("请退出登录后操作！")
      next('/index');
    } else {
      next();
    }
  } else {
    if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
    } else { // 否则 跳转到登录页面
      alert("请先进行登录！")
      next({ path: '/' });
    }
  }
});

export default router
