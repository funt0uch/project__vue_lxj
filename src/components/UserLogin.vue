// 用户登录组件
export default {
  name: 'UserLogin',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['login', 'register', 'logout'],
  setup(props, { emit }) {
    const loginTab = ref('login')
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const loginMessage = ref('')
    const loginSuccess = ref(false)

    const handleSubmit = () => {
      if (loginTab.value === 'login') {
        emit('login', loginForm.username, loginForm.password)
      } else {
        emit('register', loginForm.username, loginForm.password)
      }
    }

    const logout = () => {
      emit('logout')
    }

    const switchTab = (tab) => {
      loginTab.value = tab
      loginMessage.value = ''
      loginForm.username = ''
      loginForm.password = ''
    }

    return {
      loginTab,
      loginForm,
      loginMessage,
      loginSuccess,
      handleSubmit,
      logout,
      switchTab
    }
  },
  template: `
    <div class="user-login">
      <div v-if="!isLoggedIn" class="login-form">
        <div class="tabs">
          <button 
            @click="switchTab('login')" 
            :class="{ active: loginTab === 'login' }" 
            class="tab-btn"
          >
            登录
          </button>
          <button 
            @click="switchTab('register')" 
            :class="{ active: loginTab === 'register' }" 
            class="tab-btn"
          >
            注册
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>用户名</label>
            <input 
              v-model="loginForm.username" 
              placeholder="请输入用户名" 
              required
            >
          </div>
          <div class="form-group">
            <label>密码</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码" 
              required
            >
          </div>
          <button type="submit" class="btn btn-primary">
            {{ loginTab === 'login' ? '登录' : '注册' }}
          </button>
        </form>
      </div>
      
      <div v-else class="user-info">
        <div class="welcome">
          <h3>欢迎回来，{{ currentUser.username }}！</h3>
          <p>分数: {{ currentUser.score }} | 宝物: {{ currentUser.treasuresCollected }} | 地点: {{ currentUser.locationsVisited }}</p>
        </div>
        <button @click="logout" class="btn btn-secondary">退出登录</button>
      </div>
    </div>
  `
}
