// store.js
import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { useMyFetch } from './useMyFetch'

export const useGlobalState = createGlobalState(
  () => {
    const comments = ref([
      // {
      //   _id: '',
      //   date: Date.now(),
      //   likes: ['aa'],
      //   content: "????",
      //   author: '张随缘',
      //   createdAt: '2023-01-27T11:15:33.807+00:00',
      //   replies: [{
      //     _id: '',
      //     author: '徐国威',
      //     date: Date.now(),
      //     likes: [],
      //     content: "????",
      //     replies: [],
      //     createdAt: '2023-01-27T11:15:33.807+00:00',
      //     at: '张随缘',
      //   }, {
      //     _id: '',
      //     author: '张随缘',
      //     date: Date.now(),
      //     likes: [],
      //     content: "笑死",
      //     replies: [],
      //     createdAt: '2023-01-29T11:15:33.807+00:00',
      //     at: '徐国威',
      //   }]
      // }
    ])

    async function getComments(articleId) {
      if (!articleId) return
      const { data } = await useMyFetch('/comment/article/' + articleId).get().json()
      comments.value = data.value
      console.log(data.value)
    }
    return { comments, getComments }
  }
)
