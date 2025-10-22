// 路由配置
export const routes = {
  home: {
    name: 'HomeView',
    path: '/',
    title: '首页'
  },
  game: {
    name: 'GameView',
    path: '/game',
    title: '游戏'
  },
  login: {
    name: 'LoginView',
    path: '/login',
    title: '登录'
  },
  ranking: {
    name: 'RankingView',
    path: '/ranking',
    title: '排行榜'
  }
}

export const router = {
  currentRoute: ref('home'),
  
  navigate(routeName) {
    if (routes[routeName]) {
      this.currentRoute.value = routeName
      document.title = `${routes[routeName].title} - Vue寻宝游戏`
    }
  },
  
  getCurrentRoute() {
    return routes[this.currentRoute.value]
  }
}
