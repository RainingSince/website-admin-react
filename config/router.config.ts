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
    path: '/edit',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/edit', name: '编辑', component: './DetailEdit' },
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
        path: '/project',
        name: '项目管理',
        icon: 'project',
        component: './Projects',
      },
      {
        path: '/catalog',
        name: '分类管理',
        icon: 'appstore',
        component: './Article/Catalog',
      },
      {
        path: '/tags',
        name: '标签管理',
        icon: 'tags',
        component: './Article/Tags',
      },
      {
        path: '/article',
        icon: 'snippets',
        name: '文章管理',
        component: './Article/ArticleDetail',
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
