<template>
  <div class="flex items-center gap-1 mb-1">
    <i class="ri-eye-line"></i>
    <p class="text-sm">阅读量 {{ views? views: 'loading...' }}</p>
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core';
import { baseUrl } from '../composables/useMyFetch'
import { useData } from 'vitepress';
import { ref, watch } from 'vue';
const { frontmatter } = useData()
const url = baseUrl + '/article/views/'
const views = ref(0)
const getViews = async (url) => {
  await useFetch(url).post()
  const { data } = await useFetch(url).get().json()
  views.value = data.value.views
}

getViews(url + frontmatter.value.title)
watch(frontmatter, () => { //文章变化取一次
  getViews(url + frontmatter.value.title)
})
</script>