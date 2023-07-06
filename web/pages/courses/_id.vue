<template>
  <div class="pa-4">
    <v-row>
      <v-col :md="8">
        <!-- 课程详情{{ course }} -->
        <!-- <v-card-text> -->
        <!-- <h5 class="text-h6 mb-2"> 课时列表 </h5> -->
        <!-- <v-chip-group active-class="primary--text" column>
        <v-chip v-for="item in course.episodes" :key="item._id">
          {{ item.name }}
        </v-chip>
      </v-chip-group> -->
        <!-- </v-card-text> -->
        <!-- 课时：{{ currentEpisode }} -->
        <!-- <video :src="getUrl(currentEpisode.file)" controls width="100%"></video> -->
        <video :src="getUrl(currentEpisode.file)" controls width="100%"></video>
        <like-btn type="Course" :object="course._id"></like-btn>
        <h3 class="mb-3">{{ course.name }}</h3>
        <v-select class="ma-5" v-model="currentIndex"
          :items="course.episodes.map((item, i) => ({ text: item.name, value: i }))" label="课时"></v-select>
      </v-col>
      <v-col :md="4">
        <comment-list type="Episode" :object="currentEpisode._id"></comment-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import likeBtn from "@/components/content/like-btn";
import commentList from "@/components/content/comment-list";

import { getUrl } from "@/utils/utils";
export default {
  components: {
    likeBtn,
    commentList
  },
  async asyncData({ $axios, params }) {
    const id = params.id;
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        populate: 'episodes'
      }
    });
    console.log(course)
    return {
      id,
      course
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    currentEpisode() {
      return this.course.episodes[this.currentIndex];
    }
  },
  methods: {
    getUrl,
  }
}
</script>

<style lang="scss" scoped></style>
