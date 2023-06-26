<template>
  <v-card flat tile class="pa-3">
    <v-form>
      <v-text-field v-model="content" label="说点啥" required append-icon="mdi-send" @click:append="send"></v-text-field>
    </v-form>
    <v-list two-line>
      <v-list-item v-for="(item, index) in comments" :key="index">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{ item.user.username[0].toUpperCase() }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ item.user.username }}</span>
            <span>{{ item.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
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
    return {

    }
  },
  data() {
    return {
      content: '',
      comments: []
    }
  },
  watch: {
    object: {
      handler: 'getCommentList',
      immediate: true
    }
  },
  created() {
    this.getCommentList();
  },
  methods: {
    async send() {
      if(!this.content) return;
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content
      })
      await this.getCommentList();
      this.content = null;
    },
    async getCommentList() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
