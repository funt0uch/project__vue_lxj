// 游戏状态管理
import { reactive, computed } from 'vue'

// 地点配置
export const LOCATIONS = {
  loc1: { 
    name: '神秘森林', 
    icon: '🌲', 
    treasure: '森林之心', 
    description: '古老的森林深处隐藏着神秘的宝物，传说中森林之心拥有治愈一切的力量。',
    bg: '../assets/img/loc1.jpg',
    audio: '../music/loc1.mp3'
  },
  loc2: { 
    name: '古老城堡', 
    icon: '🏰', 
    treasure: '王者之冠', 
    description: '废弃的城堡中沉睡着王室的珍宝，王者之冠象征着无上的权力和荣耀。',
    bg: '../assets/img/loc2.jpg',
    audio: '../music/loc2.mp3'
  },
  loc3: { 
    name: '神秘洞穴', 
    icon: '🕳️', 
    treasure: '水晶宝石', 
    description: '深不见底的洞穴里闪烁着神秘的光芒，水晶宝石蕴含着大地的精华。',
    bg: '../assets/img/loc3.jpg',
    audio: '../music/loc3.mp3'
  },
  loc4: { 
    name: '山顶神庙', 
    icon: '⛩️', 
    treasure: '神圣护符', 
    description: '山顶的神庙供奉着古老的神器，神圣护符能够保护持有者免受邪恶侵害。',
    bg: '../assets/img/loc4.jpg',
    audio: '../music/loc4.mp3'
  },
  loc5: { 
    name: '海边灯塔', 
    icon: '🗼', 
    treasure: '海洋之泪', 
    description: '灯塔的顶端保存着海洋的秘密，海洋之泪是海神赐予的珍贵礼物。',
    bg: '../assets/img/loc5.jpg',
    audio: '../music/loc5.mp3'
  }
}

// 地点位置配置
export const SPOT_POSITIONS = {
  loc1: { left: '15%', top: '35%' },
  loc2: { left: '65%', top: '45%' },
  loc3: { left: '40%', top: '70%' },
  loc4: { left: '80%', top: '25%' },
  loc5: { left: '25%', top: '80%' }
}

// 游戏状态
const gameState = reactive({
  currentLocation: 'panorama',
  visitedLocations: [],
  collectedTreasures: [],
  volume: 0.6,
  muted: false,
  gameStarted: false,
  totalTreasures: Object.keys(LOCATIONS).length,
  currentUser: null
})

// 计算属性
const gameProgress = computed(() => ({
  treasuresCollected: gameState.collectedTreasures.length,
  locationsVisited: gameState.visitedLocations.length,
  totalTreasures: gameState.totalTreasures,
  totalLocations: Object.keys(LOCATIONS).length,
  completionPercentage: Math.round(
    ((gameState.collectedTreasures.length + gameState.visitedLocations.length) / 
     (gameState.totalTreasures + Object.keys(LOCATIONS).length)) * 50
  )
}))

const isGameComplete = computed(() => 
  gameState.collectedTreasures.length === gameState.totalTreasures
)

// 游戏操作方法
export const gameStore = {
  // 状态
  state: gameState,
  progress: gameProgress,
  isComplete: isGameComplete,
  locations: LOCATIONS,
  spotPositions: SPOT_POSITIONS,

  // 方法
  visitLocation(locationId) {
    if (!gameState.visitedLocations.includes(locationId)) {
      gameState.visitedLocations.push(locationId)
      this.saveState()
    }
  },

  collectTreasure(locationId) {
    if (!gameState.collectedTreasures.includes(locationId)) {
      gameState.collectedTreasures.push(locationId)
      this.saveState()
      return true
    }
    return false
  },

  setCurrentLocation(locationId) {
    gameState.currentLocation = locationId
    this.saveState()
  },

  setVolume(volume) {
    gameState.volume = volume
    this.saveState()
  },

  toggleMute() {
    gameState.muted = !gameState.muted
    this.saveState()
  },

  setGameStarted() {
    gameState.gameStarted = true
    this.saveState()
  },

  setCurrentUser(user) {
    gameState.currentUser = user
    this.saveState()
  },

  resetGame() {
    gameState.visitedLocations = []
    gameState.collectedTreasures = []
    gameState.currentLocation = 'panorama'
    gameState.gameStarted = false
    this.saveState()
  },

  // 持久化
  saveState() {
    try {
      localStorage.setItem('treasure_game_state_v3', JSON.stringify(gameState))
    } catch (e) {
      console.error('保存游戏状态失败:', e)
    }
  },

  loadState() {
    try {
      const saved = localStorage.getItem('treasure_game_state_v3')
      if (saved) {
        const parsedState = JSON.parse(saved)
        Object.assign(gameState, parsedState)
      }
    } catch (e) {
      console.error('加载游戏状态失败:', e)
    }
  }
}
