// 排行榜视图
import RankingList from '../components/RankingList.vue'

export default {
  name: 'RankingView',
  components: {
    RankingList
  },
  props: {
    users: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['navigate'],
  setup(props, { emit }) {
    const goBack = () => {
      emit('navigate', 'home')
    }

    return {
      goBack
    }
  },
  template: `
    <div class="ranking-view">
      <div class="ranking-header">
        <h1>🏆 排行榜</h1>
        <p>看看谁是寻宝大师！</p>
        <button @click="goBack" class="back-btn">← 返回首页</button>
      </div>
      
      <RankingList
        :users="users"
        :current-user="currentUser"
      />
    </div>
  `
}
