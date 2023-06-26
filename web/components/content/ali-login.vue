<template>
  <v-bottom-sheet v-model="isShowLoginForm" persistent overlay-opacity="0">
    <div class="sheet-box pa-8">
      <v-form class="sheet-form pa-4" ref="formRef">
        <v-text-field v-model="loginForm.username" label="用户名" required :rules="[v => !!v || '用户名不能为空']"></v-text-field>
        <v-text-field v-model="loginForm.password" label="密码" required :rules="[v => !!v || '密码不能为空']" type="password"
          autocomplete="new-password"></v-text-field>
        <div class="form-btn">
          <v-btn class="btn" depressed @click="close">取消</v-btn>
          <v-btn class="btn" depressed color="primary" @click="login">登录</v-btn>
        </div>
      </v-form>
    </div>
  </v-bottom-sheet>
</template>

<script lang="ts">
export default {
  props: {
    showLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowLoginForm: false,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    console.log('this.showLogin', this.showLogin)
  },
  watch: {
    showLogin: {
      handler(newVal) {
        this.isShowLoginForm = newVal;
      },
      immediate: true
    }
  },
  methods: {
    async login() {
      // @ts-ignore
      const valid = this.$refs?.formRef?.validate();
      if(!valid) return;
      // await this.$axios.post('auth/login', this.loginForm);
      // 使用@nuxtjs/auth模块处理权限
      // @ts-ignore
      await this.$auth.loginWith('local', {
        data: this.loginForm
      })
      this.isShowLoginForm = false;
    },
    close() {
      this.isShowLoginForm = false;
      this.$emit('update:showLogin', false);
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet-box {
  // background: #fff;

  .sheet-form {
    width: 50%;
    margin: 0 auto;

    .form-btn {
      text-align: center;

      .btn {
        margin: 0 10px;
      }
    }
  }
}
</style>
