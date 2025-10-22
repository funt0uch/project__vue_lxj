// 游戏地图组件
export default {
  name: 'GameMap',
  props: {
    locations: {
      type: Object,
      required: true
    },
    spotPositions: {
      type: Object,
      required: true
    },
    visitedLocations: {
      type: Array,
      default: () => []
    },
    collectedTreasures: {
      type: Array,
      default: () => []
    }
  },
  emits: ['visit-location'],
  setup(props, { emit }) {
    const getSpotStyle = (locationId) => {
      return props.spotPositions[locationId] || {}
    }

    const getSpotClass = (locationId) => {
      const classes = ['location-spot']
      
      if (props.visitedLocations.includes(locationId)) {
        classes.push('visited')
      }
      
      if (props.collectedTreasures.includes(locationId)) {
        classes.push('treasure-found')
      }
      
      return classes.join(' ')
    }

    const handleLocationClick = (locationId) => {
      emit('visit-location', locationId)
    }

    return {
      getSpotStyle,
      getSpotClass,
      handleLocationClick
    }
  },
  template: `
    <div class="game-map">
      <div class="map-background">
        <button 
          v-for="(location, id) in locations" 
          :key="id"
          :class="getSpotClass(id)"
          :style="getSpotStyle(id)"
          @click="handleLocationClick(id)"
        >
          <div class="spot-icon">{{ location.icon }}</div>
          <div class="spot-name">{{ location.name }}</div>
        </button>
      </div>
    </div>
  `
}
