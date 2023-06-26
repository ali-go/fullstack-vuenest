<template>
  <div class="pa-3">
    <v-row>
      <v-col v-for="course in coursesList" :key="course._id">
        <v-card class="mx-auto" max-width="344">
          <router-link :to="`/courses/${course._id}`">
            <v-img :src="course.cover" height="200px"></v-img>
          </router-link>
          <v-card-title>{{ course.name }} </v-card-title>
          <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
          <v-card-actions>
            <like-btn type="Course" :object="course._id"></like-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import likeBtn from "@/components/content/like-btn";
export default {
  components: {
    likeBtn
  },
  async asyncData({ $axios }) {
    const res = await $axios.$get('/courses')
    // console.log(res)
    return {
      coursesList: res.data
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style  scoped></style>
