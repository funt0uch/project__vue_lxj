// 排行榜列表组件
export default {
  name: 'RankingList',
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
  setup(props) {
    const topUsers = computed(() => {
      return [...props.users]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
    })

    const currentUserRank = computed(() => {
      if (!props.currentUser) return null
      
      const sortedUsers = [...props.users].sort((a, b) => b.score - a.score)
      const rank = sortedUsers.findIndex(user => user.id === props.currentUser.id) + 1
      return rank
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    const getRankIcon = (index) => {
      if (index === 0) return '🥇'
      if (index === 1) return '🥈'
      if (index === 2) return '🥉'
      return index + 1
    }

    return {
      topUsers,
      currentUserRank,
      formatDate,
      getRankIcon
    }
  },
  template: `
    <div class="ranking-list">
      <h2>🏆 排行榜 TOP 10</h2>
      
      <div v-if="users.length === 0" class="empty-ranking">
        <div class="empty-icon">📊</div>
        <p>暂无排行榜数据</p>
        <p>成为第一个玩家开始游戏吧！</p>
      </div>
      
      <div v-else>
        <div v-for="(user, index) in topUsers" :key="user.id" class="ranking-item">
          <div class="rank-position">
            {{ getRankIcon(index) }}
          </div>
          <div class="user-info">
            <div class="username">{{ user.username }}</div>
            <div class="join-date">
              加入时间: {{ formatDate(user.joinDate) }}
            </div>
          </div>
          <div class="user-stats">
            <div class="stat">
              <span class="stat-label">分数</span>
              <span class="stat-value">{{ user.score }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">宝物</span>
              <span class="stat-value">{{ user.treasuresCollected }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">地点</span>
              <span class="stat-value">{{ user.locationsVisited }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="currentUser && currentUserRank > 10" class="current-user-rank">
          <div class="ranking-item current-user">
            <div class="rank-position">{{ currentUserRank }}</div>
            <div class="user-info">
              <div class="username">{{ currentUser.username }} (你)</div>
              <div class="join-date">
                加入时间: {{ formatDate(currentUser.joinDate) }}
              </div>
            </div>
            <div class="user-stats">
              <div class="stat">
                <span class="stat-label">分数</span>
                <span class="stat-value">{{ currentUser.score }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">宝物</span>
                <span class="stat-value">{{ currentUser.treasuresCollected }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">地点</span>
                <span class="stat-value">{{ currentUser.locationsVisited }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
