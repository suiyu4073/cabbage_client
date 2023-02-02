<template>
  <div>
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
import { onBeforeMount, watch } from 'vue';
import { getJWTForce } from '../composables/useMyFetch'

const id = useStorage('my-id', '')
const { comments, getComments } = useGlobalState()
const { frontmatter } = useData()

onBeforeMount(async () => {
  await getJWTForce()
  await getComments(frontmatter.value.title) //从后端获取数据
})


watch(frontmatter, () => { //文章变化取一次
  getComments(frontmatter.value.title)
})

</script>