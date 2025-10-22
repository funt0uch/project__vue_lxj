// 游戏视图
import GameMap from '../components/GameMap.vue'
import LocationDetail from '../components/LocationDetail.vue'
import TreasureHunt from '../components/TreasureHunt.vue'

export default {
  name: 'GameView',
  components: {
    GameMap,
    LocationDetail,
    TreasureHunt
  },
  props: {
    gameState: {
      type: Object,
      required: true
    },
    locations: {
      type: Object,
      required: true
    },
    spotPositions: {
      type: Object,
      required: true
    }
  },
  emits: ['visit-location', 'collect-treasure', 'back-to-map'],
  setup(props, { emit }) {
    const currentView = ref('map') // 'map', 'location', 'treasure'
    const selectedLocation = ref(null)

    const visitLocation = (locationId) => {
      selectedLocation.value = locationId
      currentView.value = 'location'
      emit('visit-location', locationId)
    }

    const backToMap = () => {
      currentView.value = 'map'
      selectedLocation.value = null
      emit('back-to-map')
    }

    const startTreasureHunt = () => {
      currentView.value = 'treasure'
    }

    const collectTreasure = () => {
      emit('collect-treasure', selectedLocation.value)
      currentView.value = 'location'
    }

    const currentLocation = computed(() => {
      if (!selectedLocation.value) return null
      return props.locations[selectedLocation.value]
    })

    const isLocationVisited = computed(() => {
      if (!selectedLocation.value) return false
      return props.gameState.visitedLocations.includes(selectedLocation.value)
    })

    const hasLocationTreasure = computed(() => {
      if (!selectedLocation.value) return false
      return props.gameState.collectedTreasures.includes(selectedLocation.value)
    })

    return {
      currentView,
      selectedLocation,
      currentLocation,
      isLocationVisited,
      hasLocationTreasure,
      visitLocation,
      backToMap,
      startTreasureHunt,
      collectTreasure
    }
  },
  template: `
    <div class="game-view">
      <div class="game-header">
        <h1>🗺️ 神秘岛屿全景</h1>
        <div class="game-progress">
          <div class="progress-item">
            <span class="progress-icon">💎</span>
            <span class="progress-label">宝物收集</span>
            <span class="progress-value">{{ gameState.collectedTreasures.length }}/5</span>
          </div>
          <div class="progress-item">
            <span class="progress-icon">📍</span>
            <span class="progress-label">地点探索</span>
            <span class="progress-value">{{ gameState.visitedLocations.length }}/5</span>
          </div>
        </div>
      </div>

      <!-- 地图视图 -->
      <div v-if="currentView === 'map'">
        <GameMap
          :locations="locations"
          :spot-positions="spotPositions"
          :visited-locations="gameState.visitedLocations"
          :collected-treasures="gameState.collectedTreasures"
          @visit-location="visitLocation"
        />
      </div>

      <!-- 地点详情视图 -->
      <div v-if="currentView === 'location' && currentLocation">
        <LocationDetail
          :location="currentLocation"
          :is-visited="isLocationVisited"
          :has-treasure="hasLocationTreasure"
          @back-to-map="backToMap"
          @collect-treasure="startTreasureHunt"
        />
      </div>

      <!-- 寻宝游戏视图 -->
      <div v-if="currentView === 'treasure' && currentLocation">
        <TreasureHunt
          :location="currentLocation"
          :is-visited="isLocationVisited"
          :has-treasure="hasLocationTreasure"
          @treasure-found="() => {}"
          @treasure-collected="collectTreasure"
        />
        <button @click="backToMap" class="back-btn">← 返回地点</button>
      </div>
    </div>
  `
}
