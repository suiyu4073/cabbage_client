<template>
  <button v-if="!show" class="rounded-md bg-green-700 text-white mt-3 p-2" @click="handleShow">展示评论区</button>
  <div v-else>
    <div class="flex items-center gap-2 pb-4">
      <p class="font-bold text-lg ">评论</p>
    </div>
    <div class="flex gap-4">
      <Avatar :id="id || '卷心菜'" />
      <ReplyBox />
    </div>

    <!-- 全部评论 -->
    <p class="font-bold text-lg pt-4 pb-2">全部评论</p>
    <div v-if="comments.length" class="flex flex-col gap-4">
      <Item v-for="comment in comments" v-bind="comment" :key="comment._id" />
    </div>
    <div v-else>
      还没有哦~
    </div>
  </div>
</template>

<script setup>
import ReplyBox from './ReplyBox.vue';
import Item from './Item.vue';
import Avatar from './Avatar.vue';
import { useGlobalState } from '../composables/store';
import { useStorage } from '@vueuse/core';
import { useData } from 'vitepress';
import { watch, ref } from 'vue';
import { getJWTForce } from '../composables/useMyFetch'

const show = ref(false)
const id = useStorage('my-id', '')
const { comments, getComments } = useGlobalState()
const { frontmatter } = useData()

const handleShow = async () => {
  show.value = true
  await getJWTForce()
  getComments(frontmatter.value.title)
}

watch(frontmatter, () => { //文章变化取一次
  getComments(frontmatter.value.title)
})

console.log(import.meta.env)
</script>