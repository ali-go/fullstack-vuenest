<template>
  <v-btn icon :color="status ? 'pink' : null" @click="toggle">
    <v-icon>
      mdi-heart
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
export default {
  props: {
    // 操作对象
    type: {
      type: String,
      required: true
    },
    // 对象id
    object: {
      type: String,
      required: true
    }
  },
  asyncData() {
    return {}
  },
  data() {
    return {
      status: false
    }
  },
  created() {
    this.getStatus();
  },
  methods: {
    // 获取初始状态
    async getStatus() {
      const res = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'like'
        }
      })
      // @ts-ignore
      this.status = res.status;
    },
    // 切换状态
    async toggle() {
      const res = await this.$axios.$post('actions/toggle', {
        type: this.type,
        object: this.object,
        name: 'like'
      })
      // @ts-ignore
      this.status = res.status;
    }
  }
}
</script>

<style lang="scss" scoped></style>
