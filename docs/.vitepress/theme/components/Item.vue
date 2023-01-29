<template>
  <div>
    <div class="flex gap-4">
      <Avatar :id="author" />
      <div class="flex flex-col w-full gap-2">
        <div class="text-gray-400 text-xs mt-1">
          {{ formattedDate }}
        </div>
        <div class="flex gap-1">
          <div class="text-green-500" v-if="at && host != at">@{{ at.length >= 3 ? at.slice(0, 3) : at }}</div>
          {{
            content
          }}
        </div>
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <div class="flex items-center gap-1">
              <i class="ri-thumb-up-line text-xl cursor-pointer" @click="handleZan"
                :class="likes.find(id => id === userId) ? 'text-green-700' : ''"></i>
              {{ likes.length }}
            </div>
            <div class="flex items-center gap-1 cursor-pointer select-none" @click="handleReply"
              :class="replying ? 'text-green-600' : ''">
              <i class="ri-message-3-line text-xl"></i>
              <p v-if="replying">取消回复</p>
              <p v-else>回复</p>
            </div>
          </div>
          <button v-if="author === userId" @click="handleRemove" class="text-red-500">
            删除
          </button>
        </div>
        <ReplyBox ref="box" v-if="replying" :at="author" :is-reply="true" :parent-comment-id="parentCommentId || _id"
          @reply="() => replying = false" />

        <!-- 评论的回复 -->
        <div v-if="replies.length" class="p-2 pr-0 border-l border-green-700">
          <Item v-for="reply in replies" v-bind="reply" :host="author" :key="reply._id" :parent-comment-id="_id" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import Avatar from './Avatar.vue';
import { nextTick, ref } from 'vue'
import ReplyBox from './ReplyBox.vue';
import { useStorage, useDateFormat } from '@vueuse/core';
import { useMyFetch } from '../composables/useMyFetch';
import { remove } from 'lodash-es'
import { useGlobalState } from '../composables/store';

const replying = ref(false)
const box = ref()
const userId = useStorage('my-id')

const props = defineProps({
  _id: String,
  createdAt: String,
  likes: Array,
  content: String,
  replies: Array,
  at: String,
  author: String,
  host: String, //楼主

  parentCommentId: String
})

const date = Date.parse(props.createdAt)
console.log(date)

const handleReply = () => {
  replying.value = !replying.value
  if (replying.value) nextTick(() => box.value.textBox.focus())
}

const handleZan = () => {

}

const handleRemove = async () => {
  const { data } = await useMyFetch('/comment/' + props._id).delete().json()
  const { comments } = useGlobalState()
  remove(comments.value, v => v._id === data.value._id)
  comments.value.forEach(comment => remove(comment.replies, v => v._id === data.value._id))
}

const formattedDate = (() => {
  const timeDiff = Date.now() - date
  console.log(timeDiff)
  if (timeDiff / 60_000 < 1) //
    return '几秒前'
  if (timeDiff / 3600_000 < 1)
    return '几分钟前'
  if (timeDiff / (3600_000 * 24) < 1)
    return '几小时前'
  if (timeDiff / (3600_000 * 48) < 1)
    return '1天前'
  return useDateFormat(date, 'YYYY-MM-DD HH:mm')
})()
</script>