# Vue寻宝游戏 - 三层架构重构

## 项目简介
这是一个使用Vue 3重构的寻宝游戏，采用三层架构设计，包含用户管理和排行榜功能。

## 技术栈
- Vue 3 (Composition API)
- 原生JavaScript (无构建工具)
- CSS3 (响应式设计)
- LocalStorage (数据持久化)

## 项目结构
```
web8/
├── index.html              # 主入口文件
├── package.json            # 项目配置
├── README.md              # 项目说明
└── src/
    ├── components/         # 组件层
    │   ├── GameMap.vue
    │   ├── LocationDetail.vue
    │   ├── TreasureHunt.vue
    │   ├── UserLogin.vue
    │   └── RankingList.vue
    ├── views/             # 视图层
    │   ├── HomeView.vue
    │   ├── GameView.vue
    │   ├── LoginView.vue
    │   └── RankingView.vue
    ├── stores/            # 状态管理层
    │   ├── gameStore.js
    │   ├── userStore.js
    │   └── audioStore.js
    ├── router/            # 路由配置
    │   └── index.js
    └── assets/            # 静态资源
        ├── images/
        ├── audio/
        └── styles/
```

## 三层架构说明

### 1. 视图层 (Views)
- **HomeView**: 首页视图
- **GameView**: 游戏主界面
- **LoginView**: 用户登录/注册
- **RankingView**: 排行榜页面

### 2. 组件层 (Components)
- **GameMap**: 游戏地图组件
- **LocationDetail**: 地点详情组件
- **TreasureHunt**: 寻宝游戏组件
- **UserLogin**: 用户登录组件
- **RankingList**: 排行榜列表组件

### 3. 状态管理层 (Stores)
- **gameStore**: 游戏状态管理
- **userStore**: 用户状态管理
- **audioStore**: 音频状态管理

## 功能特性
- 🎮 完整的寻宝游戏体验
- 👤 用户注册和登录系统
- 🏆 排行榜功能
- 🎵 背景音乐和环境音效
- 📱 响应式设计
- 💾 本地数据持久化

## 运行方式
直接打开 `index.html` 文件在浏览器中运行，无需安装任何依赖。

## 开发说明
项目使用Vue 3的Composition API，通过CDN方式引入，适合学习和演示Vue的三层架构设计。