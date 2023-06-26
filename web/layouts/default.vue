<template>
  <v-app>
    <ali-header @handleCollapse="handleCollapse"></ali-header>
    <v-main>
      <div class="main-body">
        <ali-menu v-model.miniVariant="miniVariant" @handleLogin="handleLogin"></ali-menu>
        <div class="main-content">
          <!-- <router-view></router-view> -->
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </v-main>
    <v-footer app></v-footer>
    <ali-login :showLogin.sync="showLogin"></ali-login>
  </v-app>
</template>

<script>
import aliMenu from "~/components/common/ali-menu.vue";
import aliHeader from "~/components/common/ali-header.vue";
import aliLogin from "~/components/content/ali-login.vue";
export default {
  components: {
    aliMenu,
    aliHeader,
    aliLogin
  },
  data() {
    return {
      // 菜单缩放
      miniVariant: false,
      showLogin: false,
    }
  },
  created(){
    // this.$vuetify.theme.dark = false;
    this.$vuetify.theme.dark = true;
  },
  methods: {
    // 缩放菜单
    handleCollapse() {
      this.miniVariant = !this.miniVariant;
    },
    handleLogin() {
      this.showLogin = true;
    }
  }
}
</script>

<style scoped>
.main-body {
  display: flex;
  height: 100%;
}

.main-content {
  flex: 1;
}
</style>
