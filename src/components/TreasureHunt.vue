// 寻宝游戏组件
export default {
  name: 'TreasureHunt',
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
  emits: ['treasure-found', 'treasure-collected'],
  setup(props, { emit }) {
    const treasureSpots = ref([])
    const treasureFound = ref(false)
    const treasureCollected = ref(false)

    // 初始化寻宝点
    const initTreasureSpots = () => {
      const spots = []
      const treasureIndex = Math.floor(Math.random() * 5) // 5个寻宝点
      
      for (let i = 0; i < 5; i++) {
        spots.push({
          id: i,
          hasTreasure: i === treasureIndex,
          clicked: false,
          style: {
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 20}%`
          }
        })
      }
      
      treasureSpots.value = spots
    }

    const clickTreasureSpot = (spot) => {
      if (spot.clicked) return
      
      spot.clicked = true
      
      if (spot.hasTreasure) {
        treasureFound.value = true
        emit('treasure-found')
      }
    }

    const collectTreasure = () => {
      treasureCollected.value = true
      emit('treasure-collected')
    }

    // 组件挂载时初始化
    onMounted(() => {
      initTreasureSpots()
    })

    return {
      treasureSpots,
      treasureFound,
      treasureCollected,
      clickTreasureSpot,
      collectTreasure
    }
  },
  template: `
    <div class="treasure-hunt">
      <div class="treasure-area">
        <div v-if="!treasureFound" class="treasure-hint">
          <p>🔍 仔细寻找，这里可能隐藏着宝物...</p>
        </div>
        
        <div v-if="treasureFound && !treasureCollected" class="treasure-found">
          <h3>💎 发现宝物！</h3>
          <p>{{ location.treasure }}</p>
          <button @click="collectTreasure" class="collect-btn">收集宝物</button>
        </div>
        
        <div v-if="treasureCollected" class="treasure-collected">
          <p>✅ 宝物已收集！继续探索其他地点吧。</p>
        </div>
        
        <div class="treasure-spots">
          <button 
            v-for="spot in treasureSpots" 
            :key="spot.id"
            class="treasure-spot"
            :class="{ clicked: spot.clicked, 'has-treasure': spot.hasTreasure && spot.clicked }"
            :style="spot.style"
            @click="clickTreasureSpot(spot)"
          >
            {{ spot.clicked ? (spot.hasTreasure ? '💎' : '❌') : '🔍' }}
          </button>
        </div>
      </div>
    </div>
  `
}
