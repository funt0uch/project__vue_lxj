// 地点详情组件
export default {
  name: 'LocationDetail',
  props: {
    location: {
      type: Object,
      required: true
    },
    isVisited: {
      type: Boolean,
      default: false
    },
    hasTreasure: {
      type: Boolean,
      default: false
    }
  },
  emits: ['back-to-map', 'collect-treasure'],
  setup(props, { emit }) {
    const goBack = () => {
      emit('back-to-map')
    }

    const collectTreasure = () => {
      emit('collect-treasure')
    }

    return {
      goBack,
      collectTreasure
    }
  },
  template: `
    <div class="location-detail">
      <button @click="goBack" class="back-btn">← 返回全景</button>
      
      <div class="location-header">
        <h1>{{ location.name }}</h1>
        <div class="location-icon">{{ location.icon }}</div>
      </div>
      
      <div class="location-content">
        <p>{{ location.description }}</p>
        
        <div class="treasure-area">
          <div v-if="!hasTreasure" class="treasure-hint">
            <p>🔍 仔细寻找，这里可能隐藏着宝物...</p>
          </div>
          
          <div v-else class="treasure-found">
            <h3>💎 发现宝物！</h3>
            <p>{{ location.treasure }}</p>
            <button @click="collectTreasure" class="collect-btn">收集宝物</button>
          </div>
        </div>
        
        <div class="location-features">
          <div class="feature-item">
            <span class="feature-icon">🎵</span>
            <span class="feature-text">环境音效</span>
          </div>
        </div>
      </div>
    </div>
  `
}
