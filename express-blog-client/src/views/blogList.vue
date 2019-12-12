<template>
  <div class="home">
    <blog-list msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import blogList from '@/components/blogList.vue'

export default {
  name: 'home',
  components: {
    blogList
  }
}
</script>
