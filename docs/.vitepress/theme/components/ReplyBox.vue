<template>
  <form class="flex flex-col grow group w-full" @submit="onSubmit">
    <textarea v-model="content" placeholder="匿名评论" rows="3"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-700 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 p-2"
      ref="textBox" />
    <button
      class="rounded-md bg-green-700 w-20 text-white mt-3 p-1 self-end hidden group-focus-within:block disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100"
      :disabled="!isValid">发送</button>
  </form>
</template>

<script setup>
import { useField, useForm, useIsFormValid } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import { useMyFetch } from '../composables/useMyFetch'
import { useData } from 'vitepress';
import { useGlobalState } from '../composables/store';


const textBox = ref()
defineExpose({
  textBox
})
const emit = defineEmits(['reply'])
const props = defineProps({
  at: String,
  isReply: {
    type: Boolean,
    default: false
  },
  parentCommentId: String
})
const { frontmatter } = useData()

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    content: yup.string().required('评论不能为空哦')
  })
})
const { value: content } = useField('content')
const isValid = useIsFormValid()


const onSubmit = handleSubmit(async values => {
  values.at = props.at
  content.value = ''
  const { comments } = useGlobalState()
  if (!props.isReply) {
    const { data } = await useMyFetch('/comment/article/' + frontmatter.value.title).post(values).json()
    comments.value.push(data.value)
  }
  else {
    const { data } = await useMyFetch('/comment/reply/' + props.parentCommentId).post(values).json()
    const i = comments.value.findIndex(v => v._id === props.parentCommentId)
    comments.value[i].replies.push(data.value)
  }
  emit('reply')
});
</script>