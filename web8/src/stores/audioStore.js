// 音频状态管理
import { reactive } from 'vue'

// 音频状态
const audioState = reactive({
  currentTrack: null,
  isPlaying: false,
  volume: 0.6,
  muted: false,
  audioElement: null
})

// 音频管理类
class AudioManager {
  constructor() {
    this.audio = null
    this.isPlaying = false
    this.currentTrack = null
  }

  init() {
    // 创建音频元素
    this.audio = document.createElement('audio')
    this.audio.preload = 'auto'
    this.audio.loop = true
    document.body.appendChild(this.audio)
    
    audioState.audioElement = this.audio
  }

  async playTrack(trackPath) {
    if (this.currentTrack === trackPath && this.isPlaying) return
    
    // 停止当前播放
    this.audio.pause()
    this.audio.currentTime = 0
    
    this.audio.src = trackPath
    this.audio.volume = audioState.muted ? 0 : audioState.volume
    this.currentTrack = trackPath
    
    try {
      // 等待音频加载完成
      await new Promise((resolve, reject) => {
        this.audio.oncanplaythrough = resolve
        this.audio.onerror = reject
        this.audio.load()
      })
      
      await this.audio.play()
      this.isPlaying = true
      audioState.isPlaying = true
      audioState.currentTrack = trackPath
    } catch (e) {
      console.warn('音频播放失败:', e)
      this.isPlaying = false
      audioState.isPlaying = false
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause()
      this.isPlaying = false
      audioState.isPlaying = false
    }
  }

  setVolume(volume) {
    audioState.volume = volume
    if (this.audio && !audioState.muted) {
      this.audio.volume = volume
    }
  }

  toggleMute() {
    audioState.muted = !audioState.muted
    if (this.audio) {
      this.audio.volume = audioState.muted ? 0 : audioState.volume
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
      this.isPlaying = false
      audioState.isPlaying = false
      audioState.currentTrack = null
    }
  }
}

// 创建全局音频管理器实例
const audioManager = new AudioManager()

// 音频状态管理
export const audioStore = {
  // 状态
  state: audioState,
  manager: audioManager,

  // 方法
  init() {
    audioManager.init()
  },

  async playTrack(trackPath) {
    await audioManager.playTrack(trackPath)
  },

  pause() {
    audioManager.pause()
  },

  setVolume(volume) {
    audioManager.setVolume(volume)
  },

  toggleMute() {
    audioManager.toggleMute()
  },

  stop() {
    audioManager.stop()
  },

  // 播放特定地点的音频
  async playLocationAudio(locationId) {
    const trackPath = `../music/${locationId}.mp3`
    await this.playTrack(trackPath)
  },

  // 播放全景音频
  async playPanoramaAudio() {
    await this.playTrack('../music/panorama.mp3')
  }
}
