import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'

import image from './modules/image' // 子目录不多暂不单独创建文件

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@mainView/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@mainView/error-page/404'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@pages/login/main'),
    hidden: true
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '/',
        component: () => import('@mainView/home'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'home',
          noCache: true,
          affix: true,
          module: 'Home',
          request: {}
        }
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    redirect: '/image',
    meta: {
      title: '图片处理',
      icon: 'picture'
    },
    children: [
      {
        path: 'downAndUp',
        component: () => import('@mainView/image/downAndUp'),
        name: 'downAndUp',
        meta: {
          title: '上传下载',
          icon: 'upload',
          noCache: true,
          module: 'downAndUp',
          request: {
            list: 'list'
          }
        }
      },
      {
        path: 'home2',
        component: () => import('@mainView/test'),
        name: 'home2',
        meta: {
          title: '头像更换',
          icon: 'star',
          noCache: true,
          module: 'home2',
          request: {}
        }
      }
    ]
  },
  {
    path: '/verify',
    component: Layout,
    redirect: '/verify',
    children: [
      {
        path: '/verify',
        component: () => import('@mainView/verify'),
        name: 'verify',
        meta: {
          title: '人机验证',
          icon: 'upload',
          noCache: true,
          module: 'verify'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test',
    children: [
      {
        path: '/test',
        component: () => import('@mainView/test'),
        name: 'test',
        meta: {
          title: '测试页',
          icon: 'iconshouye',
          noCache: true,
          module: 'test',
          request: {}
        }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@mainView/test'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 重新实例化一个新的路由，替换之前的路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
