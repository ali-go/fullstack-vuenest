<template>
  <v-app-bar :clipped-left="true" fixed app>
    <v-app-bar-nav-icon @click="changeCollapse"></v-app-bar-nav-icon>

    <v-toolbar-title class="mr-12 align-center">
      <v-icon class="mx-4 blue--text">mdi-image-filter-hdr</v-icon>
      <span class="subtitle-1 font-weight-bold">全栈之巅</span>
    </v-toolbar-title>
    <v-spacer />
    <v-row style="max-width: 40vw;" align="center">
      <v-text-field append-icon="mdi-magnify" placeholder="搜索中..." hide-details single-line filled rounded></v-text-field>
    </v-row>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
  methods: {
    changeCollapse() {
      this.$emit('handleCollapse')
    }
  }
}
</script>

<style lang="scss" scoped></style>
