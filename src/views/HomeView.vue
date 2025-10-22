// 首页视图
export default {
  name: 'HomeView',
  emits: ['navigate'],
  setup(props, { emit }) {
    const navigateTo = (view) => {
      emit('navigate', view)
    }

    return {
      navigateTo
    }
  },
  template: `
    <div class="home-view">
      <div class="hero">
        <h1>🏴‍☠️ 神秘岛屿寻宝</h1>
        <p>踏上冒险之旅，探索神秘地点，收集传说中的宝物</p>
        <div class="hero-buttons">
          <button @click="navigateTo('game')" class="btn btn-primary">
            🎮 开始游戏
          </button>
          <button @click="navigateTo('login')" class="btn btn-secondary">
            🔐 登录游戏
          </button>
        </div>
      </div>
      
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">🗺️</div>
          <h3>探索地图</h3>
          <p>在神秘岛屿上探索五个不同的地点，每个地点都有独特的风景和故事。</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">💎</div>
          <h3>收集宝物</h3>
          <p>在每个地点寻找隐藏的宝物，收集传说中的神器，成为真正的寻宝大师。</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <h3>排行榜</h3>
          <p>与其他玩家竞争，看看谁能在最短时间内收集到所有宝物。</p>
        </div>
      </div>
    </div>
  `
}
