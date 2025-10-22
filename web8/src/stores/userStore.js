// 用户状态管理
import { reactive, computed } from 'vue'

// 用户状态
const userState = reactive({
  users: [],
  currentUser: null,
  isLoggedIn: false
})

// 计算属性
const topUsers = computed(() => {
  return [...userState.users]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
})

const currentUserRank = computed(() => {
  if (!userState.currentUser) return null
  
  const sortedUsers = [...userState.users].sort((a, b) => b.score - a.score)
  const rank = sortedUsers.findIndex(user => user.id === userState.currentUser.id) + 1
  return rank
})

// 用户操作方法
export const userStore = {
  // 状态
  state: userState,
  topUsers,
  currentUserRank,

  // 方法
  register(username, password) {
    // 检查用户名是否已存在
    if (userState.users.find(user => user.username === username)) {
      return { success: false, message: '用户名已存在！' }
    }

    // 创建新用户
    const newUser = {
      id: Date.now(),
      username,
      password,
      score: 0,
      treasuresCollected: 0,
      locationsVisited: 0,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }

    userState.users.push(newUser)
    this.saveUsers()
    
    return { success: true, message: '注册成功！', user: newUser }
  },

  login(username, password) {
    const user = userState.users.find(
      user => user.username === username && user.password === password
    )

    if (user) {
      user.lastLogin = new Date().toISOString()
      userState.currentUser = user
      userState.isLoggedIn = true
      this.saveUsers()
      return { success: true, message: '登录成功！', user }
    } else {
      return { success: false, message: '用户名或密码错误！' }
    }
  },

  logout() {
    userState.currentUser = null
    userState.isLoggedIn = false
    this.saveState()
  },

  updateUserScore(treasuresCollected, locationsVisited) {
    if (!userState.currentUser) return

    // 计算分数：宝物收集 * 100 + 地点探索 * 50
    const newScore = treasuresCollected * 100 + locationsVisited * 50
    
    userState.currentUser.score = newScore
    userState.currentUser.treasuresCollected = treasuresCollected
    userState.currentUser.locationsVisited = locationsVisited

    // 更新用户列表中的对应用户
    const userIndex = userState.users.findIndex(user => user.id === userState.currentUser.id)
    if (userIndex !== -1) {
      userState.users[userIndex] = { ...userState.currentUser }
    }

    this.saveUsers()
  },

  // 持久化
  saveUsers() {
    try {
      localStorage.setItem('treasure_game_users_v3', JSON.stringify(userState.users))
    } catch (e) {
      console.error('保存用户数据失败:', e)
    }
  },

  loadUsers() {
    try {
      const saved = localStorage.getItem('treasure_game_users_v3')
      if (saved) {
        userState.users = JSON.parse(saved)
      }
    } catch (e) {
      console.error('加载用户数据失败:', e)
    }
  },

  saveState() {
    try {
      localStorage.setItem('treasure_game_user_state_v3', JSON.stringify({
        currentUser: userState.currentUser,
        isLoggedIn: userState.isLoggedIn
      }))
    } catch (e) {
      console.error('保存用户状态失败:', e)
    }
  },

  loadState() {
    try {
      const saved = localStorage.getItem('treasure_game_user_state_v3')
      if (saved) {
        const parsedState = JSON.parse(saved)
        userState.currentUser = parsedState.currentUser
        userState.isLoggedIn = parsedState.isLoggedIn
      }
    } catch (e) {
      console.error('加载用户状态失败:', e)
    }
  }
}
