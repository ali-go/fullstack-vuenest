<template>
  <v-navigation-drawer :mini-variant.sync="custMiniVariant" permanent>
    <v-list dense nav>
      <v-list-item v-for="item in menus" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div v-show="!custMiniVariant">
        <v-subheader>订阅</v-subheader>
        <v-list-item v-for="person in recent" :key="person.title">
          <v-list-item-avatar>
            <v-img :alt="`${person.title} avatar`" :src="person.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="person.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-subheader></v-subheader>
      <v-list-item v-if="getUsername">
        <v-list-item-action>
          <v-icon v-text="'mdi-lock'"></v-icon>
        </v-list-item-action>
        <v-list-item-title>欢迎您：{{ getUsername }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-else link @click="goLogin">
        <v-list-item-action>
          <v-icon>mdi-login</v-icon>
        </v-list-item-action>
        <v-list-item-title>登录</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="getUsername" link @click="goLoginOut">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-title>测试退出登录</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-title>系统设置</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  model: {
    prop: 'miniVariant',
    event: 'update:miniVariant'
  },
  props: {
    miniVariant: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      custMiniVariant: false,
      menus: [
        { title: '首页', icon: 'mdi-home', link: '/' },
        { title: '热门课程', icon: 'mdi-chart-line-variant', link: '/courses' },
        { title: '热门评论', icon: 'mdi-comment-multiple-outline', link: '/comment' },
        { title: '用户', icon: 'mdi-account-badge' },
      ],
      recent: [
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
      ],
    }
  },
  computed: {
    getUsername() {
      return this.$store.state.auth?.user?.username;
    }
  },
  watch: {
    miniVariant: {
      handler(newVal: boolean) {
        this.custMiniVariant = newVal;
      },
      immediate: true
    },
  },
  methods: {
    goLogin() {
      this.$emit('handleLogin');
    },
    // 测试退出登录（暂时无接口，只是用于清除store个人信息数据）
    goLoginOut(){
      // @ts-ignore
      this.$auth.loginWith('local', {
        data: {}
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
