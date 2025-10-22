// 登录视图
import UserLogin from '../components/UserLogin.vue'

export default {
  name: 'LoginView',
  components: {
    UserLogin
  },
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
  emits: ['login', 'register', 'logout', 'navigate'],
  setup(props, { emit }) {
    const loginMessage = ref('')
    const loginSuccess = ref(false)

    const handleLogin = (username, password) => {
      const result = emit('login', username, password)
      if (result && result.success) {
        loginMessage.value = result.message
        loginSuccess.value = true
        setTimeout(() => {
          emit('navigate', 'game')
          loginMessage.value = ''
        }, 1000)
      } else {
        loginMessage.value = result.message
        loginSuccess.value = false
      }
    }

    const handleRegister = (username, password) => {
      const result = emit('register', username, password)
      if (result && result.success) {
        loginMessage.value = result.message
        loginSuccess.value = true
        setTimeout(() => {
          emit('navigate', 'game')
          loginMessage.value = ''
        }, 1000)
      } else {
        loginMessage.value = result.message
        loginSuccess.value = false
      }
    }

    const handleLogout = () => {
      emit('logout')
    }

    const goBack = () => {
      emit('navigate', 'home')
    }

    return {
      loginMessage,
      loginSuccess,
      handleLogin,
      handleRegister,
      handleLogout,
      goBack
    }
  },
  template: `
    <div class="login-view">
      <div class="login-header">
        <h1>🔐 用户登录</h1>
        <button @click="goBack" class="back-btn">← 返回首页</button>
      </div>
      
      <UserLogin
        :is-logged-in="isLoggedIn"
        :current-user="currentUser"
        @login="handleLogin"
        @register="handleRegister"
        @logout="handleLogout"
      />
      
      <div v-if="loginMessage" :class="['message', loginSuccess ? 'success' : 'error']">
        {{ loginMessage }}
      </div>
    </div>
  `
}
