export default [

  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: '登录', component: './Login' },
    ],
  },
  {
    path: '/article/edit',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/article/edit', name: '编辑', component: './Article/ArticleEdit' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: '首页',
        icon: 'home',
        component: './Home',
      },
      {
        path: '/article',
        name: '文章管理',
        icon: 'snippets',
        routes: [
          {
            path: '/article/catalog',
            name: '分类管理',
            component: './Article/Catalog',
          },
          {
            path: '/article/tags',
            name: '标签管理',
            component: './Article/Tags',
          },
          {
            path: '/article/detail',
            name: '详情管理',
            component: './Article/ArticleDetail',
          },
        ],
      },
      {
        path: '/system',
        name: '系统设置',
        icon: 'setting',
        authority: ['permissions:manage', 'roles:manage', 'users:manage'],
        routes: [
          {
            path: '/system/permission',
            name: '权限设置',
            component: './System/Permission',
            authority: ['permissions:manage'],
          },
          {
            path: '/system/role',
            name: '角色设置',
            component: './System/Role',
            authority: ['roles:manage'],
          },
          {
            path: '/system/user',
            name: '用户设置',
            component: './System/User',
            authority: ['users:manage'],
          },
        ],
      },
    ],
  },
];
